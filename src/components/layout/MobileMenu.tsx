import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { menuItems } from '@/lib/data/menu-items';

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  handleMenuItemClick: (itemId: string) => void;
}

export const MobileMenu = ({ 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  activeSection, 
  handleMenuItemClick 
}: MobileMenuProps) => {
  return (
    <>
      {/* Mobile Menu Button - Her zaman görünür */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 bg-white/30 backdrop-blur-xl backdrop-saturate-150 rounded-2xl flex items-center justify-center text-slate-800 hover:bg-white/50 transition-all shadow-xl border border-white/40"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
                  href="https://linkedin.com/in/melihify" 
                  target="_blank"
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:hi@meliharik.dev" 
                  className="flex-1 h-10 bg-white/30 hover:bg-white/50 rounded-xl flex items-center justify-center text-slate-800 hover:text-slate-900 transition-all backdrop-blur-sm"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}; 