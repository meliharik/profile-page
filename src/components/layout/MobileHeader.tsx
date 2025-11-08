import Image from 'next/image';

interface MobileHeaderProps {
  activeSection: string;
  showHeaderProfile: boolean;
}

export const MobileHeader = ({ activeSection, showHeaderProfile }: MobileHeaderProps) => {
  return (
    <div className={`lg:hidden fixed top-0 left-0 right-0 z-40 bg-white/20 backdrop-blur-xl backdrop-saturate-150 border-b border-white/30 transition-all duration-500 ${
      activeSection === 'about' 
        ? (showHeaderProfile ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4 pointer-events-none')
        : 'opacity-100 transform translate-y-0'
    }`}>
      <div className="flex items-center justify-start p-4">
        <div className="flex items-center gap-3">
          <Image 
            src="/profile.jpeg" 
            alt="Melih Arık" 
            className="w-10 h-10 rounded-xl object-cover shadow-lg"
            width={40}
            height={40}
          />
          <div>
            <h1 className="text-sf-headline font-sf-semibold text-slate-900">Melih Arık</h1>
            <p className="text-sf-footnote font-sf-regular text-slate-700">Mobile Application Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 