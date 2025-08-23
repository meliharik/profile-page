import { MapPin, Heart, Coffee, Github, Linkedin, Mail } from 'lucide-react';
import { MovingBorderButton } from '../MovingBorder';
import { menuItems } from '@/lib/data/menu-items';

interface SidebarProps {
  activeSection: string;
  handleMenuItemClick: (itemId: string) => void;
}

export const Sidebar = ({ activeSection, handleMenuItemClick }: SidebarProps) => {
  return (
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
              href="https://linkedin.com/in/melihify" 
              target="_blank"
              className="w-12 h-12 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hi@meliharik.dev" 
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
  );
}; 