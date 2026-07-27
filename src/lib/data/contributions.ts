const merged = (repo: string) =>
  `https://github.com/${repo}/pulls?q=is%3Apr+author%3Ameliharik+is%3Amerged`;

export const contributionsData = {
  highlight: {
    project: 'Riverpod',
    url: merged('rrousselGit/riverpod'),
    description: 'Turkish translation of the documentation',
    meta: '7 merged',
  },
  others: [
    { project: 'Flutter', url: merged('flutter/website') },
    { project: 'FlutterFire', url: merged('firebase/flutterfire') },
    { project: 'Flame', url: merged('flame-engine/flame') },
    { project: 'Astro', url: merged('withastro/docs') },
    { project: 'Hono', url: merged('honojs/website') },
    { project: 'Drift', url: merged('simolus3/drift') },
    { project: 'Coil', url: merged('coil-kt/coil') },
  ],
};
