'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useHeaderVisibility } from '@/hooks/useHeaderVisibility';

// Layout Components
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { MobileFooter } from '@/components/layout/MobileFooter';

// Section Components
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { PresentationsSection } from '@/components/sections/PresentationsSection';
import { BlogsSection } from '@/components/sections/BlogsSection';
import { PapersSection } from '@/components/sections/PapersSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { MusicPlayer } from '@/components/MusicPlayer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { showHeaderProfile } = useHeaderVisibility(activeSection);

  const handleMenuItemClick = (itemId: string) => {
    setActiveSection(itemId);
    setIsMobileMenuOpen(false); // Mobilde menü seçiminden sonra kapat
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection activeSection={activeSection} />;
      case 'experience':
        return <ExperienceSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'education':
        return <EducationSection />;
      case 'presentations':
        return <PresentationsSection setSelectedImage={setSelectedImage} />;
      case 'blogs':
        return <BlogsSection activeSection={activeSection} />;
      case 'papers':
        return <PapersSection setSelectedImage={setSelectedImage} />;
      case 'contact':
        return <ContactSection />;
      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden font-sf-pro">
      {/* Animated Background Circles */}
      <AnimatedBackground />

      {/* Mobile Components */}
      <MobileMenu 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeSection={activeSection}
        handleMenuItemClick={handleMenuItemClick}
      />

      <MobileHeader 
        activeSection={activeSection}
        showHeaderProfile={showHeaderProfile}
      />

      <div className="max-w-7xl mx-auto flex relative z-10">
        {/* Desktop Sidebar */}
        <Sidebar 
          activeSection={activeSection}
          handleMenuItemClick={handleMenuItemClick}
        />
        
        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 lg:ml-80">
          <div className="max-w-4xl mx-auto lg:mx-0">
            {renderContent()}
            
            {/* Mobile Footer */}
            <MobileFooter />
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
            <Image 
              src={selectedImage}
              alt="Presentation Image"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              fill
              sizes="(max-width: 768px) 100vw, 90vw"
            />
          </div>
        </div>
      )}

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
}
