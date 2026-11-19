export type Platform = 'ios' | 'android';
export type PlatformStatus = 'ready' | 'in-progress' | 'planned';

export interface PitchVideo {
  platform: Platform;
  title: string;
  /** Self-hosted MP4 variants, largest first. The player picks one by viewport width. */
  sources?: Array<{ src: string; width: number; height: number; type: 'video/mp4' }>;
  /** Direct storage URL of the largest file, tried only if the same-origin copy fails. */
  fallbackSrc?: string;
  /** YouTube (unlisted) or Vimeo embed URL, used when there is no self-hosted file. */
  embedUrl?: string;
  poster: string;
  width: number;
  height: number;
  durationSec?: number;
  chapters?: Array<{ t: number; label: string }>;
}

export interface PitchShot {
  platform: Platform;
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface PitchCategory {
  /** "map", "building", "listing", "add-home", "messages", "notifications", "design-system", ... */
  id: string;
  label: string;
  description?: string;
  shots: PitchShot[];
}

/** Written by scripts/import-pitch.ts into <slug>.media.ts. Do not edit by hand. */
export interface PitchMedia {
  videos: PitchVideo[];
  categories: PitchCategory[];
  credits?: Array<{ title: string; author: string; license: string; url: string }>;
}

export interface Pitch extends PitchMedia {
  slug: string;
  company: string;
  companyUrl: string;
  /** Language of the screenshots. Page copy stays English. */
  locale: 'en' | 'de';
  title: string;
  subtitle: string;
  /** ISO date */
  date: string;
  platforms: Record<
    Platform,
    { status: PlatformStatus; note?: string }
  >;
  highlights: Array<{ title: string; body: string }>;
  tech: Array<{ name: string; note?: string }>;
  /** Left out on a showcase page. */
  contact?: { email: string; calUrl?: string; callMinutes?: number };
  /**
   * A plain showcase of the work: no contact buttons, no author line, no
   * "about me" and no closing pitch. Used when the page is not a cold pitch.
   */
  showcase?: boolean;
  /** Replaces the default "I built this on my own" note under the hero. */
  note?: string;
}
