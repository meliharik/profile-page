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

export const pitches: Record<string, Pitch> = load();

export const getPitch = (slug: string): Pitch | undefined => pitches[slug];

export const platformLabel = { ios: 'iOS', android: 'Android' } as const;

export const statusLabel = {
  ready: 'Prototype',
  'in-progress': 'In progress',
  planned: 'Planned',
} as const;
