// Server-only: reads pitch page data from .pitches/, which is git-ignored and
// filled before each build by scripts/fetch-pitches.mjs (or locally by
// scripts/import-pitch.ts). Pitch pages are shared by link only: never list
// them on the site or in the sitemap.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import type { Pitch } from './types';

export type { Pitch, PitchCategory, PitchShot, PitchVideo, Platform, PlatformStatus } from './types';

const dir = path.join(process.cwd(), '.pitches');

function load(): Record<string, Pitch> {
  if (!existsSync(dir)) return {};
  const entries = readdirSync(dir)
    .filter((f) => /^[a-z0-9-]+\.json$/.test(f))
    .map((f) => JSON.parse(readFileSync(path.join(dir, f), 'utf8')) as Pitch)
    .filter((p) => p.slug && p.company);
  return Object.fromEntries(entries.map((p) => [p.slug, p]));
}

// Video files play from this domain (/pitch-media/*, proxied by Netlify, see
// public/_redirects): some company networks block firebasestorage.googleapis.com.
// Images don't need this, they already go through next/image on this domain.
const STORAGE = /^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/pitches%2F([^?]+)\?alt=media$/;

const sameOrigin = (src: string) => {
  const m = STORAGE.exec(src);
  return m ? `/pitch-media/${decodeURIComponent(m[1])}` : src;
};

function withLocalVideos(pitch: Pitch): Pitch {
  return {
    ...pitch,
    videos: pitch.videos.map((v) => {
      if (!v.sources?.length) return v;
      const direct = v.sources[0].src;
      const sources = v.sources.map((s) => ({ ...s, src: sameOrigin(s.src) }));
      return { ...v, sources, fallbackSrc: sources[0].src !== direct ? direct : undefined };
    }),
  };
}

export const pitches: Record<string, Pitch> = Object.fromEntries(
  Object.entries(load()).map(([slug, p]) => [slug, withLocalVideos(p)]),
);

export const getPitch = (slug: string): Pitch | undefined => pitches[slug];

export const platformLabel = { ios: 'iOS', android: 'Android' } as const;

export const statusLabel = {
  ready: 'Prototype',
  'in-progress': 'In progress',
  planned: 'Planned',
} as const;
