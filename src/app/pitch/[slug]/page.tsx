import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { A, Section, SectionTitle, SiteFooter, stagger } from '@/components/site';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Gallery } from '@/components/pitch/Gallery';
import { TrackedLink } from '@/components/pitch/TrackedLink';
import { VideoStage } from '@/components/pitch/VideoStage';
import {
  getPitch,
  pitches,
  platformLabel,
  statusLabel,
  type Pitch,
  type Platform,
  type PlatformStatus,
} from '@/lib/data/pitches';

// Only the slugs in src/lib/data/pitches exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(pitches).map((slug) => ({ slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pitch = getPitch(slug);
  if (!pitch) return {};
  const url = `https://meliharik.dev/pitch/${slug}`;
  const title = `${pitch.company} prototype`;
  return {
    title,
    description: pitch.subtitle,
    alternates: { canonical: url },
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    openGraph: {
      type: 'website',
      url,
      title: pitch.title,
      description: pitch.subtitle,
      siteName: 'Melih Arık',
    },
    twitter: {
      card: 'summary_large_image',
      title: pitch.title,
      description: pitch.subtitle,
    },
  };
}

const PLATFORMS: Platform[] = ['ios', 'android'];

const statusStyle: Record<PlatformStatus, string> = {
  ready:
    'border-emerald-600/30 text-emerald-700 dark:border-emerald-500/30 dark:text-emerald-500',
  'in-progress':
    'border-amber-600/30 text-amber-700 dark:border-amber-500/30 dark:text-amber-500',
  planned:
    'border-neutral-300 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400',
};

const button = {
  primary:
    'inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-sm text-white transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950',
  secondary:
    'inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm text-neutral-800 transition-colors hover:border-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 dark:border-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-600 dark:focus-visible:ring-neutral-100 dark:focus-visible:ring-offset-neutral-950',
};

const mailto = (email: string, subject: string, body?: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

function ContactButtons({ pitch, from }: { pitch: Pitch; from: 'hero' | 'closing' }) {
  const { calUrl, callMinutes, email } = pitch.contact;
  return (
    <div className="flex flex-wrap items-center gap-3">
      {calUrl && (
        <TrackedLink
          pitch={pitch.slug}
          cta={`book-call-${from}`}
          href={calUrl}
          className={button.primary}
        >
          {callMinutes ? `Book a ${callMinutes}-minute call` : 'Book a call'}
        </TrackedLink>
      )}
      <TrackedLink
        pitch={pitch.slug}
        cta={`email-${from}`}
        href={mailto(email, `${pitch.company} app`)}
        className={calUrl ? button.secondary : button.primary}
      >
        {email}
      </TrackedLink>
    </div>
  );
}

export default async function PitchPage({ params }: Params) {
  const { slug } = await params;
  const pitch = getPitch(slug);
  if (!pitch) notFound();

  const shotCount = pitch.categories.reduce((n, c) => n + c.shots.length, 0);

  return (
    <main className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-xl">
        {/* 1. Hero */}
        <header className="animate-enter" style={stagger(0)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Prototype for
              </p>
              <p className="mt-2">
                <A href={pitch.companyUrl} arrow>
                  {pitch.company}
                </A>
              </p>
            </div>
            <div className="-mr-2 -mt-2">
              <ThemeToggle />
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-[1.75rem] sm:leading-snug">
            {pitch.title}
          </h1>
          <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
            {pitch.subtitle}
          </p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Platform status">
            {PLATFORMS.map((p) => (
              <li
                key={p}
                className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs ${statusStyle[pitch.platforms[p].status]}`}
              >
                {platformLabel[p]} · {statusLabel[pitch.platforms[p].status]}
              </li>
            ))}
          </ul>

          <p className="mt-7 border-l-2 border-neutral-200 pl-4 text-sm leading-relaxed text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
            I built this concept on my own. It isn&apos;t affiliated with{' '}
            {pitch.company}, and it runs on mock data. If you want a fully working
            app built to this standard, get in touch.
          </p>

          <div className="mt-6">
            <ContactButtons pitch={pitch} from="hero" />
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
            <Image
              src="/profile.jpeg"
              alt=""
              width={28}
              height={28}
              priority
              className="h-7 w-7 rounded-full object-cover"
            />
            <p>
              Prepared by <A href="/">Melih Arık</A>
              <span className="text-neutral-400 dark:text-neutral-500">
                {' '}
                · <time dateTime={pitch.date}>{formatDate(pitch.date)}</time>
              </span>
            </p>
          </div>
        </header>

        {/* 2. Video */}
        <section
          aria-label="Video walkthrough"
          className="animate-enter mt-16"
          style={stagger(1)}
        >
          <VideoStage pitch={pitch.slug} videos={pitch.videos} platforms={pitch.platforms} />
        </section>

        {/* 3. Highlights */}
        <Section title="Highlights" index={2}>
          <ul className="space-y-3">
            {pitch.highlights.map((h) => (
              <li
                key={h.title}
                className="rounded-xl border border-neutral-200 px-5 py-4 dark:border-neutral-800"
              >
                <p className="text-neutral-800 dark:text-neutral-200">{h.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {h.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* 4. Screens (wider on desktop) */}
      <section
        aria-labelledby="screens"
        className="animate-enter mx-auto mt-16 max-w-xl lg:max-w-5xl"
        style={stagger(3)}
      >
        <SectionTitle id="screens">
          Screens <span className="tabular-nums">· {shotCount}</span>
        </SectionTitle>
        <div className="mt-5">
          <Gallery pitch={pitch.slug} categories={pitch.categories} />
        </div>
      </section>

      <div className="mx-auto max-w-xl">
        {/* 5. Tech */}
        <Section title="Under the hood" index={4}>
          <div className="space-y-3">
            {pitch.tech.map((t) => (
              <p key={t.name} className="leading-relaxed">
                <span className="text-neutral-800 dark:text-neutral-200">{t.name}</span>
                {t.note && (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    {' '}
                    · {t.note}
                  </span>
                )}
              </p>
            ))}
          </div>
        </Section>

        {/* 6. About */}
        <Section title="A bit about me" index={5}>
          <div className="flex items-start gap-4">
            <Image
              src="/profile.jpeg"
              alt="Melih Arık"
              width={48}
              height={48}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div className="space-y-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
              <p>
                I&apos;m Melih, a mobile developer in Tallinn, Estonia. I&apos;ve been
                building mobile apps for 6 years and have shipped more than 30 to the
                App Store and Google Play, most recently{' '}
                <A href="https://transport.meliharik.dev">Hetku</A>, a live transit map
                for the Baltics.
              </p>
              <p>
                I work on both platforms natively, from design to store release.
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <li>
                  <A href="https://transport.meliharik.dev" arrow>
                    Try Hetku
                  </A>
                </li>
                <li>
                  <A href="https://play.google.com/store/apps/details?id=dev.meliharik.transport" arrow>
                    Hetku on Google Play
                  </A>
                </li>
                <li>
                  <A href="/" arrow>
                    More of my work
                  </A>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 7. Closing */}
        <Section title="Next step" index={6}>
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            I built this on my own to show what a native {pitch.company} app could
            feel like. Turning it into a real product means your API, accounts,
            payments and store releases. If that sounds interesting, give me{' '}
            {pitch.contact.callMinutes ? `${pitch.contact.callMinutes} minutes` : 'a few minutes'}{' '}
            and I&apos;ll walk you through the prototype and what it would take to ship.
          </p>
          <div className="mt-6">
            <ContactButtons pitch={pitch} from="closing" />
          </div>
        </Section>

        {pitch.credits && pitch.credits.length > 0 && (
          <details className="mt-16 text-xs text-neutral-400 dark:text-neutral-500">
            <summary className="cursor-pointer select-none hover:text-neutral-600 dark:hover:text-neutral-300">
              Listing photos are from Wikimedia Commons. Credits
            </summary>
            <ul className="mt-3 space-y-1 leading-relaxed">
              {pitch.credits.map((c) => (
                <li key={c.url}>
                  <a href={c.url} target="_blank" rel="noreferrer" className="link">
                    {c.title}
                  </a>{' '}
                  by {c.author}, {c.license}
                </li>
              ))}
            </ul>
          </details>
        )}

        <SiteFooter index={7} />
      </div>
    </main>
  );
}
