// Downloads pitch page data (pitch-data/*.json in Firebase Storage) into
// .pitches/ before a build. Pitch content is kept out of this public repo;
// scripts/import-pitch.ts is what writes it.
//
// Credentials: FIREBASE_SERVICE_ACCOUNT (the JSON, or a path to it) on Netlify,
// a read-only service account. Locally, gcloud application-default login.
// Never fails the build: without credentials the site builds with no pitch
// pages (every /pitch/* is a 404), and says so in the log.
import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const BUCKET = process.env.PITCH_BUCKET ?? 'meliharik-dev.firebasestorage.app';
const outDir = path.resolve(import.meta.dirname, '..', '.pitches');

const warn = (msg) => console.warn(`\n⚠ fetch-pitches: ${msg}\n`);

async function main() {
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  const onCi = Boolean(process.env.NETLIFY || process.env.CI);
  if (!sa && onCi) {
    warn('FIREBASE_SERVICE_ACCOUNT is not set, building without pitch pages.');
    mkdirSync(outDir, { recursive: true });
    return;
  }

  process.env.GOOGLE_CLOUD_QUOTA_PROJECT ??= BUCKET.split('.')[0];
  const { initializeApp, cert, applicationDefault } = await import('firebase-admin/app');
  const { getStorage } = await import('firebase-admin/storage');
  const credential = sa
    ? cert(JSON.parse(sa.trim().startsWith('{') ? sa : readFileSync(sa, 'utf8')))
    : applicationDefault();
  const bucket = getStorage(initializeApp({ credential, storageBucket: BUCKET })).bucket();

  const [files] = await bucket.getFiles({ prefix: 'pitch-data/' });
  const pitches = files.filter((f) => /^pitch-data\/[a-z0-9-]+\.json$/.test(f.name));
  const downloaded = await Promise.all(
    pitches.map(async (f) => [path.basename(f.name), (await f.download())[0]]),
  );

  // Replace the folder only after every download succeeded.
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  for (const [name, body] of downloaded) {
    JSON.parse(body.toString('utf8')); // refuse to write broken JSON
    writeFileSync(path.join(outDir, name), body);
  }
  console.log(`fetch-pitches: ${downloaded.length} pitch(es): ${downloaded.map(([n]) => n.replace(/\.json$/, '')).join(', ') || 'none'}`);
}

try {
  await main();
} catch (error) {
  mkdirSync(outDir, { recursive: true });
  const kept = readdirSync(outDir).length;
  warn(`${error.message}\nKeeping ${kept} pitch(es) already in .pitches/.`);
}
