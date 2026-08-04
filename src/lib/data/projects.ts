export interface Project {
  title: string;
  description: string;
  url: string;
  image: string;
  badge?: { text: string; type: 'award' | 'waitlist' };
}

export const heroProject: Project = {
  title: 'Ripstop',
  description:
    'Remote config for shipped apps. Push values, force update walls and flip maintenance mode without waiting for a store review. Open-source SDKs for Swift, Kotlin, Flutter, React Native and the web.',
  url: 'https://ripstop.dev',
  image: '/projects/ripstop.png',
  badge: { text: 'Join the waitlist', type: 'waitlist' },
};

export const featuredProjects: Project[] = [
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
  {
    title: 'Portman',
    description:
      'Native macOS menu bar app that shows which processes hold which ports, and kills them in one click. On Homebrew.',
    url: 'https://github.com/meliharik/portman',
    image: '/projects/portman.png',
  },
  {
    title: 'Tartu Smart Bike Analysis',
    description:
      'Mobility patterns behind 19,500 bike-share trips and 1.5M GPS points, with a published visualization gallery.',
    url: 'https://github.com/meliharik/tartu-bike-analysis',
    image: '/projects/tartu-bike.png',
  },
];

export const earlierProjects = [
  {
    title: 'Real-time geo-fencing engine',
    url: 'https://github.com/meliharik/realtime_geo_fencing_service',
  },
  {
    title: 'Encrypted messaging app',
    url: 'https://github.com/meliharik/end2end_messaging',
  },
  {
    title: 'Chrome extension in Flutter',
    url: 'https://medium.com/flutter-students-club/create-your-chrome-extension-using-flutter-79712ffcb439',
  },
];
