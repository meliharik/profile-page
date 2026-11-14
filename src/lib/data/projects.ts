export interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  badge?: { text: string; type: 'award' | 'waitlist' };
}

// Shown with screenshots. Keep this to the four best; everything else goes to moreProjects.
export const projects: Project[] = [
  {
    title: 'Hetku',
    description:
      'Every bus, tram and train in 49 Baltic cities, moving live on one map. Native Kotlin and SwiftUI apps, a SvelteKit web app and a Firebase backend.',
    url: 'https://transport.meliharik.dev',
    image: '/projects/hetku.png',
  },
  {
    title: 'Ripstop',
    description:
      'Remote config for shipped apps. Force updates and maintenance mode without a store review, with SDKs for Swift, Kotlin, Flutter, React Native and the web.',
    url: 'https://ripstop.dev',
    image: '/projects/ripstop.png',
    badge: { text: 'Join the waitlist', type: 'waitlist' },
  },
  {
    title: 'SaveMyPosts',
    description:
      'Every Instagram, TikTok and Pinterest save in one place, sorted by AI. Native iOS app with a share extension and a NestJS gateway.',
    url: 'https://savemyposts.com',
    image: '/projects/savemyposts.png',
  },
  {
    title: 'Beatzy',
    description:
      'AI music generator for iOS, built with SwiftUI and a Node.js backend.',
    url: 'https://apps.apple.com/us/app/beatzy-ai-music-generator/id6742488919',
    image: '/projects/beatzy.png',
    badge: { text: 'Top 100 on App Store', type: 'award' },
  },
];

// Text links only.
export const moreProjects = [
  { title: 'Portman', url: 'https://github.com/meliharik/portman' },
  {
    title: 'Tartu bike-share analysis',
    url: 'https://github.com/meliharik/tartu-bike-analysis',
  },
  {
    title: 'a real-time geo-fencing engine',
    url: 'https://github.com/meliharik/realtime_geo_fencing_service',
  },
  {
    title: 'an encrypted messaging app',
    url: 'https://github.com/meliharik/end2end_messaging',
  },
];
