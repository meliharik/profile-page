import { ProjectItem } from '@/types';

export const projectsData: ProjectItem[] = [
  {
    title: 'Beatzy Music Maker iOS App',
    description: 'A highly advanced application built with SwiftUI for the frontend and Node.js for the backend, featuring a completely modern UI.',
    technologies: ['SwiftUI', 'Node.js', 'Rest API', 'Firebase'],
    badge: {
      text: 'Top 250 on App Store',
      type: 'award'
    },
    links: [{
      type: 'appstore',
      url: '#',
      label: 'View on App Store'
    }]
  },
  {
    title: 'Nasa Space Apps Hackathon',
    description: 'Feature-rich food delivery app with real-time order tracking, seamless payment integration, and smooth animations using Jetpack Compose.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Firebase'],
    badge: {
      text: '4th Place',
      type: 'award'
    }
  },
  {
    title: 'End to End Message Encryption App',
    description: 'Cross-platform messaging app with real-time chat, push notifications, and beautiful animations. Supports both iOS and Android with native performance.',
    technologies: ['Flutter', 'AES, RSA, Diffie-Hellman', 'Socket.io'],
    badge: {
      text: '2023',
      type: 'date'
    },
    links: [{
      type: 'github',
      url: 'https://github.com/meliharik/end2end_messaging',
      label: 'View on GitHub'
    }]
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