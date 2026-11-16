'use client';

import { useEffect } from 'react';
import { sendPitchBeacon } from './beacon';

// Tells /api/pitch-open that this pitch page was opened (once per tab session).
// Link previews and crawlers never run this, so they don't count.
// Visit the page once with ?me=1 on your own devices to stop counting yourself
// (?me=0 undoes it). A ?r=<name> on the link is passed along, so a different
// link per recipient shows who opened it.
export function OpenBeacon({ pitch, company }: { pitch: string; company: string }) {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const me = url.searchParams.get('me');
      if (me === '1') localStorage.setItem('pitch-me', '1');
      if (me === '0') localStorage.removeItem('pitch-me');

      const key = `pitch-open:${pitch}`;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');

      let from = '';
      try {
        if (document.referrer) from = new URL(document.referrer).hostname;
      } catch {}
      sendPitchBeacon({ kind: 'open', slug: pitch, company, ref: url.searchParams.get('r') ?? '', from });
    } catch {}
  }, [pitch, company]);

  return null;
}
