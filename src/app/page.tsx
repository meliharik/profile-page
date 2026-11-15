import Image from 'next/image';
import { experienceData } from '@/lib/data/experience';
import { projects, moreProjects, type Project } from '@/lib/data/projects';
import { educationData } from '@/lib/data/education';
import { contributionsData } from '@/lib/data/contributions';
import { presentationsData } from '@/lib/data/presentations';
import { A, Section, SiteFooter, stagger } from '@/components/site';
import { ThemeToggle } from '@/components/ThemeToggle';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
}

const BLOG_URL = 'https://blog.meliharik.dev';

const decode = (s: string) =>
  s
    .replace(/^<!\[CDATA\[([\s\S]*?)\]\]>$/, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .trim();

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${BLOG_URL}/rss.xml`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map((match) => {
        const item = match[1];
        const tag = (name: string) =>
          decode(item.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`))?.[1] ?? '');
        return { title: tag('title'), link: tag('link'), pubDate: tag('pubDate') };
      })
      .filter((post) => post.title && post.link)
      .slice(0, 4);
  } catch {
    return [];
  }
}

// "Feb 2026 - Present" → "2026–now", "05.2017 - 08.2017" → "2017"
const years = (period: string) => {
  const [start, end] = period.split(/\s*-\s*/);
  const year = (s?: string) => s?.match(/\d{4}/)?.[0] ?? '';
  const endYear = /present/i.test(end ?? '') ? 'now' : year(end);
  const startYear = year(start);
  return startYear === endYear ? startYear : `${startYear}–${endYear}`;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

const Shot = ({
  project,
  sizes,
  priority = false,
  className = '',
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) => (
  <a
    href={project.url}
    target="_blank"
    rel="noreferrer"
    className={`group block overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 ${className}`}
    tabIndex={-1}
    aria-hidden
  >
    <Image
      src={project.image}
      alt=""
      width={1000}
      height={625}
      sizes={sizes}
      priority={priority}
      className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  </a>
);

const Badge = ({
  badge,
  href,
}: {
  badge?: Project['badge'];
  href: string;
}) => {
  if (!badge) return null;
  if (badge.type === 'waitlist') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="ml-2 whitespace-nowrap rounded-full border border-emerald-600/30 px-2 py-0.5 text-xs text-emerald-700 transition-colors hover:border-emerald-600/60 hover:text-emerald-600 dark:border-emerald-500/30 dark:text-emerald-500 dark:hover:border-emerald-500/60 dark:hover:text-emerald-400"
      >
        {badge.text}
      </a>
    );
  }
  return (
    <span className="ml-2 text-xs text-amber-600/90 dark:text-amber-500/90">
      {badge.text}
    </span>
  );
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Melih Arık',
  url: 'https://meliharik.dev',
  image: 'https://meliharik.dev/profile.jpeg',
  jobTitle: 'Software Engineer',
  email: 'mailto:hi@meliharik.dev',
  worksFor: {
    '@type': 'Organization',
    name: 'Omniva',
    url: 'https://www.omniva.ee',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Tartu',
      url: 'https://ut.ee',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Bursa Uludağ University',
      url: 'https://uludag.edu.tr',
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tallinn',
    addressCountry: 'EE',
  },
  knowsAbout: [
    'iOS development',
    'Android development',
    'SwiftUI',
    'Flutter',
    'React Native',
    'Kotlin',
    'Mobile application development',
    'Remote configuration',
    'Developer tools',
  ],
  nationality: { '@type': 'Country', name: 'Turkey' },
  workLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tallinn',
      addressCountry: 'EE',
    },
  },
  sameAs: [
    'https://github.com/meliharik',
    'https://linkedin.com/in/melihify',
    'https://twitter.com/melihify',
    'https://instagram.com/melihifyy',
    'https://medium.com/@melihify',
  ],
};

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <main className="mx-auto max-w-xl px-6 py-24 sm:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <header
        className="animate-enter flex items-center gap-4"
        style={stagger(0)}
      >
        <Image
          src="/profile.jpeg"
          alt="Melih Arık"
          width={48}
          height={48}
          priority
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h1 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
            Melih Arık
          </h1>
          <p className="mt-0.5 text-neutral-500 dark:text-neutral-400">
            Software Engineer
          </p>
        </div>
        <div className="ml-auto self-start">
          <ThemeToggle />
        </div>
      </header>

      <section
        className="animate-enter mt-10 space-y-4 leading-relaxed text-neutral-600 dark:text-neutral-400"
        style={stagger(1)}
      >
        <p>
          Building apps in Tallinn, Estonia. 30+ shipped to the App Store and
          Google Play, most recently{' '}
          <A href="https://transport.meliharik.dev">Hetku</A>, a live transit map
          for the Baltics.
        </p>
        <p>
          Off screen I play drums and guitar. I write on{' '}
          <A href="https://blog.meliharik.dev">my blog</A>, and I&apos;m open to
          freelance work: <A href="https://cal.com/meliharik">book a call</A>.
        </p>
      </section>

      <Section title="Experience" index={2}>
        <div className="space-y-3">
          {experienceData.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="flex items-baseline justify-between gap-6"
            >
              <p className="text-neutral-800 dark:text-neutral-200">
                {job.title}{' '}
                <span className="text-neutral-400 dark:text-neutral-500">
                  · {job.company}
                </span>
              </p>
              <p className="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
                {years(job.period)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Projects" index={3}>
        {/* Phones: compact rows with a small thumbnail. sm and up: 2x2 grid of screenshots. */}
        <div className="grid gap-y-6 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-8">
          {projects.map((project, i) => (
            <div key={project.title} className="flex items-start gap-4 sm:block">
              <Shot
                project={project}
                priority={i < 2}
                sizes="(max-width: 640px) 96px, 280px"
                className="w-24 shrink-0 rounded-lg sm:w-auto sm:rounded-xl"
              />
              <div className="min-w-0 sm:mt-2.5">
                <p className="flex flex-wrap items-baseline gap-y-1">
                  <A href={project.url} arrow>
                    {project.title}
                  </A>
                  <Badge badge={project.badge} href={project.url} />
                </p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          Also built{' '}
          {moreProjects.map((project, i, all) => (
            <span key={project.title}>
              <A href={project.url}>{project.title}</A>
              {i < all.length - 2 ? ', ' : i === all.length - 2 ? ' and ' : '.'}
            </span>
          ))}
        </p>
      </Section>

      <Section title="Open Source" index={4}>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-6">
            <p>
              <A href={contributionsData.highlight.url}>
                {contributionsData.highlight.project}
              </A>{' '}
              <span className="text-neutral-400 dark:text-neutral-500">
                · {contributionsData.highlight.description}
              </span>
            </p>
            <p className="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
              {contributionsData.highlight.meta}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
            Documentation and code sample fixes merged into{' '}
            {contributionsData.others.map((repo, i, all) => (
              <span key={repo.project}>
                <A href={repo.url}>{repo.project}</A>
                {i < all.length - 2 ? ', ' : i === all.length - 2 ? ' and ' : '.'}
              </span>
            ))}
          </p>
        </div>
      </Section>

      <Section title="Speaking" index={5}>
        <div className="space-y-3">
          {presentationsData.map((talk) => (
            <div
              key={talk.title}
              className="flex items-baseline justify-between gap-6"
            >
              <p>
                {talk.link ? (
                  <A href={talk.link.url}>{talk.title}</A>
                ) : (
                  <span className="text-neutral-800 dark:text-neutral-200">
                    {talk.title}
                  </span>
                )}{' '}
                <span className="text-neutral-400 dark:text-neutral-500">
                  · {talk.event.split(' - ')[0]}
                </span>
              </p>
              <p className="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
                {talk.date}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {posts.length > 0 && (
        <Section title="Writing" index={6}>
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.link}
                className="flex items-baseline justify-between gap-6"
              >
                <p>
                  <A href={post.link}>{post.title}</A>
                </p>
                <p className="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
                  {formatDate(post.pubDate)}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm">
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200"
            >
              All posts ↗
            </a>
          </p>
        </Section>
      )}

      <Section title="Research" index={7}>
        <div className="flex items-baseline justify-between gap-6">
          <p>
            <A href="https://www.iceti.org/sites/default/files/iceti_2024_book_of_proceedings.pdf">
              Encrypted Messaging Application Combining AES and RSA Algorithms
            </A>{' '}
            <span className="text-neutral-400 dark:text-neutral-500">
              · ICETI&apos;24, first author
            </span>
          </p>
          <p className="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
            Oct 2024
          </p>
        </div>
      </Section>

      <Section title="Education" index={8}>
        <div className="space-y-3">
          {educationData.map((edu) => {
            const isLanguageSchool = edu.degree === 'Language School';
            const name = isLanguageSchool
              ? 'ILAC Toronto'
              : edu.institution.split(',')[0];
            const detail = isLanguageSchool
              ? 'Language school'
              : `${edu.degree
                  .replace('Master of Science', 'MSc')
                  .replace('Bachelor of Science', 'BSc')}, ${edu.field}`;
            return (
              <div
                key={edu.institution}
                className="flex items-baseline justify-between gap-6"
              >
                <p className="text-neutral-800 dark:text-neutral-200">
                  {name}{' '}
                  <span className="text-neutral-400 dark:text-neutral-500">
                    · {detail}
                  </span>
                </p>
                <p className="shrink-0 text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
                  {years(edu.period)}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <SiteFooter index={9} />
    </main>
  );
}
