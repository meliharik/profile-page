import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useAboutAnimations } from '@/hooks/useAboutAnimations';
import { useHeaderVisibility } from '@/hooks/useHeaderVisibility';

interface AboutSectionProps {
  activeSection: string;
}

export const AboutSection = ({ activeSection }: AboutSectionProps) => {
  const { aboutTextRef } = useAboutAnimations(activeSection);
  const { heroSectionRef } = useHeaderVisibility(activeSection);

  const skills = [
    'Swift', 'SwiftUI', 'Kotlin', 'Java', 'React Native', 'Flutter', 
    'Dart', 'Xcode', 'Android Studio', 'Firebase', 'Core Data', 'SQLite', 'REST APIs'
  ];

  return (
    <div className="space-y-8">
      {/* Mobile Hero Section - sadece mobile'da görünür */}
      <div className="lg:hidden" ref={heroSectionRef}>
        <div className="flex flex-col items-center text-center mb-8 py-8">
          <div className="mb-6">
            <Image 
              src="/profile.jpeg" 
              alt="Melih Arık" 
              className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white/30 backdrop-blur-sm"
              width={128}
              height={128}
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
              I&apos;m a Mobile Application Developer passionate about creating exceptional user experiences 
              on iOS and Android platforms. I specialize in building native and cross-platform mobile 
              applications that are performant, intuitive, and scalable.
            </p>
            <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
              My expertise spans <span className="highlight-tech">Swift</span>/<span className="highlight-tech">SwiftUI</span> for iOS, <span className="highlight-tech">Kotlin</span>/Java for Android, <span className="highlight-tech">React Native</span> and <span className="highlight-tech">Flutter</span> for 
              cross-platform development. I love crafting beautiful interfaces and implementing complex 
              functionality that delights users.
            </p>
            <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
              When I&apos;m not coding, you&apos;ll find me exploring the latest mobile development trends, 
              contributing to open source mobile projects, or prototyping innovative app concepts 
              that push the boundaries of mobile user experience. 
            </p>
            <p className="text-slate-800 leading-relaxed mb-6 drop-shadow-sm">
              I&apos;m currently
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
                Let&apos;s Schedule a Meeting
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
                <span>Book a Call</span>
                <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"></div>
              </a>
            </div>
          </div>
        </div>
        
        <h3 className="text-sf-title2 font-sf-semibold text-slate-900 mb-4 drop-shadow-sm">Skills & Technologies</h3>
        <div className="bg-white/15 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 shadow-xl border border-white/20">
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="px-4 py-2 bg-white/30 backdrop-blur-sm text-slate-800 rounded-full text-sf-subhead font-sf-medium border border-white/40 hover:bg-white/50 transition-all drop-shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 