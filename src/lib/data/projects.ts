import { ProjectItem } from '@/types';

export const projectsData: ProjectItem[] = [
  {
    title: 'Ripstop',
    description: 'Remote config for shipped apps. Push values, force update walls and flip maintenance mode without waiting for a store review. Open-source SDKs for Swift, Kotlin, Flutter, React Native and the web.',
    technologies: ['Swift', 'Kotlin', 'Flutter', 'React Native', 'TypeScript'],
    badge: {
      text: 'Join the waitlist',
      type: 'waitlist'
    },
    links: [{
      type: 'external',
      url: 'https://ripstop.dev',
      label: 'ripstop.dev'
    }]
  },
  {
    title: 'Beatzy Music Maker iOS App',
    description: 'A highly advanced application built with SwiftUI for the frontend and Node.js for the backend, featuring a completely modern UI.',
    technologies: ['SwiftUI', 'Node.js', 'Rest API', 'Firebase'],
    badge: {
      text: 'Top 100 on App Store',
      type: 'award'
    },
    links: [{
      type: 'appstore',
      url: 'https://apps.apple.com/us/app/beatzy-ai-music-generator/id6742488919',
      label: 'View on App Store'
    }]
  },
  {
    title: 'Portman',
    description: 'Native macOS menu bar app that shows which processes are listening on which ports and kills them with one click. Distributed via Homebrew.',
    technologies: ['Swift', 'SwiftUI', 'macOS'],
    links: [{
      type: 'github',
      url: 'https://github.com/meliharik/portman',
      label: 'View on GitHub'
    }]
  },
  {
    title: 'Tartu Smart Bike Mobility Analysis',
    description: 'Data analysis of 19,500 bike-sharing trips and 1.5M GPS points from Tartu: mobility patterns, popular routes and user segments, with a published visualization gallery.',
    technologies: ['Python', 'Pandas', 'Data Visualization'],
    links: [{
      type: 'github',
      url: 'https://github.com/meliharik/tartu-bike-analysis',
      label: 'View on GitHub'
    }]
  },
  {
    title: 'Real-Time Geo-Fencing Engine',
    description: 'Event-driven service processing GPS streams from scooter fleets in real time, detecting restricted-zone violations with spatial indexing and caching.',
    technologies: ['Java', 'Spring Boot', 'PostGIS', 'Redis'],
    links: [{
      type: 'github',
      url: 'https://github.com/meliharik/realtime_geo_fencing_service',
      label: 'View on GitHub'
    }]
  },
  {
    title: 'Nasa Space Apps Hackathon',
    description: 'Hackathon project built with Kotlin, Jetpack Compose and Firebase.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    badge: {
      text: '4th Place',
      type: 'award'
    }
  },
  {
    title: 'Robot Arm for TEKNOFEST Competition',
    description: 'We developed an artificial bionic arm using Raspberry Pi for users without limb functionality. This prosthetic arm is custom-designed to fit the user\'s attachment point and is controlled through EMG sensors and a mobile application, providing nerve-based control.',
    technologies: ['Raspberry Pi', 'EMG Sensors', 'Arduino'],
    badge: {
      text: 'Finalist',
      type: 'award'
    }
  },
  {
    title: 'Chrome Extension with Flutter',
    description: 'I built a chrome extension with Flutter that allows you to see current prices of crypto currencies and wrote a blog post about it.',
    technologies: ['Flutter', 'Chrome Extension', 'Crypto APIs'],
    badge: {
      text: '2022',
      type: 'date'
    },
    links: [{
      type: 'medium',
      url: 'https://medium.com/flutter-students-club/create-your-chrome-extension-using-flutter-79712ffcb439',
      label: 'View on Medium'
    }]
  }
];
