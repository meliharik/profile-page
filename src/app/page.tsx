import Image from 'next/image';
import { experienceData } from '@/lib/data/experience';
import { projectsData } from '@/lib/data/projects';
import { educationData } from '@/lib/data/education';
import { presentationsData } from '@/lib/data/presentations';
import { LocalTime } from '@/components/LocalTime';
import { ThemeToggle } from '@/components/ThemeToggle';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
}

async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const res = await fetch('https://medium.com/feed/@melihify', {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
      .map((match) => {
        const item = match[1];
        return {
          title: item.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/)?.[1] ?? '',
          link: item.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() ?? '',
          pubDate: item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? '',
        };
      })
      .filter((post) => post.title && post.link)
      .slice(0, 4);
  } catch {
    return [];
  }
}

const stagger = (n: number) => ({ '--stagger': n } as React.CSSProperties);

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

const A = ({
  href,
  children,
  arrow = false,
}: {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
}) => (
  <a
    href={href}
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
    className="link group/link text-neutral-800 dark:text-neutral-200"
  >
    {children}
    {arrow && (
      <span
        aria-hidden
        className="ml-0.5 inline-block text-neutral-400 transition-transform duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px dark:text-neutral-500"
      >
        ↗
      </span>
    )}
  </a>
);

const Section = ({
  title,
  index,
  children,
}: {
  title: string;
  index: number;
  children: React.ReactNode;
}) => (
  <section className="animate-enter mt-16" style={stagger(index)}>
    <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
      {title}
    </h2>
    <div className="mt-5">{children}</div>
  </section>
);

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
  ],
  sameAs: [
    'https://github.com/meliharik',
    'https://linkedin.com/in/melihify',
    'https://twitter.com/melihify',
    'https://instagram.com/melihifyy',
    'https://medium.com/@melihify',
  ],
};

export default async function Home() {
  const posts = await getMediumPosts();

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
          Building logistics apps at <A href="https://www.omniva.ee">Omniva</A> in
          Tallinn. Previously shipped 30+ indie apps to the App Store and Google
          Play with SwiftUI, Flutter and React Native.
        </p>
        <p>
          Studying for a master&apos;s in software engineering at the University
          of Tartu. Open to freelance work, feel free to{' '}
          <A href="https://cal.com/meliharik">book a call</A>.
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
        <div className="space-y-6">
          {projectsData.map((project) => {
            const href = project.links?.[0]?.url;
            return (
              <div key={project.title}>
                <p>
                  {href ? (
                    <A href={href} arrow>
                      {project.title}
                    </A>
                  ) : (
                    <span className="text-neutral-800 dark:text-neutral-200">
                      {project.title}
                    </span>
                  )}
                  {project.badge?.type === 'award' && (
                    <span className="ml-2 text-xs text-amber-600/90 dark:text-amber-500/90">
                      {project.badge.text}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {project.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Speaking" index={4}>
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
        <Section title="Writing" index={5}>
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
              href="https://medium.com/@melihify"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 transition-colors hover:text-neutral-800 dark:text-neutral-500 dark:hover:text-neutral-200"
            >
              All posts ↗
            </a>
          </p>
        </Section>
      )}

      <Section title="Research" index={6}>
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

      <Section title="Education" index={7}>
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

      <footer
        className="animate-enter mt-20 border-t border-neutral-200/70 pt-8 dark:border-neutral-800"
        style={stagger(8)}
      >
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {[
            { label: 'GitHub', href: 'https://github.com/meliharik' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/melihify' },
            { label: 'X', href: 'https://twitter.com/melihify' },
            { label: 'Instagram', href: 'https://instagram.com/melihifyy' },
            { label: 'Email', href: 'mailto:hi@meliharik.dev' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              {...(social.href.startsWith('http')
                ? { target: '_blank', rel: 'noreferrer' }
                : {})}
              className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-neutral-400 dark:text-neutral-500">
          Tallinn, Estonia · <LocalTime /> local
        </p>
      </footer>
    </main>
  );
}
