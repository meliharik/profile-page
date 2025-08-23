import { Mail, MapPin, Calendar, ExternalLink, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { MovingBorderButton } from '../MovingBorder';

export const ContactSection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-sf-large font-sf-bold text-slate-900 mb-4 drop-shadow-sm">Get In Touch</h2>
        <p className="text-sf-body font-sf-regular text-slate-700 max-w-2xl mx-auto leading-relaxed">
                  I&apos;m always excited to discuss new mobile app opportunities, innovative projects,
        and collaborations in iOS/Android development. Let&apos;s build something amazing together!
        </p>
      </div>

      <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
        <h3 className="text-sf-title2 font-sf-bold text-slate-900 mb-6 drop-shadow-sm">Contact Information</h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Email */}
          <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sf-caption1 font-sf-medium text-slate-700 mb-1">Email</p>
              <a href="mailto:hi@meliharik.dev" className="text-sf-subhead font-sf-semibold text-slate-900 hover:text-blue-600 transition-colors">
                hi@meliharik.dev
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/20 transition-all">
            <div className="w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sf-caption1 font-sf-medium text-slate-700 mb-1">Location</p>
              <span className="text-sf-subhead font-sf-semibold text-slate-900">Tartu, Estonia</span>
            </div>
          </div>

          {/* Calendar */}
          <div className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/20 transition-all md:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sf-caption1 font-sf-medium text-slate-700 mb-2">Schedule a Meeting</p>
              <a 
                href="https://cal.com/meliharik" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <MovingBorderButton
                  borderRadius="0.5rem"
                  duration={3000}
                  className="inline-flex items-center gap-2 bg-white/60 hover:bg-white/80 text-slate-800 font-sf-semibold px-4 py-2 text-sf-caption1 shadow-lg transition-all backdrop-blur-sm"
                >
                  <span>Book a Call</span>
                  <ExternalLink className="w-3 h-3" />
                </MovingBorderButton>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
        <h3 className="text-sf-title2 font-sf-bold text-slate-900 mb-6 text-center drop-shadow-sm">Connect With Me</h3>
        
        <div className="flex flex-wrap justify-center gap-3">
          {/* GitHub */}
          <a 
            href="https://github.com/meliharik" 
            target="_blank" 
            className="flex items-center gap-2 bg-[#24292e] hover:bg-[#1a1e22] text-white px-4 py-3 rounded-xl transition-all font-sf-semibold text-sf-caption1 shadow-lg"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          
          {/* LinkedIn */}
          <a 
            href="https://linkedin.com/in/melihify" 
            target="_blank" 
            className="flex items-center gap-2 bg-[#0077b5] hover:bg-[#005885] text-white px-4 py-3 rounded-xl transition-all font-sf-semibold text-sf-caption1 shadow-lg"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>

          {/* Twitter */}
          <a 
            href="https://twitter.com/melihify" 
            target="_blank" 
            className="flex items-center gap-2 bg-[#1da1f2] hover:bg-[#0d8bd9] text-white px-4 py-3 rounded-xl transition-all font-sf-semibold text-sf-caption1 shadow-lg"
          >
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </a>

          {/* Instagram */}
          <a 
            href="https://instagram.com/melihifyy" 
            target="_blank" 
            className="flex items-center gap-2 bg-[#e4405f] hover:bg-[#d62d4a] text-white px-4 py-3 rounded-xl transition-all font-sf-semibold text-sf-caption1 shadow-lg"
          >
            <Instagram className="w-5 h-5" />
            <span>Instagram</span>
          </a>

          {/* Spotify */}
          <a 
            href="https://open.spotify.com/user/199wfac2k17k8dj59qndmxm1n?" 
            target="_blank" 
            className="flex items-center gap-2 bg-[#1db954] hover:bg-[#1aa34a] text-white px-4 py-3 rounded-xl transition-all font-sf-semibold text-sf-caption1 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 17.568c-.24.36-.72.48-1.08.24-2.88-1.8-6.48-2.208-10.728-1.2-.36.096-.72-.144-.816-.48-.096-.36.144-.72.48-.816 4.608-1.104 8.64-.624 11.784 1.368.36.24.48.72.24 1.08l.12-.192zm1.44-3.216c-.288.432-.864.576-1.296.288-3.312-2.04-8.352-2.64-12.24-1.44-.432.144-.864-.144-1.008-.576-.144-.432.144-.864.576-1.008 4.464-1.368 10.08-.72 13.92 1.632.432.288.576.864.288 1.296l-.24-.192zm.144-3.36c-3.936-2.352-10.44-2.568-14.208-1.416-.504.144-1.032-.216-1.176-.72-.144-.504.216-1.032.72-1.176C8.64 6.24 15.84 6.528 20.448 9.216c.504.288.672.936.384 1.44-.288.504-.936.672-1.44.384l-.24-.048z"/>
            </svg>
            <span>Spotify</span>
          </a>
        </div>
      </div>
    </div>
  );
}; 