// Imports a pitch: optimizes its videos and screenshots, uploads them to
// Firebase Storage (public, under pitches/<slug>/) and uploads the page data
// (copy + media URLs) to pitch-data/<slug>.json, which is not public. The site
// downloads pitch-data/ before every build (scripts/fetch-pitches.mjs), so no
// pitch content ever lands in this public repo.
//
//   npm run pitch:import -- <slug> <source-dir> [--dry-run] [--rebuild]
//
// <source-dir> must contain pitch.json (one per company, kept outside this repo):
// the page copy (company, title, highlights, tech, ...) plus which files go where.
// --rebuild starts a Netlify production build afterwards so the page goes live.
// Needs ffmpeg, ffprobe and cwebp on PATH. Credentials, in this order:
//   FIREBASE_SERVICE_ACCOUNT  path to a service account JSON, or the JSON itself
//   GOOGLE_APPLICATION_CREDENTIALS / gcloud application-default login
// Never commit a key file; service account key names are git-ignored.
//
// Re-runnable: every output name carries a hash of its source bytes and the
// encoding settings, optimized files are cached in .pitch-cache/, and files that
// already exist in the bucket are not uploaded again.

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const BUCKET = process.env.PITCH_BUCKET ?? 'meliharik-dev.firebasestorage.app';
const MAX_IMAGE_WIDTH = 1290;
const IMAGE_PROFILE = `webp-q82-max${MAX_IMAGE_WIDTH}`;
const VIDEO_PROFILE = 'h264-crf23-slow-aac128-faststart';
const SMALL_VIDEO_WIDTH = 540;
const CACHE_CONTROL = 'public, max-age=31536000, immutable';
const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID ?? 'c5e3d4a0-067e-4dc4-8f12-f387ab847f80';

type Platform = 'ios' | 'android';

interface Manifest {
  slug: string;
  company: string;
  companyUrl: string;
  locale: 'en' | 'de';
  title: string;
  subtitle: string;
  date: string;
  platforms: Record<Platform, { status: 'ready' | 'in-progress' | 'planned'; note?: string }>;
  highlights: Array<{ title: string; body: string }>;
  tech: Array<{ name: string; note?: string }>;
  contact?: { email: string; calUrl?: string; callMinutes?: number };
  /** A plain showcase page: no contact, no author. `contact` is then left out. */
  showcase?: boolean;
  note?: string;
  credits?: string;
  videos: Array<{
    platform: Platform;
    title: string;
    file?: string;
    embedUrl?: string;
    poster?: string;
    posterAt?: number;
    chapters?: Array<{ t: number; label: string }>;
  }>;
  categories: Array<{
    id: string;
    label: string;
    description?: string;
    shots: Array<{ platform: Platform; file: string; alt: string; caption?: string }>;
  }>;
}

interface Upload {
  local: string;
  remote: string;
  contentType: string;
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const rebuild = args.includes('--rebuild');
const [slug, sourceArg] = args.filter((a) => !a.startsWith('--'));
if (!slug || !sourceArg) {
  console.error('usage: npm run pitch:import -- <slug> <source-dir> [--dry-run] [--rebuild]');
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`invalid slug "${slug}": use lowercase letters, digits and dashes`);
  process.exit(1);
}

const repoRoot = path.resolve(import.meta.dirname, '..');
const sourceDir = path.resolve(sourceArg);
const cacheDir = path.join(repoRoot, '.pitch-cache', slug);
const manifest: Manifest = JSON.parse(readFileSync(path.join(sourceDir, 'pitch.json'), 'utf8'));
if (manifest.slug !== slug) {
  console.error(`pitch.json says slug "${manifest.slug}", expected "${slug}"`);
  process.exit(1);
}
const required = ['company', 'companyUrl', 'title', 'subtitle', 'date', 'platforms', 'highlights', 'tech'] as const;
const missing: string[] = required.filter((k) => !manifest[k]);
if (!manifest.showcase && !manifest.contact) missing.push('contact (or "showcase": true)');
if (missing.length) {
  console.error(`pitch.json is missing: ${missing.join(', ')}`);
  process.exit(1);
}

const run = (cmd: string, cmdArgs: string[]) =>
  execFileSync(cmd, cmdArgs, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();

const hashOf = (file: string, profile: string) =>
  createHash('sha256').update(readFileSync(file)).update(profile).digest('hex').slice(0, 8);

const probe = (file: string) => {
  const out = JSON.parse(
    run('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file]),
  );
  const video = out.streams.find((s: { codec_type: string }) => s.codec_type === 'video');
  return {
    width: Number(video.width),
    height: Number(video.height),
    duration: out.format?.duration ? Number(out.format.duration) : undefined,
    hasAudio: out.streams.some((s: { codec_type: string }) => s.codec_type === 'audio'),
  };
};

const ensureDir = (file: string) => mkdirSync(path.dirname(file), { recursive: true });
const kb = (file: string) => `${Math.round(statSync(file).size / 1024)} KB`;
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function toWebp(input: string, output: string) {
  if (existsSync(output)) return;
  ensureDir(output);
  const { width } = probe(input);
  const resize = width > MAX_IMAGE_WIDTH ? ['-resize', String(MAX_IMAGE_WIDTH), '0'] : [];
  run('cwebp', ['-quiet', '-q', '82', '-metadata', 'none', ...resize, input, '-o', output]);
}

function toMp4(input: string, output: string, width: number, hasAudio: boolean) {
  if (existsSync(output)) return;
  ensureDir(output);
  run('ffmpeg', [
    '-v', 'error', '-y', '-i', input,
    '-vf', `scale=${width}:-2`,
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '23', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
    ...(hasAudio ? ['-c:a', 'aac', '-b:a', '128k'] : ['-an']),
    '-movflags', '+faststart',
    output,
  ]);
}

const uploads: Upload[] = [];
const publicUrl = (remote: string) =>
  `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(remote)}?alt=media`;
const queue = (local: string, remote: string, contentType: string) => {
  uploads.push({ local, remote, contentType });
  return publicUrl(remote);
};

// Videos
const videos = manifest.videos.map((v) => {
  if (!v.file) {
    if (!v.embedUrl || !v.poster) throw new Error(`${v.platform} video needs file, or embedUrl and poster`);
    const src = path.join(sourceDir, v.poster);
    const hash = hashOf(src, IMAGE_PROFILE);
    const out = path.join(cacheDir, 'posters', `${v.platform}.${hash}.webp`);
    toWebp(src, out);
    const { width, height } = probe(out);
    return {
      platform: v.platform,
      title: v.title,
      embedUrl: v.embedUrl,
      poster: queue(out, `pitches/${slug}/posters/${v.platform}.${hash}.webp`, 'image/webp'),
      width,
      height,
      ...(v.chapters?.length ? { chapters: v.chapters } : {}),
    };
  }

  const src = path.join(sourceDir, v.file);
  const info = probe(src);
  const hash = hashOf(src, VIDEO_PROFILE);
  const widths = [info.width, ...(info.width > SMALL_VIDEO_WIDTH ? [SMALL_VIDEO_WIDTH] : [])];

  const sources = widths.map((w) => {
    const name = w === info.width ? v.platform : `${v.platform}-${w}`;
    const out = path.join(cacheDir, 'video', `${name}.${hash}.mp4`);
    toMp4(src, out, w, info.hasAudio);
    const o = probe(out);
    return {
      src: queue(out, `pitches/${slug}/video/${name}.${hash}.mp4`, 'video/mp4'),
      width: o.width,
      height: o.height,
      type: 'video/mp4' as const,
    };
  });

  // The poster name also depends on the frame time, so changing posterAt
  // produces a new file instead of reusing the cached one.
  const posterHash = hashOf(src, `${VIDEO_PROFILE}|poster@${v.posterAt ?? 1}`);
  const posterPng = path.join(cacheDir, 'posters', `${v.platform}.${posterHash}.png`);
  const posterOut = posterPng.replace(/\.png$/, '.webp');
  if (!existsSync(posterOut)) {
    ensureDir(posterPng);
    run('ffmpeg', ['-v', 'error', '-y', '-ss', String(v.posterAt ?? 1), '-i', src, '-frames:v', '1', posterPng]);
    toWebp(posterPng, posterOut);
  }

  return {
    platform: v.platform,
    title: v.title,
    sources,
    poster: queue(posterOut, `pitches/${slug}/posters/${v.platform}.${posterHash}.webp`, 'image/webp'),
    width: info.width,
    height: info.height,
    ...(info.duration ? { durationSec: Math.round(info.duration) } : {}),
    ...(v.chapters?.length ? { chapters: v.chapters } : {}),
  };
});

// Screenshots
const categories = manifest.categories.map((c) => ({
  id: c.id,
  label: c.label,
  ...(c.description ? { description: c.description } : {}),
  shots: c.shots.map((s) => {
    const src = path.join(sourceDir, s.file);
    const hash = hashOf(src, IMAGE_PROFILE);
    const base = slugify(path.basename(s.file, path.extname(s.file)));
    const rel = `shots/${s.platform}/${c.id}/${base}.${hash}.webp`;
    const out = path.join(cacheDir, rel);
    toWebp(src, out);
    const { width, height } = probe(out);
    return {
      platform: s.platform,
      src: queue(out, `pitches/${slug}/${rel}`, 'image/webp'),
      alt: s.alt,
      ...(s.caption ? { caption: s.caption } : {}),
      width,
      height,
    };
  }),
}));

// Photo credits: markdown table | File | Title | Author | License | Source |
const credits = manifest.credits
  ? readFileSync(path.join(sourceDir, manifest.credits), 'utf8')
      .split('\n')
      .map((line) => line.split('|').map((cell) => cell.trim()))
      .filter((cells) => cells.length >= 7 && /^https?:\/\//.test(cells[5]))
      .map(([, , title, author, license, url]) => ({ title, author, license, url }))
  : [];

// Report
const totalBytes = uploads.reduce((sum, u) => sum + statSync(u.local).size, 0);
console.log(`\n${slug}: ${videos.length} video(s), ${categories.reduce((n, c) => n + c.shots.length, 0)} screenshot(s), ${credits.length} photo credit(s)`);
for (const u of uploads) console.log(`  ${kb(u.local).padStart(8)}  ${u.remote}`);
console.log(`  total ${(totalBytes / 1024 / 1024).toFixed(1)} MB in ${uploads.length} files → gs://${BUCKET}`);

const pitch = {
  slug,
  company: manifest.company,
  companyUrl: manifest.companyUrl,
  locale: manifest.locale ?? 'en',
  title: manifest.title,
  subtitle: manifest.subtitle,
  date: manifest.date,
  platforms: manifest.platforms,
  highlights: manifest.highlights,
  tech: manifest.tech,
  ...(manifest.showcase ? { showcase: true } : { contact: manifest.contact }),
  ...(manifest.note ? { note: manifest.note } : {}),
  videos,
  categories,
  credits,
};
const pitchJson = JSON.stringify(pitch, null, 2) + '\n';
const localFile = path.join(repoRoot, '.pitches', `${slug}.json`);
const dataPath = `pitch-data/${slug}.json`;

if (dryRun) {
  console.log(`\n--dry-run: nothing uploaded, ${dataPath} and .pitches/${slug}.json not written.`);
  process.exit(0);
}

// Upload
// gcloud application-default credentials carry a quota project of their own
// (often another project); bill API calls to the bucket's project instead.
process.env.GOOGLE_CLOUD_QUOTA_PROJECT ??= BUCKET.split('.')[0];
const { initializeApp, cert, applicationDefault } = await import('firebase-admin/app');
const { getStorage } = await import('firebase-admin/storage');

const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
const credential = sa
  ? cert(JSON.parse(sa.trim().startsWith('{') ? sa : readFileSync(sa, 'utf8')))
  : applicationDefault();
const bucket = getStorage(initializeApp({ credential, storageBucket: BUCKET })).bucket();

let uploaded = 0;
for (const u of uploads) {
  const file = bucket.file(u.remote);
  const [exists] = await file.exists();
  if (exists) continue;
  await bucket.upload(u.local, {
    destination: u.remote,
    resumable: statSync(u.local).size > 5 * 1024 * 1024,
    metadata: { contentType: u.contentType, cacheControl: CACHE_CONTROL },
  });
  uploaded++;
  console.log(`  uploaded ${u.remote}`);
}
console.log(`${uploaded} uploaded, ${uploads.length - uploaded} already in the bucket.`);

// Page data: private (see storage.rules), read by scripts/fetch-pitches.mjs at build time.
await bucket.file(dataPath).save(pitchJson, {
  resumable: false,
  metadata: { contentType: 'application/json', cacheControl: 'private, no-cache' },
});
mkdirSync(path.dirname(localFile), { recursive: true });
writeFileSync(localFile, pitchJson);
console.log(`saved ${dataPath} and .pitches/${slug}.json`);

if (rebuild) {
  run('netlify', ['api', 'createSiteBuild', '--data', JSON.stringify({ site_id: NETLIFY_SITE_ID })]);
  console.log('Netlify production build started; the page is live in a few minutes:');
} else {
  console.log('Not live yet: re-run with --rebuild, or deploy the site, to publish it at');
}
console.log(`  https://meliharik.dev/pitch/${slug}`);
