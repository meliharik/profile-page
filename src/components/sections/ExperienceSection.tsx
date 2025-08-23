import { MapPin } from 'lucide-react';
import { experienceData } from '@/lib/data/experience';

// Gradient class'larını gerçek renklere çeviren helper fonksiyon
const getGradientColors = (gradientClass: string) => {
  const colorMap: { [key: string]: string } = {
    'from-emerald-600 to-teal-600': '#059669, #0d9488',
    'from-violet-600 to-purple-600': '#7c3aed, #9333ea',
    'from-amber-600 to-orange-600': '#d97706, #ea580c',
    'from-blue-600 to-blue-600': '#2563eb, #2563eb',
    'from-red-600 to-red-600': '#dc2626, #dc2626',
    'from-indigo-600 to-blue-600': '#4f46e5, #2563eb',
    'from-pink-600 to-rose-600': '#db2777, #e11d48',
    'from-cyan-600 to-sky-600': '#0891b2, #0284c7'
  };
  
  return colorMap[gradientClass] || '#475569, #475569';
};

export const ExperienceSection = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Work Experience</h2>
      
      <div className="space-y-6">
        {experienceData.map((experience, index) => (
          <div key={index} className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">{experience.title}</h3>
                {experience.company && (
                  <p 
                    className="font-sf-semibold text-sf-title2 drop-shadow-sm"
                    style={{
                      background: experience.companyColor 
                        ? `linear-gradient(to right, ${getGradientColors(experience.companyColor)})`
                        : 'linear-gradient(to right, #475569, #475569)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {experience.company}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sf-subhead font-sf-regular text-slate-600 drop-shadow-sm mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              </div>
              <div className="lg:text-right">
                <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                  {experience.period}
                </span>
              </div>
            </div>
            {experience.description && (
              <p className="text-sf-body font-sf-regular text-slate-800 leading-relaxed drop-shadow-sm">
                {experience.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 