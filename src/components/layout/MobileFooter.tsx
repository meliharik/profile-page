import { Heart, Coffee, Github, Linkedin, Mail } from 'lucide-react';

export const MobileFooter = () => {
  return (
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
            href="https://linkedin.com/in/melihify" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-700 hover:bg-white/30 hover:text-slate-900 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a 
            href="mailto:hi@meliharik.dev" 
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-slate-700 hover:bg-white/30 hover:text-slate-900 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}; 