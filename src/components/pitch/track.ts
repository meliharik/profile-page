'use client';

import { sendGAEvent } from '@next/third-parties/google';

type PitchEvent =
  | { name: 'pitch_video_play'; platform: string }
  | { name: 'pitch_video_playing'; platform: string }
  | { name: 'pitch_video_stuck'; platform: string; ready_state: number; network_state: number }
  | { name: 'pitch_video_watched'; seconds: number; ios_seconds: number; android_seconds: number }
  | { name: 'pitch_cta_click'; cta: string }
  | { name: 'pitch_lightbox_open'; category: string; platform: string };

/** GA4 event, tagged with the pitch slug. No-op when GA is not loaded. */
export function track(pitch: string, { name, ...params }: PitchEvent) {
  try {
    if (typeof window === 'undefined' || !('dataLayer' in window)) return;
    sendGAEvent('event', name, { pitch, ...params });
  } catch {}
}
