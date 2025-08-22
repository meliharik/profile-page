'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink, Calendar, GraduationCap, Briefcase, Code, Award, Users, Heart, BookOpen, Trophy, FileText, BookOpenCheck, Menu, X, Presentation, Coffee } from 'lucide-react';
import { MovingBorderButton } from '../components/MovingBorder';
import { StarBorder } from '../components/StarBorder';
import { annotate, annotationGroup } from 'rough-notation';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const [animationsStarted, setAnimationsStarted] = useState(false);
  const [showHeaderProfile, setShowHeaderProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { id: 'about', label: 'About Me', icon: Users },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'presentations', label: 'Presentations', icon: Presentation },

    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'papers', label: 'Academic Papers', icon: BookOpenCheck },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setActiveSection(itemId);
    setIsMobileMenuOpen(false); // Mobilde menü seçiminden sonra kapat
    // About dışında bir section'a geçilirse animasyon state'ini reset et
    if (itemId !== 'about') {
      setAnimationsStarted(false);
    }
  };

  // About section'a girince highlight animasyonlarını başlat
  useEffect(() => {
    if (activeSection === 'about' && aboutTextRef.current && !animationsStarted) {
      const timer = setTimeout(() => {
        // Technology highlights için elementleri bul
        const techElements = aboutTextRef.current?.querySelectorAll('.highlight-tech');
        const availabilityElement = aboutTextRef.current?.querySelector('.availability-highlight');

        if (techElements && techElements.length > 0) {
          // Tech highlights oluştur - CSS animasyonlu
          const techElements = aboutTextRef.current?.querySelectorAll('.highlight-tech');
          const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4']; // blue, emerald, purple, amber, cyan
          
          Array.from(techElements || []).forEach((element, index) => {
            const htmlElement = element as HTMLElement;
            const color = colors[index % colors.length];
            
            // CSS animasyonu ile düzgün highlight
            setTimeout(() => {
              htmlElement.style.background = `linear-gradient(120deg, ${color}40 0%, ${color}40 100%)`;
              htmlElement.style.backgroundSize = '0% 100%';
              htmlElement.style.backgroundRepeat = 'no-repeat';
              htmlElement.style.backgroundPosition = 'left center';
                             htmlElement.style.transition = 'background-size 600ms ease-in-out';
              htmlElement.style.borderRadius = '4px';
              htmlElement.style.padding = '2px 4px';
              
              // Animasyonu başlat
              setTimeout(() => {
                htmlElement.style.backgroundSize = '100% 100%';
              }, 50);
                         }, index * 300); // Delay artırıldı - daha uzun aralıklarla
          });

          // Availability highlight oluştur
          let availabilityAnnotation;
          if (availabilityElement) {
            availabilityAnnotation = annotate(availabilityElement as HTMLElement, {
              type: 'box',
              color: '#10B981', // softer emerald
              animationDuration: 800,
              strokeWidth: 2,
              padding: 6,
              iterations: 1
            });
          }

                    // Availability animasyonunu başlat - tech highlights bittikten sonra
          if (availabilityAnnotation) {
            setTimeout(() => {
              availabilityAnnotation.show();
              setAnimationsStarted(true);
            }, 2800); // 4*300ms(delays) + 600ms(duration) + 1200ms(extra buffer) = 2800ms
          } else {
            setAnimationsStarted(true);
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [activeSection, animationsStarted]);

  // Hero section görünürlüğünü takip et - tamamen kaybolunca header profil göster
  useEffect(() => {
    if (activeSection !== 'about' || !heroSectionRef.current) {
      setShowHeaderProfile(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero section tamamen ekrandan çıkınca (isIntersecting false) header profil göster
        setShowHeaderProfile(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0 // Hero section tamamen kaybolunca tetikle
      }
    );

    observer.observe(heroSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [activeSection]);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-8">
            {/* Mobile Hero Section - sadece mobile'da görünür */}
            <div className="lg:hidden" ref={heroSectionRef}>
              <div className="flex flex-col items-center text-center mb-8 py-8">
                <div className="mb-6">
                  <img 
                    src="/profile.jpg" 
                    alt="Melih Arık" 
                    className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white/30 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <h1 className="text-sf-large font-sf-heavy text-slate-900 mb-2 drop-shadow-lg">Melih Arık</h1>
                  <p className="text-sf-title2 font-sf-semibold text-slate-800 mb-3 drop-shadow-sm">Mobile Application Developer</p>
                  <p className="text-sf-body font-sf-regular text-slate-700 flex items-center justify-center gap-2 drop-shadow-sm">
                    <MapPin className="w-4 h-4" />
                    Tartu, Estonia
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sf-large font-sf-bold text-slate-900 mb-6 drop-shadow-sm hidden lg:block">About Me</h2>
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30">
                <div className="prose prose-slate max-w-none" ref={aboutTextRef}>
                  <p className="text-sf-body font-sf-regular text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
                    I'm a Mobile Application Developer passionate about creating exceptional user experiences 
                    on iOS and Android platforms. I specialize in building native and cross-platform mobile 
                    applications that are performant, intuitive, and scalable.
                  </p>
                  <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
                    My expertise spans <span className="highlight-tech">Swift</span>/<span className="highlight-tech">SwiftUI</span> for iOS, <span className="highlight-tech">Kotlin</span>/Java for Android, <span className="highlight-tech">React Native</span> and <span className="highlight-tech">Flutter</span> for 
                    cross-platform development. I love crafting beautiful interfaces and implementing complex 
                    functionality that delights users.
                  </p>
                  <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
                    When I'm not coding, you'll find me exploring the latest mobile development trends, 
                    contributing to open source mobile projects, or prototyping innovative app concepts 
                    that push the boundaries of mobile user experience. 
                    </p>
                  <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
                    I'm currently
                    <span className="availability-highlight font-sf-semibold"> open for freelance and job opportunities </span> 
                      and excited to bring your mobile app ideas to life!
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30 text-center relative overflow-hidden">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl border border-white/30 mb-4 shadow-lg">
                      <Calendar className="w-8 h-8 text-slate-700" />
                    </div>
                    
                    <h3 className="text-sf-title2 font-sf-bold text-slate-900 mb-3 drop-shadow-sm">
                      Let's Schedule a Meeting
                    </h3>
                    <p className="text-sf-body font-sf-regular text-slate-700 mb-6 drop-shadow-sm max-w-md mx-auto">
                      Ready to bring your mobile app vision to life? Book a free consultation to discuss your project requirements and explore possibilities.
                    </p>
                    
                    <a 
                      href="https://cal.com/meliharik" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 bg-white/30 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/40 text-slate-800 font-sf-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl border border-white/40 hover:border-white/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <span>Schedule Free Consultation</span>
                      <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
                    </a>
                  </div>
                </div>
              </div>
              
              <h3 className="text-sf-title2 font-sf-semibold text-slate-900 mb-4 drop-shadow-sm">Skills & Technologies</h3>
              <div className="bg-white/15 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/20">
                <div className="flex flex-wrap gap-3">
                  {['Swift', 'SwiftUI', 'Kotlin', 'Java', 'React Native', 'Flutter', 'Dart', 'Xcode', 'Android Studio', 'Firebase', 'Core Data', 'SQLite', 'REST APIs'].map((skill) => (
                    <span key={skill} className="px-4 py-2 bg-white/30 backdrop-blur-sm text-slate-800 rounded-full text-sf-subhead font-sf-medium border border-white/40 hover:bg-white/50 transition-all drop-shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Work Experience</h2>
            
            <div className="space-y-6">
              {/* Senior Mobile Developer */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Indie Developer</h3>
                    <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Denizli, Turkey</span>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      Oct 2023 - Present
                    </span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                  Deployed more than 30 apps on the App Store and Google Play Store.
                  Built with SwiftUI, Flutter, React Native and Kotlin.
                </p>
              </div>

              {/* Mobile App Developer */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Mobile Application Developer</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-sf-semibold text-sf-title2 drop-shadow-sm">More Payroll</p>
                    <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Bursa, Turkey</span>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      May 2023 - Oct 2023
                    </span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                  Developed cross-platform mobile applications using React Native and Flutter for startup clients. 
                  Built 6 production apps with seamless iOS and Android experiences, improving client user engagement by 75%. 
                  Implemented CI/CD pipelines and automated testing workflows.
                </p>
              </div>

              {/* iOS Developer */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Software Developer</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-sf-semibold text-sf-title3 drop-shadow-sm">Bursa Uludag University Department of Information Technologies</p>
                    <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Bursa, Turkey</span>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      Mar 2022 - Mar 2023
                    </span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                  We developed the university app with Flutter that is used by almost 100,000 users.
                </p>
              </div>

              {/* Mobile Development Intern */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Server (Carrer Break)</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-sf-semibold text-sf-title3 drop-shadow-sm">Work and Travel Program</p>
                    <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Michigan, USA</span>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      Jun 2022 - Oct 2022
                    </span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                  I went to USA with work and travel program, worked as a server in a restaurant.
                  Working in other side of the world was a great experience.
                </p>
              </div>

              {/* Mobile Development Intern */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Flutter Developer</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-600 font-sf-semibold text-sf-title3 drop-shadow-sm">Mediate</p>
                    <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Boston, USA (Remote)</span>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      Aug 2021 - Jun 2022
                    </span>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed drop-shadow-sm">
                  We developed an app that enables users to practice speaking foreign languages through conversation.
                  We also provided a better user experience with text-to-speech and speech-to-text features.
                </p>
              </div>

              {/* Mobile Development Intern */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Flutter Developer Intern</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600 font-sf-semibold text-sf-title3 drop-shadow-sm">Morphosium</p>
                    <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>Izmir, Turkey (Remote)</span>
                    </div>
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      Jun 2021 - Aug 2021
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Featured Projects</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Beatzy Music Maker iOS App</h3>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30">
                    <Trophy className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-medium text-amber-800 drop-shadow-sm">Top 250 on App Store</span>
                  </div>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  A highly advanced application built with SwiftUI for the frontend and Node.js for the backend, featuring a completely modern UI.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">SwiftUI</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Node.js</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Rest API</span>
                    <span className="px-3 py-1 bg-orange-400/20 backdrop-blur-sm text-orange-800 rounded-lg text-sm border border-orange-300/30 drop-shadow-sm">Firebase</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
                    <svg viewBox="0 0 384 512" className="w-4 h-4" fill="currentColor">
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                    </svg>
                    <span>View on App Store</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Nasa Space Apps Hackathon</h3>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30">
                    <Trophy className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-medium text-amber-800 drop-shadow-sm">4th Place</span>
                  </div>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Feature-rich food delivery app with real-time order tracking, seamless payment integration, and smooth animations using Jetpack Compose.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Kotlin</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Jetpack Compose</span>
                    <span className="px-3 py-1 bg-orange-400/20 backdrop-blur-sm text-orange-800 rounded-lg text-sm border border-orange-300/30 drop-shadow-sm">Firebase</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">End to End Message Encryption App</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Cross-platform messaging app with real-time chat, push notifications, and beautiful animations. Supports both iOS and Android with native performance.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Flutter</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">AES, RSA, Diffie-Hellman</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Socket.io</span>
                  </div>
                  <a href="https://github.com/meliharik/end2end_messaging" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-[#24292e] text-white rounded-lg text-sm font-medium hover:bg-[#24292e]/90 transition-colors">
                    <Github className="w-4 h-4" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Robot Arm for TEKNOFEST Competition</h3>
                  <div className="relative inline-block overflow-hidden rounded-full">
                    {/* Star Border Animation Effects */}
                    <div
                      className="absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0 opacity-30"
                      style={{
                        background: 'radial-gradient(circle, #f59e0b, transparent 10%)',
                        animationDuration: '4s',
                      }}
                    />
                    <div
                      className="absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0 opacity-30"
                      style={{
                        background: 'radial-gradient(circle, #f59e0b, transparent 10%)',
                        animationDuration: '4s',
                      }}
                    />
                    {/* Badge Content */}
                    <div className="relative z-1 flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30">
                      <Trophy className="w-4 h-4 text-amber-700" />
                      <span className="text-sm font-medium text-amber-800 drop-shadow-sm">Finalist</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  We developed an artificial bionic arm using Raspberry Pi for users without limb functionality. This prosthetic arm is
                  custom-designed to fit the user's attachment point and is controlled through EMG sensors and a mobile application,
                  providing nerve-based control.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Raspberry Pi</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">EMG Sensors</span>
                    <span className="px-3 py-1 bg-orange-400/20 backdrop-blur-sm text-orange-800 rounded-lg text-sm border border-orange-300/30 drop-shadow-sm">Arduino</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Chrome Extension with Flutter</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2022</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  I built a chrome extension with Flutter that allows you to see current prices of crypto currencies and wrote a blog post about it.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30 drop-shadow-sm">Flutter</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Chrome Extension</span>
                    <span className="px-3 py-1 bg-red-400/20 backdrop-blur-sm text-red-800 rounded-lg text-sm border border-red-300/30 drop-shadow-sm">Crypto APIs</span>
                  </div>
                  <a href="https://medium.com/flutter-students-club/create-your-chrome-extension-using-flutter-79712ffcb439" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/90 transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                    </svg>
                    <span>View on Medium</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Education</h2>
            
            <div className="space-y-8">
              {/* Master's Degree */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                  <div className="flex-shrink-0 hidden lg:block">
                    <img 
                      src="/universities/tartu.png" 
                      alt="University of Tartu" 
                      className="w-20 h-20 rounded-2xl object-contain bg-white/50 p-2 shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Software Engineering</h3>
                        <h4 className="text-sf-title3 font-sf-semibold text-slate-800 mb-1 drop-shadow-sm">Master of Science</h4>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-sf-semibold drop-shadow-sm">University of Tartu, Estonia</p>
                      </div>
                      <div className="lg:text-right">
                        <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                          2025 - Present
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                      Focusing on mobile computing, distributed systems, and human-computer interaction. Research in mobile app optimization and cross-platform development frameworks.
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Mobile Computing</span>
                      <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">HCI</span>
                      <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Distributed Systems</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bachelor's Degree */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                  <div className="flex-shrink-0 hidden lg:block">
                    <img 
                      src="/universities/buu.png" 
                      alt="Bursa Uludağ University" 
                      className="w-20 h-20 rounded-2xl object-contain bg-white/50 p-2 shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">Computer Engineering</h3>
                        <h4 className="text-sf-title3 font-sf-semibold text-slate-800 mb-1 drop-shadow-sm">Bachelor of Science</h4>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-sf-semibold drop-shadow-sm">Bursa Uludağ University, Turkey</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-full text-sf-footnote font-sf-semibold border border-emerald-300/30 drop-shadow-sm">
                            GPA: 2.98
                          </span>
                        </div>
                      </div>
                      <div className="lg:text-right">
                        <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                          2019 - 2024
                        </span>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Language School */}
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                  <div className="flex-shrink-0 hidden lg:block">
                    <img 
                      src="/universities/ilac.png" 
                      alt="Language School" 
                      className="w-20 h-20 rounded-2xl object-contain bg-white/50 p-2 shadow-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">ILAC</h3>
                        <h4 className="text-sf-title3 font-sf-semibold text-slate-800 mb-1 drop-shadow-sm">Language School</h4>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-sf-semibold drop-shadow-sm">Toronto, Canada</p>
                      </div>
                      <div className="lg:text-right">
                        <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                          05.2017 - 08.2017
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'volunteer_removed':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Volunteer Work & Communities</h2>
            
            <div className="space-y-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">AI Ethics Research Group</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium drop-shadow-sm">Tech Community Volunteer</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023 - Present</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Contributing to research on ethical AI development and privacy-preserving machine learning techniques.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">AI Ethics</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Research</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Open Source Contributor</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium drop-shadow-sm">Various Projects</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2022 - Present</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Active contributor to open source machine learning and privacy tools, helping improve accessibility and security.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Open Source</span>
                  <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Python</span>
                  <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">ML Tools</span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Coding Bootcamp Mentor</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-medium drop-shadow-sm">Local Tech Community</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Mentoring junior developers in web development and AI fundamentals through hands-on workshops.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Mentoring</span>
                  <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Teaching</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certifications_removed':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Certifications & Achievements</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">TensorFlow Developer Certificate</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium drop-shadow-sm">Google</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Demonstrated proficiency in building and training neural networks using TensorFlow.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">AWS Solutions Architect Associate</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-medium drop-shadow-sm">Amazon Web Services</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Certified in designing distributed systems and applications on AWS platform.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Machine Learning Specialization</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium drop-shadow-sm">Stanford University (Coursera)</p>
                  </div>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/40 drop-shadow-sm">2022</span>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Comprehensive course covering supervised learning, unsupervised learning, and best practices.
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">NASA Space Apps Challenge</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-600 font-medium drop-shadow-sm">NASA</p>
                  </div>
                  <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-300/30">
                    <Trophy className="w-4 h-4 text-amber-700" />
                    <span className="text-sm font-medium text-amber-800 drop-shadow-sm">2nd Place</span>
                  </div>
                </div>
                <p className="text-slate-800 drop-shadow-sm">
                  Global hackathon achievement for innovative space technology solution.
                </p>
              </div>
            </div>
          </div>
        );

      case 'presentations':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Conference Presentations</h2>
            
            <div className="grid gap-8">
              {/* ICETI'24 - Oct 2024 */}
              <div className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                {/* Image Section */}
                <div className="lg:col-span-2 relative h-48 lg:h-auto overflow-hidden cursor-pointer" onClick={() => setSelectedImage("/presentations/bosna.jpg")}>
                  <img 
                    src="/presentations/bosna.jpg" 
                    alt="ICETI'24"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="lg:col-span-3 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sf-caption1 font-sf-semibold text-blue-700 bg-blue-50/50 px-2 py-1 rounded-lg">Oct 2024</span>
                  </div>
                  
                  <h3 className="text-xl font-sf-bold text-slate-900 mb-3 leading-tight">ENCRYPTED MESSAGING APPLICATION COMBINING AES AND RSA ALGORITHMS</h3>
                  
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-sf-semibold mb-3">
                    ICETI'24 - International Conference on Engineering and Technology Innovation
                  </p>
                  
                  <p className="text-slate-800 mb-4 leading-relaxed text-sf-body">
                    I presented my graduation project that was published in the journal.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30">Encryption</span>
                      <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30">AES</span>
                      <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30">RSA</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>150+ attendees</span>
                      <a href="https://www.iceti.org/sites/default/files/iceti_2024_book_of_proceedings.pdf" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Up Your Flutter Skills - Dec 2023 */}
              <div className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                {/* Content Section */}
                <div className="lg:col-span-3 p-6 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sf-caption1 font-sf-semibold text-emerald-700 bg-emerald-50/50 px-2 py-1 rounded-lg">Dec 2023</span>
                  </div>
                  
                  <h3 className="text-xl font-sf-bold text-slate-900 mb-3 leading-tight">Level Up Your Flutter Skills with Shortcuts</h3>
                  
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-sf-semibold mb-3">
                    GDG Bursa
                  </p>
                  
                  <p className="text-slate-800 mb-4 leading-relaxed text-sf-body">
                    I gave a presentation about shortcuts that I've used in my Flutter projects.
                    Those shortcuts are used in my Flutter projects to make my life easier.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30">Flutter</span>
                      <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30">Shortcuts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>4.000+ attendees</span>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="lg:col-span-2 relative h-48 lg:h-auto overflow-hidden order-1 lg:order-2 cursor-pointer" onClick={() => setSelectedImage("/presentations/gdg.jpg")}>
                  <img 
                    src="/presentations/gdg.jpg" 
                    alt="Level Up Your Flutter Skills with Shortcuts"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* First Step to Flutter - Jul 2023 */}
              <div className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                {/* Image Section */}
                <div className="lg:col-span-2 relative h-48 lg:h-auto overflow-hidden cursor-pointer" onClick={() => setSelectedImage("/presentations/btu.jpeg")}>
                  <img 
                    src="/presentations/btu.jpeg" 
                    alt="Jetpack Compose Modern Android Development"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="lg:col-span-3 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sf-caption1 font-sf-semibold text-purple-700 bg-purple-50/50 px-2 py-1 rounded-lg">Jul 2023</span>
                  </div>
                  
                  <h3 className="text-xl font-sf-bold text-slate-900 mb-3 leading-tight">First Step to Flutter</h3>
                  
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-sf-semibold mb-3">
                    Bursa Technical University Google Developer Student Clubs
                  </p>
                  
                  <p className="text-slate-800 mb-4 leading-relaxed text-sf-body">
                    I gave a presentation about Flutter and how to get started with it. I also shared my experience and how to find a job as a Flutter developer.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30">Flutter</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>80+ attendees</span>
                      <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

              {/* AstroTarot Podcast - May 2023 */}
              <div className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                {/* Content Section */}
                <div className="lg:col-span-3 p-6 flex flex-col justify-center order-2 lg:order-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sf-caption1 font-sf-semibold text-green-700 bg-green-50/50 px-2 py-1 rounded-lg">May 2023</span>
                  </div>
                  
                  <h3 className="text-xl font-sf-bold text-slate-900 mb-3 leading-tight">AstroTarot: Building a Spiritual Mobile App</h3>
                  
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 font-sf-semibold mb-3">
                    Side Projects Stories
                  </p>
                  
                  <p className="text-slate-800 mb-4 leading-relaxed text-sf-body">
                    I discussed my side project AstroTarot, a spiritual mobile application that combines astrology and tarot readings. 
                    Shared insights about building niche apps, monetization strategies, and balancing side projects with full-time work.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-green-400/20 backdrop-blur-sm text-green-800 rounded-lg text-sm border border-green-300/30">Side Project</span>
                      <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30">Podcast</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>Listen on</span>
                      <a href="https://open.spotify.com/episode/44gHYM3QdeWiS1Rmpq6zbm?si=33b4122045444dff" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 17.568c-.24.36-.72.48-1.08.24-2.88-1.8-6.48-2.208-10.728-1.2-.36.096-.72-.144-.816-.48-.096-.36.144-.72.48-.816 4.608-1.104 8.64-.624 11.784 1.368.36.24.48.72.24 1.08l.12-.192zm1.44-3.216c-.288.432-.864.576-1.296.288-3.312-2.04-8.352-2.64-12.24-1.44-.432.144-.864-.144-1.008-.576-.144-.432.144-.864.576-1.008 4.464-1.368 10.08-.72 13.92 1.632.432.288.576.864.288 1.296l-.24-.192zm.144-3.36c-3.936-2.352-10.44-2.568-14.208-1.416-.504.144-1.032-.216-1.176-.72-.144-.504.216-1.032.72-1.176C8.64 6.24 15.84 6.528 20.448 9.216c.504.288.672.936.384 1.44-.288.504-.936.672-1.44.384l-.24-.048z"/>
                        </svg>
                        Spotify
                      </a>
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="lg:col-span-2 relative h-48 lg:h-auto overflow-hidden order-1 lg:order-2 cursor-pointer" onClick={() => setSelectedImage("/presentations/podcast.jpg")}>
                  <img 
                    src="/presentations/podcast.jpg" 
                    alt="AstroTarot Podcast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Firebase Auth - Mar 2023 */}
              <div className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                {/* Image Section */}
                <div className="lg:col-span-2 relative h-48 lg:h-auto overflow-hidden cursor-pointer" onClick={() => setSelectedImage("/presentations/fsc.jpg")}>
                  <img 
                    src="/presentations/fsc.jpg" 
                    alt="Flutter Festival Turquoise"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="lg:col-span-3 p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                    <span className="text-sf-caption1 font-sf-semibold text-cyan-700 bg-cyan-50/50 px-2 py-1 rounded-lg">Mar 2023</span>
                  </div>
                  
                  <h3 className="text-xl font-sf-bold text-slate-900 mb-3 leading-tight">Manage users with Firebase Auth</h3>
                  
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-sf-semibold mb-3">
                    Flutter Festival Turquoise
                  </p>
                  
                  <p className="text-slate-800 mb-4 leading-relaxed text-sf-body">
                    We talked about how to manage users with Firebase Auth and how to use it in a Flutter project. You can find the presentation youtube link below.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30">Flutter</span>
                        <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30">Firebase Auth</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <span>Watch on</span>
                      <a href="https://youtu.be/H2OykY1FPb8?t=8306" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );



      case 'blogs':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Blog Posts & Articles</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Privacy-Preserving Machine Learning: A Practical Guide</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Jan 2024</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium mb-3 drop-shadow-sm">
                  Medium • AI & Privacy Series
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  A comprehensive guide to implementing privacy-preserving machine learning techniques, including differential privacy, 
                  federated learning, and homomorphic encryption with practical Python examples.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Privacy</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Machine Learning</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">12 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>2.4K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">Building Secure APIs with Zero-Knowledge Architecture</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Dec 2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-3 drop-shadow-sm">
                  Dev.to • Security Best Practices
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Learn how to design and implement APIs that never see user data in plaintext, using zero-knowledge proofs 
                  and client-side encryption to maintain privacy while providing full functionality.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Security</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">API Design</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">8 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>1.8K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">My Journey to NASA Space Apps Challenge Success</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Nov 2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  Personal Blog • Competition Stories
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  A behind-the-scenes look at our 2nd place NASA Space Apps project, from ideation to implementation, 
                  including the technical challenges we faced and lessons learned along the way.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-400/20 backdrop-blur-sm text-purple-800 rounded-lg text-sm border border-purple-300/30 drop-shadow-sm">Hackathon</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Space Tech</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">6 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>3.1K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">The Future of AI in Turkey: Opportunities and Challenges</h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Oct 2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  TechCrunch Turkey • Industry Analysis
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Analyzing the current state and future prospects of artificial intelligence in Turkey, discussing government 
                  initiatives, startup ecosystem, and the role of universities in AI research and development.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">AI Industry</span>
                    <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30 drop-shadow-sm">Turkey</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">10 min read</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>4.2K views</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'papers':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Academic Papers & Research</h2>
            
            <div className="grid gap-6">
              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Privacy-Preserving Federated Learning for Healthcare Applications
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">Under Review</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-medium mb-3 drop-shadow-sm">
                  IEEE Transactions on Medical Imaging • Co-Author
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  This paper presents a novel approach to federated learning in healthcare settings, addressing privacy concerns 
                  while maintaining model accuracy. We propose differential privacy techniques specifically adapted for medical imaging data.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Federated Learning</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Healthcare</span>
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Privacy</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Efficient Space Debris Detection Using Deep Learning and Satellite Imagery
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2024</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  Journal of Space Technology • First Author
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Based on our NASA Space Apps Challenge project, this paper details the machine learning algorithms and computer vision 
                  techniques used for real-time space debris detection and collision prediction.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-400/20 backdrop-blur-sm text-purple-800 rounded-lg text-sm border border-purple-300/30 drop-shadow-sm">Space Technology</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Deep Learning</span>
                    <span className="px-3 py-1 bg-cyan-400/20 backdrop-blur-sm text-cyan-800 rounded-lg text-sm border border-cyan-300/30 drop-shadow-sm">Computer Vision</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>DOI: 10.1000/xyz123</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Cryptographic Protocols for Secure Multi-Party Computation in IoT Networks
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2023</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-medium mb-3 drop-shadow-sm">
                  ACM Conference on Security & Privacy • Co-Author
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  This research explores novel cryptographic approaches for enabling secure computation across distributed IoT devices 
                  without revealing sensitive data, with applications in smart city infrastructure.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">Cryptography</span>
                    <span className="px-3 py-1 bg-orange-400/20 backdrop-blur-sm text-orange-800 rounded-lg text-sm border border-orange-300/30 drop-shadow-sm">IoT</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Security</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-700 drop-shadow-sm">
                    <span>DOI: 10.1145/abc456</span>
                    <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                  </div>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 drop-shadow-sm">
                    Undergraduate Thesis: AI-Powered Bionic Prosthetics with EMG Signal Processing
                  </h3>
                  <span className="text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/40 drop-shadow-sm">2024</span>
                </div>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-600 font-medium mb-3 drop-shadow-sm">
                  Bursa Uludağ University • Thesis Project
                </p>
                <p className="text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                  Comprehensive research on developing intelligent prosthetic devices that use machine learning to interpret EMG signals 
                  for natural limb control, including hardware design and signal processing algorithms.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-rose-400/20 backdrop-blur-sm text-rose-800 rounded-lg text-sm border border-rose-300/30 drop-shadow-sm">Biomedical</span>
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Signal Processing</span>
                    <span className="px-3 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-lg text-sm border border-amber-300/30 drop-shadow-sm">Graduated with Honors</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer drop-shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-8">
            <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Get In Touch</h2>
            
            <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30">
              <p className="text-slate-800 text-lg mb-8 leading-relaxed drop-shadow-sm">
                I'm always excited to discuss new mobile app opportunities, innovative projects, 
                and collaborations in iOS/Android development. Let's build something amazing together!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 mb-1 drop-shadow-sm">Email</p>
                    <a href="mailto:melih@example.com" className="text-slate-900 hover:text-indigo-600 font-medium transition-colors drop-shadow-sm">
                      melih@example.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 mb-1 drop-shadow-sm">Phone</p>
                    <span className="text-slate-900 font-medium drop-shadow-sm">+90 (555) 123-4567</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 mb-1 drop-shadow-sm">Location</p>
                    <span className="text-slate-900 font-medium drop-shadow-sm">Tartu, Estonia</span>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-6">
                  <a 
                    href="https://github.com/meliharik" 
                    target="_blank" 
                    className="flex items-center gap-2 bg-white/30 backdrop-blur-sm text-slate-800 px-6 py-3 rounded-xl hover:bg-white/50 transition-all font-medium border border-white/40 shadow-lg drop-shadow-sm"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                  
                  <a 
                    href="https://linkedin.com/in/meliharik" 
                    target="_blank" 
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500/80 to-indigo-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:from-blue-600/90 hover:to-indigo-600/90 transition-all font-medium shadow-lg"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden font-sf-pro">
      {/* Animated Background Circles - Dengeli ve temiz */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-[32rem] h-[32rem] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-25 blur-3xl animate-float1"></div>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-30 blur-3xl animate-float2 animation-delay-1000"></div>
        <div className="absolute bottom-[15%] left-[25%] w-80 h-80 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-25 blur-3xl animate-float3 animation-delay-2000"></div>
        <div className="absolute bottom-[25%] right-[20%] w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-35 blur-3xl animate-float4 animation-delay-1000"></div>
        <div className="absolute top-[40%] left-[8%] w-64 h-64 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full opacity-30 blur-3xl animate-float5 animation-delay-3000"></div>
        <div className="absolute top-[65%] right-[12%] w-56 h-56 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-25 blur-3xl animate-float6 animation-delay-2000"></div>
      </div>

      {/* Mobile Menu Button - Her zaman görünür */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 bg-white/30 backdrop-blur-xl backdrop-saturate-150 rounded-2xl flex items-center justify-center text-slate-800 hover:bg-white/50 transition-all shadow-xl border border-white/40"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Header - Profil bilgisi */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30 transition-all duration-500 ${
        activeSection === 'about' 
          ? (showHeaderProfile ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none')
          : 'opacity-100 transform translate-y-0'
      }`}>
        <div className="flex items-center justify-start p-4">
          <div className="flex items-center gap-3">
            <img 
              src="/profile.jpg" 
              alt="Melih Arık" 
              className="w-10 h-10 rounded-xl object-cover shadow-lg"
            />
            <div>
              <h1 className="text-sf-headline font-sf-semibold text-slate-900">Melih Arık</h1>
              <p className="text-sf-footnote font-sf-regular text-slate-700">Mobile Application Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-16 right-4 w-72 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-2xl border border-white/30 p-4" onClick={(e) => e.stopPropagation()}>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleMenuItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left font-sf-medium backdrop-blur-sm ${
                          activeSection === item.id
                            ? 'bg-white/60 text-slate-900 shadow-lg'
                            : 'text-slate-800 hover:bg-white/30 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sf-callout">{item.label}</span>
                      </button>
          </li>
                  );
                })}
              </ul>
              
              {/* Mobile Social Links */}
              <div className="flex gap-3 mt-6 pt-4 border-t border-white/20">
                <a 
                  href="https://github.com/meliharik" 
            target="_blank"
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
          >
                  <Github className="w-4 h-4" />
          </a>
          <a
                  href="https://linkedin.com/in/meliharik" 
            target="_blank"
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
          >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:melih@example.com" 
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto flex relative z-10">
        {/* Desktop Sidebar - Sadece büyük ekranlarda görünür */}
        <div className="hidden lg:block w-80 min-h-screen fixed top-0 left-1/2 transform -translate-x-[640px] z-30">
          {/* Glass Container - sadece blur ve hafif tint, arka planı maskelemeyen */}
          <div className="absolute inset-0 backdrop-blur-xl backdrop-saturate-200"></div>
          
          {/* Very subtle white overlay only for readability */}
          <div className="absolute inset-0 bg-white/15"></div>
          
          {/* Content with higher z-index */}
          <div className="relative z-10">
            {/* Profile Header */}
            <div className="p-8 border-b border-white/20">
              <img 
                src="/profile.jpg" 
                alt="Melih Arık" 
                className="w-20 h-20 rounded-2xl object-cover shadow-lg mb-4"
              />
              <h1 className="text-sf-title1 font-sf-bold text-slate-900 mb-1 drop-shadow-sm">Melih Arık</h1>
              <p className="text-sf-headline font-sf-medium text-slate-800 mb-3 drop-shadow-sm">Mobile Application Developer</p>
              <p className="text-sf-subhead font-sf-regular text-slate-700 flex items-center gap-2 drop-shadow-sm">
                <MapPin className="w-4 h-4" />
                Tartu, Estonia
              </p>
            </div>
            
            {/* Navigation Menu */}
            <nav className="p-6">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  
                  // Contact öğesi için özel animated border (sadece desktop)
                  if (item.id === 'contact') {
                    return (
                      <li key={item.id} className="hidden lg:block">
                        <MovingBorderButton
                          onClick={() => handleMenuItemClick(item.id)}
                          borderRadius="0.75rem"
                          duration={4000}
                          className={`flex items-center gap-3 px-4 py-2.5 font-sf-medium transition-all text-left justify-start ${
                            activeSection === item.id
                              ? 'bg-white/60 text-slate-900'
                              : 'bg-white/30 text-slate-800 hover:bg-white/50 hover:text-slate-900'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          {item.label}
                        </MovingBorderButton>
                      </li>
                    );
                  }
                  
                                    // Diğer menü öğeleri normal (ve Contact'ı mobilde normal göster)
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => handleMenuItemClick(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left font-sf-medium backdrop-blur-sm ${
                          activeSection === item.id
                            ? 'bg-white/60 text-slate-900 shadow-lg'
                            : 'text-slate-800 hover:bg-white/30 hover:text-slate-900'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            {/* Social Links */}
            <div className="p-6 border-t border-white/20">
              <div className="flex gap-3 mb-6">
                <a 
                  href="https://github.com/meliharik" 
          target="_blank"
                  className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
        >
                  <Github className="w-5 h-5" />
        </a>
        <a
                  href="https://linkedin.com/in/meliharik" 
          target="_blank"
                  className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
        >
                  <Linkedin className="w-5 h-5" />
        </a>
        <a
                  href="mailto:melih@example.com" 
                  className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              {/* Footer */}
              <div className="pt-4 border-t border-white/20">
                <div className="text-center space-y-2">
                  <p className="text-sf-caption1 font-sf-regular text-slate-600 drop-shadow-sm">
                    ©{new Date().getFullYear()} Melih Arık
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sf-caption1 font-sf-regular text-slate-600 drop-shadow-sm">
                    <span>Made with</span>
                    <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" />
                    <span>and</span>
                    <Coffee className="w-3 h-3 text-amber-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 lg:ml-80">
          <div className="max-w-4xl mx-auto lg:mx-0">
            {renderContent()}
            
            {/* Mobile Footer - Sadece mobile'da görünür */}
            <div className="lg:hidden mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <p className="text-sf-footnote font-sf-regular text-slate-600 mb-4 flex items-center justify-center gap-1">
                  Made by Melih Arık with <Heart className="w-3 h-3 text-red-500 fill-current" /> and <Coffee className="w-3 h-3 text-amber-600" />
                </p>
                <div className="flex items-center justify-center gap-6">
                  <a 
                    href="https://github.com/meliharik" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-700 hover:bg-white/30 hover:text-slate-900 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/meliharik" 
          target="_blank"
          rel="noopener noreferrer"
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-700 hover:bg-white/30 hover:text-slate-900 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href="mailto:melih@example.com" 
                    className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-700 hover:bg-white/30 hover:text-slate-900 transition-all"
                  >
                    <Mail className="w-4 h-4" />
        </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-xl hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300 shadow-xl border border-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Image */}
            <img 
              src={selectedImage}
              alt="Presentation Image"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
