// Tells Bing (and other IndexNow engines) that the site changed.
// Runs after every production build; never fails the build.
const KEY = '618c88d2543f4aec975837bdb9cae508';
const HOST = 'meliharik.dev';
const URLS = [`https://${HOST}`];

if (process.env.CONTEXT && process.env.CONTEXT !== 'production') {
  console.log(`IndexNow skipped (${process.env.CONTEXT})`);
  process.exit(0);
}

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: URLS,
    }),
  });
  console.log(`IndexNow: ${res.status} ${res.statusText}`);
} catch (error) {
  console.log(`IndexNow failed: ${error.message}`);
}
