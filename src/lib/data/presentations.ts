import { PresentationItem } from '@/types';

export const presentationsData: PresentationItem[] = [
  {
    title: 'ENCRYPTED MESSAGING APPLICATION COMBINING AES AND RSA ALGORITHMS',
    event: 'ICETI\'24 - International Conference on Engineering and Technology Innovation',
    date: 'Oct 2024',
    description: 'I presented my graduation project that was published in the journal.',
    image: '/presentations/bosna.jpg',
    technologies: ['Encryption', 'AES', 'RSA'],
    attendees: '150+ attendees',
    link: {
      type: 'external',
      url: 'https://www.iceti.org/sites/default/files/iceti_2024_book_of_proceedings.pdf',
      label: 'Journal'
    }
  },
  {
    title: 'Level Up Your Flutter Skills with Shortcuts',
    event: 'GDG Bursa',
    date: 'Dec 2023',
    description: 'I gave a presentation about shortcuts that I\'ve used in my Flutter projects. Those shortcuts are used in my Flutter projects to make my life easier.',
    image: '/presentations/gdg.jpg',
    technologies: ['Flutter', 'Shortcuts'],
    attendees: '4.000+ attendees'
  },
  {
    title: 'First Step to Flutter',
    event: 'Bursa Technical University Google Developer Student Clubs',
    date: 'Jul 2023',
    description: 'I gave a presentation about Flutter and how to get started with it. I also shared my experience and how to find a job as a Flutter developer.',
    image: '/presentations/btu.jpeg',
    technologies: ['Flutter'],
    attendees: '80+ attendees'
  },
  {
    title: 'AstroTarot: Building a Spiritual Mobile App',
    event: 'Side Projects Stories',
    date: 'May 2023',
    description: 'I discussed my side project AstroTarot, a spiritual mobile application that combines astrology and tarot readings. Shared insights about building niche apps, monetization strategies, and balancing side projects with full-time work.',
    image: '/presentations/podcast.jpg',
    technologies: ['Side Project', 'Podcast'],
    link: {
      type: 'spotify',
      url: 'https://open.spotify.com/episode/44gHYM3QdeWiS1Rmpq6zbm?si=33b4122045444dff',
      label: 'Spotify'
    }
  },
  {
    title: 'Manage users with Firebase Auth',
    event: 'Flutter Festival Turquoise',
    date: 'Mar 2023',
    description: 'We talked about how to manage users with Firebase Auth and how to use it in a Flutter project. You can find the presentation youtube link below.',
    image: '/presentations/fsc.jpg',
    technologies: ['Flutter', 'Firebase Auth'],
    link: {
      type: 'youtube',
      url: 'https://youtu.be/H2OykY1FPb8?t=8306',
      label: 'YouTube'
    }
  }
]; 