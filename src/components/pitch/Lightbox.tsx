'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { PitchShot } from '@/lib/data/pitches/types';

export interface LightboxItem {
  shot: PitchShot;
  category: string;
  /** 1-based position inside its category */
  position: number;
  categorySize: number;
}

const Arrow = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d={dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
  </svg>
);

const navButton =
  'flex h-11 w-11 items-center justify-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:transition-none';

/**
 * Full-screen viewer on a modal <dialog>: the rest of the page becomes inert,
 * Esc closes it and focus returns to the thumbnail that opened it.
 */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: LightboxItem[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const pointerX = useRef<number | null>(null);
  // The thumbnail that opened the viewer: focused again on close.
  const opener = useRef<HTMLElement | null>(
    typeof document !== 'undefined' && document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );
  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const returnTo = opener.current;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      // Don't call dialog.close() here: its async "close" event would reach
      // onClose after a remount (React strict mode). Unmounting removes it.
      root.style.overflow = overflow;
      returnTo?.focus({ preventScroll: true });
    };
  }, []);

  const go = (delta: number) => {
    const next = index + delta;
    if (next >= 0 && next < items.length) onIndex(next);
  };

  if (!item) return null;
  const { shot } = item;

  return (
    <dialog
      ref={ref}
      aria-label={`${item.category} screens`}
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1);
        if (e.key === 'ArrowRight') go(1);
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onPointerDown={(e) => {
        pointerX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (pointerX.current === null || e.pointerType === 'mouse') return;
        const dx = e.clientX - pointerX.current;
        pointerX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
      className="m-0 h-full max-h-none w-full max-w-none bg-neutral-950/95 p-0 text-neutral-100 backdrop:bg-transparent open:flex open:flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm text-neutral-400" aria-live="polite">
          <span className="text-neutral-100">{item.category}</span> ·{' '}
          <span className="tabular-nums">
            {item.position} / {item.categorySize}
          </span>
        </p>
        <button type="button" onClick={onClose} aria-label="Close" className={navButton}>
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        className="flex min-h-0 flex-1 items-center justify-center gap-2 px-2 sm:gap-6 sm:px-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!hasPrev}
          aria-label="Previous screen"
          className={`${navButton} hidden sm:flex`}
        >
          <Arrow dir="left" />
        </button>
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes="(max-width: 640px) 90vw, 440px"
          className="h-auto max-h-full w-auto max-w-full rounded-[1.4rem] object-contain"
          style={{ maxHeight: 'calc(100dvh - 9rem)' }}
          draggable={false}
        />
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!hasNext}
          aria-label="Next screen"
          className={`${navButton} hidden sm:flex`}
        >
          <Arrow dir="right" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pb-5 pt-3 sm:justify-center sm:px-6">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={!hasPrev}
          aria-label="Previous screen"
          className={`${navButton} sm:hidden`}
        >
          <Arrow dir="left" />
        </button>
        <p className="text-center text-sm text-neutral-400">{shot.caption ?? shot.alt}</p>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={!hasNext}
          aria-label="Next screen"
          className={`${navButton} sm:hidden`}
        >
          <Arrow dir="right" />
        </button>
      </div>
    </dialog>
  );
}
