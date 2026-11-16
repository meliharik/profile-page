// Sends a push notification (via ntfy) when someone opens a pitch page, watches
// its video, or the video fails to start, so a follow-up can be timed. The ntfy topic works like a password: it lives only
// in the NTFY_TOPIC environment variable, never in this repo. Without it, this
// endpoint accepts the request and does nothing.
export const dynamic = 'force-dynamic';

const SLUG = /^[a-z0-9-]{1,40}$/;
const BOT = /bot|crawl|spider|preview|headless|lighthouse|slurp|facebookexternalhit|embedly|whatsapp|telegram/i;
const SITE = /^https:\/\/(www\.)?meliharik\.dev$/;

const done = () => new Response(null, { status: 204 });

const PLATFORM: Record<string, string> = { ios: 'iOS', android: 'Android' };

const seconds = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(Math.max(Math.round(n), 0), 3600) : 0;
};
const clock = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const clean = (value: unknown, max: number) =>
  String(value ?? '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
    .slice(0, max);

function device(ua: string) {
  const os = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Mac OS X/.test(ua)
          ? 'Mac'
          : /Windows/.test(ua)
            ? 'Windows'
            : /Linux/.test(ua)
              ? 'Linux'
              : 'Unknown device';
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /Firefox\//.test(ua)
      ? 'Firefox'
      : /Chrome\//.test(ua)
        ? 'Chrome'
        : /Safari\//.test(ua)
          ? 'Safari'
          : '';
  return browser ? `${os} · ${browser}` : os;
}

// Netlify passes the visitor's approximate location in x-nf-geo (JSON, or
// base64-encoded JSON depending on the runtime).
function place(req: Request) {
  const raw = req.headers.get('x-nf-geo');
  if (raw) {
    for (const text of [raw, Buffer.from(raw, 'base64').toString('utf8')]) {
      try {
        const geo = JSON.parse(text);
        return [geo.city, geo.country?.name].filter(Boolean).join(', ');
      } catch {}
    }
  }
  return req.headers.get('x-country') ?? '';
}

export async function POST(req: Request) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return done();

  const origin = req.headers.get('origin');
  if (origin && !SITE.test(origin)) return done();

  const ua = req.headers.get('user-agent') ?? '';
  if (!ua || BOT.test(ua)) return done();

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return done();
  }

  const slug = clean(body.slug, 40);
  if (!SLUG.test(slug)) return done();
  const company = clean(body.company, 60) || slug;
  const who = `${place(req) || 'Unknown location'} · ${device(ua)}`;

  let title: string;
  let lines: string[];
  let tags = ['eyes'];
  let priority = 3;

  if (body.kind === 'video') {
    const watched = (body.watched ?? {}) as Record<string, unknown>;
    const durations = (body.durations ?? {}) as Record<string, unknown>;
    const parts = Object.keys(PLATFORM)
      .filter((p) => seconds(watched[p]) > 0)
      .map((p) => {
        const total = seconds(durations[p]);
        return `${PLATFORM[p]} ${clock(seconds(watched[p]))}${total ? ` of ${clock(total)}` : ''}`;
      });
    if (!parts.length) return done();
    title = `${company} video watched`;
    lines = [parts.join(' · '), who];
    tags = ['tv'];
  } else if (body.kind === 'video-stuck') {
    const platform = PLATFORM[clean(body.platform, 10)] ?? 'Video';
    title = `${company} video didn't start`;
    lines = [`${platform} video stuck after the play click`, who];
    tags = ['warning'];
    priority = 4;
  } else {
    const ref = clean(body.ref, 40);
    const from = clean(body.from, 80);
    title = `${company} pitch opened`;
    lines = [who, ref && `Link: ?r=${ref}`, from && `Came from: ${from}`].filter(Boolean);
  }

  try {
    await fetch('https://ntfy.sh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        title,
        message: lines.join('\n'),
        tags,
        priority,
        click: `https://meliharik.dev/pitch/${slug}`,
      }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {}
  return done();
}
