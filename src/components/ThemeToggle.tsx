'use client';

export const ThemeToggle = () => {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.theme = dark ? 'dark' : 'light';
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
    >
      {/* Moon, shown in light mode */}
      <svg
        className="block h-4 w-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      {/* Sun, shown in dark mode */}
      <svg
        className="hidden h-4 w-4 dark:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41" />
      </svg>
    </button>
  );
};
