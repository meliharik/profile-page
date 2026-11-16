'use client';

import Image from 'next/image';
import { useId, useRef, useState } from 'react';
import type { Platform, PlatformStatus, PitchVideo } from '@/lib/data/pitches/types';
import { track } from './track';

const LABEL: Record<Platform, string> = { ios: 'iOS', android: 'Android' };
const PLATFORMS: Platform[] = ['ios', 'android'];
const FALLBACK_RATIO = 9 / 19.5;

const time = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const PlayButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none"
  >
    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg ring-1 ring-black/5 backdrop-blur transition-transform duration-200 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-neutral-900 motion-reduce:transition-none">
      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-neutral-900" aria-hidden>
        <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
      </svg>
    </span>
  </button>
);

// The poster is the page's largest paint: load it early, resized, through next/image.
const Poster = ({ src }: { src: string }) => (
  <Image
    src={src}
    alt=""
    fill
    priority
    sizes="(max-width: 640px) 242px, 272px"
    className="object-cover"
  />
);

export function VideoStage({
  pitch,
  videos,
  platforms,
}: {
  pitch: string;
  videos: PitchVideo[];
  platforms: Record<Platform, { status: PlatformStatus; note?: string }>;
}) {
  const id = useId();
  const [active, setActive] = useState<Platform>(videos[0]?.platform ?? 'ios');
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tabs = useRef<Record<Platform, HTMLButtonElement | null>>({ ios: null, android: null });

  const video = videos.find((v) => v.platform === active);
  const ratio = (video ?? videos[0]) ? (video ?? videos[0]).width / (video ?? videos[0]).height : FALLBACK_RATIO;

  const select = (p: Platform) => {
    if (p === active) return;
    videoRef.current?.pause();
    setStarted(false);
    setActive(p);
  };

  const play = () => {
    if (!video) return;
    if (!started) track(pitch, { name: 'pitch_video_play', platform: video.platform });
    setStarted(true);
    void videoRef.current?.play();
  };

  const seek = (t: number) => {
    if (videoRef.current) videoRef.current.currentTime = t;
    play();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next = PLATFORMS[(PLATFORMS.indexOf(active) + 1) % PLATFORMS.length];
    select(next);
    tabs.current[next]?.focus();
  };

  const [large, ...smaller] = video?.sources ?? [];
  const embedSrc = video?.embedUrl
    ? `${video.embedUrl}${video.embedUrl.includes('?') ? '&' : '?'}autoplay=1&playsinline=1`
    : null;

  return (
    <div className="flex flex-col items-center">
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-${active}`}
        className="w-[260px] rounded-[2.6rem] bg-neutral-900 p-[9px] shadow-xl shadow-neutral-900/10 ring-1 ring-neutral-900/10 dark:bg-neutral-800 dark:shadow-black/40 dark:ring-white/10 sm:w-[290px]"
      >
        <div
          className="relative overflow-hidden rounded-[2.1rem] bg-neutral-100 dark:bg-neutral-900"
          style={{ aspectRatio: String(ratio) }}
        >
          {!video ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8 text-center">
              <p className="text-sm text-neutral-800 dark:text-neutral-200">
                {LABEL[active]} build in progress
              </p>
              {platforms[active].note && (
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {platforms[active].note}
                </p>
              )}
            </div>
          ) : embedSrc ? (
            started ? (
              <iframe
                src={embedSrc}
                title={video.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <>
                <Poster src={video.poster} />
                <PlayButton label={`Play ${video.title}`} onClick={play} />
              </>
            )
          ) : (
            <>
              <video
                key={video.platform}
                ref={videoRef}
                preload="metadata"
                playsInline
                controls={started}
                aria-label={video.title}
                className="absolute inset-0 h-full w-full object-cover"
              >
                {smaller.map((s) => (
                  <source key={s.src} src={s.src} type={s.type} media="(max-width: 640px)" />
                ))}
                {large && <source src={large.src} type={large.type} />}
                {video.fallbackSrc && <source src={video.fallbackSrc} type="video/mp4" />}
              </video>
              {!started && (
                <>
                  <Poster src={video.poster} />
                  <PlayButton label={`Play ${video.title}`} onClick={play} />
                </>
              )}
            </>
          )}
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Platform"
        onKeyDown={onKeyDown}
        className="mt-6 inline-flex rounded-full border border-neutral-200 p-0.5 text-sm dark:border-neutral-800"
      >
        {PLATFORMS.map((p) => {
          const selected = p === active;
          return (
            <button
              key={p}
              ref={(el) => {
                tabs.current[p] = el;
              }}
              id={`${id}-${p}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(p)}
              className={`rounded-full px-4 py-1.5 transition-colors motion-reduce:transition-none ${
                selected
                  ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
              }`}
            >
              {LABEL[p]}
              {!videos.some((v) => v.platform === p) && (
                <span className="ml-1.5 text-xs text-amber-600/90 dark:text-amber-500/90">
                  In progress
                </span>
              )}
            </button>
          );
        })}
      </div>

      {video?.durationSec ? (
        <p className="mt-3 text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
          {video.title} · {time(video.durationSec)}
        </p>
      ) : null}

      {video?.chapters?.length && !embedSrc ? (
        <ol className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm">
          {video.chapters.map((c) => (
            <li key={c.t}>
              <button
                type="button"
                onClick={() => seek(c.t)}
                className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                <span className="tabular-nums text-neutral-400 dark:text-neutral-500">{time(c.t)}</span>{' '}
                {c.label}
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
