'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { PitchCategory, PitchShot, Platform } from '@/lib/data/pitches/types';
import { Lightbox, type LightboxItem } from './Lightbox';
import { track } from './track';

type Filter = 'all' | Platform;
const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'ios', label: 'iOS' },
  { id: 'android', label: 'Android' },
];
const LABEL: Record<Platform, string> = { ios: 'iOS', android: 'Android' };
const PLATFORM_ORDER: Platform[] = ['ios', 'android'];

const sectionId = (id: string) => `screens-${id}`;
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function PlatformFilter({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div
      role="radiogroup"
      aria-label="Platform"
      className="inline-flex rounded-full border border-neutral-200 p-0.5 text-sm dark:border-neutral-800"
    >
      {FILTERS.map((f) => {
        const checked = f.id === value;
        return (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(f.id)}
            className={`rounded-full px-3 py-1 transition-colors motion-reduce:transition-none ${
              checked
                ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

function Shot({ shot, onOpen }: { shot: PitchShot; onOpen: () => void }) {
  return (
    <figure>
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group block w-full rounded-[1.1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950"
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
          className="h-auto w-full rounded-[1.1rem] border border-neutral-200 shadow-sm transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none dark:border-neutral-800"
        />
      </button>
      {shot.caption && (
        <figcaption className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
          {shot.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Gallery({ pitch, categories }: { pitch: string; categories: PitchCategory[] }) {
  // The platform filter only makes sense when both platforms have screens.
  const multiPlatform = useMemo(
    () => PLATFORM_ORDER.every((p) => categories.some((c) => c.shots.some((s) => s.platform === p))),
    [categories],
  );
  const [filter, setFilter] = useState<Filter>('all');
  const [active, setActive] = useState<string | undefined>(categories[0]?.id);
  const [open, setOpen] = useState<number | null>(null);
  const chipBar = useRef<HTMLDivElement>(null);

  // ?platform=ios on first load
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('platform');
    if (multiPlatform && (p === 'ios' || p === 'android')) setFilter(p);
  }, [multiPlatform]);

  const changeFilter = (f: Filter) => {
    setFilter(f);
    const url = new URL(window.location.href);
    if (f === 'all') url.searchParams.delete('platform');
    else url.searchParams.set('platform', f);
    window.history.replaceState(null, '', url);
  };

  const visible = useMemo(
    () =>
      categories
        .map((c) => ({
          ...c,
          shots: filter === 'all' ? c.shots : c.shots.filter((s) => s.platform === filter),
        }))
        .filter((c) => c.shots.length > 0),
    [categories, filter],
  );

  // Lightbox order: category by category, iOS before Android in compare layouts.
  const items = useMemo<LightboxItem[]>(
    () =>
      visible.flatMap((c) => {
        const ordered = [...c.shots].sort((a, b) => (a.platform === b.platform ? 0 : a.platform === 'ios' ? -1 : 1));
        return ordered.map((shot, i) => ({
          shot,
          category: c.label,
          position: i + 1,
          categorySize: ordered.length,
        }));
      }),
    [visible],
  );

  const openShot = (shot: PitchShot, category: string) => {
    const i = items.findIndex((it) => it.shot === shot);
    if (i < 0) return;
    setOpen(i);
    track(pitch, { name: 'pitch_lightbox_open', category, platform: shot.platform });
  };

  // Scroll spy
  useEffect(() => {
    const sections = visible
      .map((c) => document.getElementById(sectionId(c.id)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace(/^screens-/, ''));
      },
      { rootMargin: '-25% 0px -65% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [visible]);

  // Keep the active chip in view on phones, without moving the page.
  useEffect(() => {
    const bar = chipBar.current;
    const chip = bar?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!bar || !chip) return;
    const left = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
    bar.scrollTo({ left, behavior: reducedMotion() ? 'auto' : 'smooth' });
  }, [active]);

  const jump = useCallback((id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(sectionId(id));
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  }, []);

  const total = (c: PitchCategory) => c.shots.length;

  return (
    <div className="lg:grid lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-14">
      {/* Desktop: sticky category menu */}
      <nav aria-label="Screen categories" className="hidden lg:block">
        <div className="sticky top-24">
          {multiPlatform && <PlatformFilter value={filter} onChange={changeFilter} />}
          <ul className={`${multiPlatform ? 'mt-6' : ''} space-y-2 text-sm`}>
            {visible.map((c) => {
              const current = c.id === active;
              return (
                <li key={c.id}>
                  <a
                    href={`#${sectionId(c.id)}`}
                    onClick={jump(c.id)}
                    aria-current={current ? 'location' : undefined}
                    className={`flex items-baseline justify-between gap-3 transition-colors motion-reduce:transition-none ${
                      current
                        ? 'text-neutral-900 dark:text-neutral-100'
                        : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="tabular-nums text-xs text-neutral-400 dark:text-neutral-500">
                      {total(c)}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div>
        {/* Phones and tablets: filter, then sticky scrolling chips */}
        {multiPlatform && (
          <div className="lg:hidden">
            <PlatformFilter value={filter} onChange={changeFilter} />
          </div>
        )}
        <nav
          aria-label="Screen categories"
          className="sticky top-0 z-10 -mx-6 mt-4 border-b border-neutral-200/70 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90 lg:hidden"
        >
          <div
            ref={chipBar}
            className="flex gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((c) => {
              const current = c.id === active;
              return (
                <a
                  key={c.id}
                  data-chip={c.id}
                  href={`#${sectionId(c.id)}`}
                  onClick={jump(c.id)}
                  aria-current={current ? 'location' : undefined}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1 text-sm transition-colors motion-reduce:transition-none ${
                    current
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                      : 'border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400'
                  }`}
                >
                  {c.label}{' '}
                  <span className={`tabular-nums ${current ? 'opacity-60' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    {total(c)}
                  </span>
                </a>
              );
            })}
          </div>
        </nav>

        {visible.length === 0 && (
          <p className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
            {filter === 'android' ? 'Android screens are on the way.' : 'No screens yet.'}
          </p>
        )}

        <div className="mt-8 space-y-16 lg:mt-0">
          {visible.map((c) => {
            const platforms = PLATFORM_ORDER.filter((p) => c.shots.some((s) => s.platform === p));
            const compare = filter === 'all' && platforms.length > 1;
            return (
              <section
                key={c.id}
                id={sectionId(c.id)}
                aria-labelledby={`${sectionId(c.id)}-title`}
                className="scroll-mt-20 lg:scroll-mt-24"
              >
                <h3
                  id={`${sectionId(c.id)}-title`}
                  className="text-neutral-800 dark:text-neutral-200"
                >
                  {c.label}{' '}
                  <span className="text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
                    · {total(c)}
                  </span>
                </h3>
                {c.description && (
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                    {c.description}
                  </p>
                )}

                {compare ? (
                  <div className="mt-5 grid grid-cols-2 gap-x-5">
                    {platforms.map((p) => (
                      <div key={p}>
                        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                          {LABEL[p]}
                        </p>
                        <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                          {c.shots
                            .filter((s) => s.platform === p)
                            .map((shot) => (
                              <Shot
                                key={shot.src}
                                shot={shot}
                                onOpen={() => openShot(shot, c.label)}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4">
                    {c.shots.map((shot) => (
                      <Shot
                        key={shot.src}
                        shot={shot}
                        onOpen={() => openShot(shot, c.label)}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {open !== null && (
        <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}
