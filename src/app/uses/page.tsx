import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Uses',
  description:
    'The tools, languages and services Melih Arık uses to build mobile apps, backends and developer tools.',
  alternates: { canonical: 'https://meliharik.dev/uses' },
  openGraph: {
    title: 'Uses - Melih Arık',
    description:
      'The tools, languages and services Melih Arık uses to build mobile apps, backends and developer tools.',
    url: 'https://meliharik.dev/uses',
  },
};

const stagger = (n: number) => ({ '--stagger': n } as React.CSSProperties);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="link text-neutral-800 dark:text-neutral-200"
  >
    {children}
  </a>
);

const groups: { title: string; items: { name: string; note: string; url?: string }[] }[] = [
  {
    title: 'Mobile',
    items: [
      { name: 'Swift and SwiftUI', note: 'everything native on iOS and macOS' },
      { name: 'Xcode', note: 'the only editor I use for Apple platforms' },
      { name: 'Flutter and Dart', note: 'cross-platform work, and most of what I shipped as an indie' },
      { name: 'Kotlin', note: 'native Android' },
      { name: 'React Native', note: 'when a project is already in the JS ecosystem' },
    ],
  },
  {
    title: 'Web',
    items: [
      { name: 'Next.js', note: 'this site, savemyposts.com and ripstop.dev', url: 'https://nextjs.org' },
      { name: 'TypeScript', note: 'everywhere on the web side' },
      { name: 'Tailwind CSS', note: 'styling without leaving the markup', url: 'https://tailwindcss.com' },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'NestJS', note: 'the SaveMyPosts gateway' },
      { name: 'Spring Boot', note: 'the geo-fencing engine, with PostGIS and Redis' },
      { name: 'Go', note: 'smaller services that need to stay fast and boring' },
      { name: 'Python', note: 'data analysis and one-off scripts' },
      { name: 'Firebase', note: 'auth and realtime data when speed matters more than control' },
    ],
  },
  {
    title: 'Shipping',
    items: [
      { name: 'Netlify', note: 'this site', url: 'https://netlify.com' },
      { name: 'Vercel', note: 'most of the Next.js side projects', url: 'https://vercel.com' },
      { name: 'Railway', note: 'containers that need a database next to them', url: 'https://railway.app' },
      { name: 'GitHub Actions', note: 'CI, releases and a few scheduled jobs' },
      { name: 'Homebrew', note: 'how Portman gets installed', url: 'https://brew.sh' },
    ],
  },
  {
    title: 'My own tools',
    items: [
      { name: 'Portman', note: 'menu bar app to find and kill whatever is holding a port', url: 'https://github.com/meliharik/portman' },
      { name: 'Ripstop', note: 'remote config so I can fix a shipped app without a store review', url: 'https://ripstop.dev' },
    ],
  },
];

export default function Uses() {
  return (
    <main className="mx-auto max-w-xl px-6 py-24 sm:py-32">
      <div className="animate-enter" style={stagger(0)}>
        <Link
          href="/"
          className="text-sm text-neutral-400 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200"
        >
          ← Melih Arık
        </Link>
        <h1 className="mt-6 text-base font-medium text-neutral-900 dark:text-neutral-100">
          Uses
        </h1>
        <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
          The tools I actually reach for. Everything here earns its place by
          being in something I shipped, not by being on a list.
        </p>
      </div>

      {groups.map((group, i) => (
        <section
          key={group.title}
          className="animate-enter mt-14"
          style={stagger(i + 1)}
        >
          <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            {group.title}
          </h2>
          <div className="mt-5 space-y-3">
            {group.items.map((item) => (
              <p key={item.name} className="leading-relaxed">
                {item.url ? (
                  <A href={item.url}>{item.name}</A>
                ) : (
                  <span className="text-neutral-800 dark:text-neutral-200">
                    {item.name}
                  </span>
                )}{' '}
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  · {item.note}
                </span>
              </p>
            ))}
          </div>
        </section>
      ))}

      <footer
        className="animate-enter mt-20 border-t border-neutral-200/70 pt-8 text-sm text-neutral-400 dark:border-neutral-800 dark:text-neutral-500"
        style={stagger(groups.length + 1)}
      >
        Inspired by{' '}
        <A href="https://uses.tech">uses.tech</A>. Ask me about any of these on{' '}
        <A href="https://twitter.com/melihify">X</A>.
      </footer>
    </main>
  );
}
