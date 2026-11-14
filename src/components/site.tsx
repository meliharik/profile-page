// Building blocks shared by the home page and the pitch pages.
import { LocalTime } from '@/components/LocalTime';

export const stagger = (n: number) => ({ '--stagger': n } as React.CSSProperties);

const isExternal = (href: string) => href.startsWith('http');

export const A = ({
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
    {...(isExternal(href) ? { target: '_blank', rel: 'noreferrer' } : {})}
    className="link group/link text-neutral-800 dark:text-neutral-200"
  >
    {children}
    {arrow && (
      <span
        aria-hidden
        className="ml-0.5 inline-block text-neutral-400 transition-transform duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px motion-reduce:transition-none dark:text-neutral-500"
      >
        ↗
      </span>
    )}
  </a>
);

export const SectionTitle = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) => (
  <h2
    id={id}
    className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500"
  >
    {children}
  </h2>
);

export const Section = ({
  title,
  index,
  children,
  className = '',
}: {
  title: string;
  index: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`animate-enter mt-16 ${className}`} style={stagger(index)}>
    <SectionTitle>{title}</SectionTitle>
    <div className="mt-5">{children}</div>
  </section>
);

const socials = [
  { label: 'GitHub', href: 'https://github.com/meliharik' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/melihify' },
  { label: 'X', href: 'https://twitter.com/melihify' },
  { label: 'Instagram', href: 'https://instagram.com/melihifyy' },
  { label: 'Email', href: 'mailto:hi@meliharik.dev' },
  { label: 'Blog', href: 'https://blog.meliharik.dev' },
  { label: 'Uses', href: '/uses' },
];

export const SiteFooter = ({ index }: { index: number }) => (
  <footer
    className="animate-enter mt-20 border-t border-neutral-200/70 pt-8 dark:border-neutral-800"
    style={stagger(index)}
  >
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          {...(isExternal(social.href) ? { target: '_blank', rel: 'noreferrer' } : {})}
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
);
