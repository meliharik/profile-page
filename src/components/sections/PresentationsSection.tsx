import { ExternalLink } from 'lucide-react';
import { presentationsData } from '@/lib/data/presentations';

interface PresentationsSectionProps {
  setSelectedImage: (image: string | null) => void;
}

export const PresentationsSection = ({ setSelectedImage }: PresentationsSectionProps) => {
  const getDateColor = (date: string) => {
    if (date.includes('Oct 2024')) return 'text-blue-700 bg-blue-50/50';
    if (date.includes('Dec 2023')) return 'text-emerald-700 bg-emerald-50/50';
    if (date.includes('Jul 2023')) return 'text-purple-700 bg-purple-50/50';
    if (date.includes('May 2023')) return 'text-green-700 bg-green-50/50';
    if (date.includes('Mar 2023')) return 'text-cyan-700 bg-cyan-50/50';
    return 'text-slate-700 bg-slate-50/50';
  };

  const getDateDotColor = (date: string) => {
    if (date.includes('Oct 2024')) return 'bg-blue-500';
    if (date.includes('Dec 2023')) return 'bg-emerald-500';
    if (date.includes('Jul 2023')) return 'bg-purple-500';
    if (date.includes('May 2023')) return 'bg-green-500';
    if (date.includes('Mar 2023')) return 'bg-cyan-500';
    return 'bg-slate-500';
  };

  const renderPlatformIcon = (type: string) => {
    switch (type) {
      case 'spotify':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 17.568c-.24.36-.72.48-1.08.24-2.88-1.8-6.48-2.208-10.728-1.2-.36.096-.72-.144-.816-.48-.096-.36.144-.72.48-.816 4.608-1.104 8.64-.624 11.784 1.368.36.24.48.72.24 1.08l.12-.192zm1.44-3.216c-.288.432-.864.576-1.296.288-3.312-2.04-8.352-2.64-12.24-1.44-.432.144-.864-.144-1.008-.576-.144-.432.144-.864.576-1.008 4.464-1.368 10.08-.72 13.92 1.632.432.288.576.864.288 1.296l-.24-.192zm.144-3.36c-3.936-2.352-10.44-2.568-14.208-1.416-.504.144-1.032-.216-1.176-.72-.144-.504.216-1.032.72-1.176C8.64 6.24 15.84 6.528 20.448 9.216c.504.288.672.936.384 1.44-.288.504-.936.672-1.44.384l-.24-.048z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getPlatformClassName = (type: string) => {
    switch (type) {
      case 'spotify':
        return 'bg-green-500 hover:bg-green-600 text-white';
      case 'youtube':
        return 'bg-red-500 hover:bg-red-600 text-white';
      default:
        return 'bg-blue-500 hover:bg-blue-600 text-white';
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Conference Presentations</h2>
      
      <div className="grid gap-8">
        {presentationsData.map((presentation, index) => (
          <div key={index} className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
            {/* Image Section */}
            <div className={`lg:col-span-2 relative h-48 lg:h-auto overflow-hidden cursor-pointer ${index % 2 === 0 ? 'order-1' : 'order-2 lg:order-2'}`} onClick={() => setSelectedImage(presentation.image)}>
              <img 
                src={presentation.image} 
                alt={presentation.title}
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
            <div className={`lg:col-span-3 p-6 flex flex-col justify-center ${index % 2 === 0 ? 'order-2' : 'order-1 lg:order-1'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${getDateDotColor(presentation.date)}`}></div>
                <span className={`text-sf-caption1 font-sf-semibold px-2 py-1 rounded-lg ${getDateColor(presentation.date)}`}>
                  {presentation.date}
                </span>
              </div>
              
                             <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-3 leading-tight">{presentation.title}</h3>
               
               <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-sf-semibold text-sf-title2 mb-3">
                 {presentation.event}
               </p>
               
               <p className="text-sf-body font-sf-regular text-slate-800 mb-4 leading-relaxed">
                {presentation.description}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  {presentation.technologies.map((tech, techIndex) => {
                    const colors = [
                      'bg-blue-400/20 text-blue-800 border-blue-300/30',
                      'bg-emerald-400/20 text-emerald-800 border-emerald-300/30',
                      'bg-violet-400/20 text-violet-800 border-violet-300/30',
                      'bg-rose-400/20 text-rose-800 border-rose-300/30',
                      'bg-cyan-400/20 text-cyan-800 border-cyan-300/30',
                      'bg-amber-400/20 text-amber-800 border-amber-300/30'
                    ];
                    return (
                      <span key={techIndex} className={`px-3 py-1 backdrop-blur-sm rounded-lg text-sm border ${colors[techIndex % colors.length]}`}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
                                 <div className="flex items-center gap-2 text-sf-caption1 font-sf-medium text-slate-700">
                   {presentation.attendees && <span>{presentation.attendees}</span>}
                  {presentation.link && (
                    <a href={presentation.link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 text-slate-600 hover:text-slate-800 transition-colors cursor-pointer" />
                    </a>
                  )}
                </div>
              </div>
              
              {presentation.link && (
                               <div className="flex items-center gap-3 mt-4">
                 <span className="text-sf-caption1 font-sf-medium text-slate-700">
                   {presentation.link.type === 'spotify' ? 'Listen on' : presentation.link.type === 'youtube' ? 'Watch on' : 'View on'}
                 </span>
                  <a 
                    href={presentation.link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                                         className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sf-caption1 font-sf-semibold transition-colors ${getPlatformClassName(presentation.link.type)}`}
                  >
                    {renderPlatformIcon(presentation.link.type)}
                    {presentation.link.label}
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 