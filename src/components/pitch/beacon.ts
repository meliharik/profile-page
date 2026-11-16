'use client';

// Reports pitch activity to /api/pitch-open, which turns it into a phone
// notification. Never reports the owner's own browsers (marked with ?me=1),
// local development or automated browsers.

export type PitchBeacon =
  | { kind: 'open'; slug: string; company: string; ref: string; from: string }
  | {
      kind: 'video';
      slug: string;
      company: string;
      watched: Record<string, number>;
      durations: Record<string, number>;
    }
  | { kind: 'video-stuck'; slug: string; company: string; platform: string };

export function isOwnVisit() {
  try {
    if (localStorage.getItem('pitch-me') === '1') return true;
  } catch {}
  return ['localhost', '127.0.0.1'].includes(location.hostname) || navigator.webdriver;
}

export function sendPitchBeacon(data: PitchBeacon) {
  try {
    if (isOwnVisit()) return;
    const body = JSON.stringify(data);
    if (!navigator.sendBeacon?.('/api/pitch-open', body)) {
      fetch('/api/pitch-open', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
  } catch {}
}
