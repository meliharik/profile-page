'use client';

import { track } from './track';

/** An <a> that reports a CTA click to GA. Styling comes from the caller. */
export const TrackedLink = ({
  pitch,
  cta,
  href,
  className,
  children,
}: {
  pitch: string;
  cta: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
    onClick={() => track(pitch, { name: 'pitch_cta_click', cta })}
    className={className}
  >
    {children}
  </a>
);
