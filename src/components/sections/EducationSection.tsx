import { educationData } from '@/lib/data/education';

export const EducationSection = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Education</h2>
      
      <div className="space-y-8">
        {educationData.map((education, index) => (
          <div key={index} className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-6 lg:p-8 shadow-xl border border-white/30">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
              <div className="flex-shrink-0 hidden lg:block">
                <img 
                  src={education.logo} 
                  alt={education.institution} 
                  className="w-20 h-20 rounded-2xl object-contain bg-white/50 p-2 shadow-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 lg:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-2 drop-shadow-sm">{education.field}</h3>
                    <h4 className="text-sf-title3 font-sf-semibold text-slate-800 mb-1 drop-shadow-sm">{education.degree}</h4>
                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${education.institutionColor} font-sf-semibold drop-shadow-sm`}>
                      {education.institution}
                    </p>
                    {education.gpa && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-full text-sf-footnote font-sf-semibold border border-emerald-300/30 drop-shadow-sm">
                          GPA: {education.gpa}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="lg:text-right">
                    <span className="text-sf-headline font-sf-semibold text-slate-700 bg-white/30 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/40 drop-shadow-sm">
                      {education.period}
                    </span>
                  </div>
                </div>
                                 {education.description && (
                   <p className="text-sf-body font-sf-regular text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
                     {education.description}
                   </p>
                 )}
                {education.field === 'Software Engineering' && (
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-lg text-sm border border-blue-300/30 drop-shadow-sm">Mobile Computing</span>
                    <span className="px-3 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-lg text-sm border border-emerald-300/30 drop-shadow-sm">HCI</span>
                    <span className="px-3 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-lg text-sm border border-violet-300/30 drop-shadow-sm">Distributed Systems</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 