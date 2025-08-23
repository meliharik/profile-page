import { Trophy, ExternalLink, Github } from 'lucide-react';
import { projectsData } from '@/lib/data/projects';

export const ProjectsSection = () => {
  const renderBadge = (badge: any) => {
    if (badge.type === 'award') {
      return (
        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400/20 to-orange-400/20 backdrop-blur-sm px-2 py-1 rounded-full border border-amber-300/30 w-fit">
          <Trophy className="w-3 h-3 lg:w-4 lg:h-4 text-amber-700" />
          <span className="text-xs lg:text-sm font-medium text-amber-800 drop-shadow-sm">{badge.text}</span>
        </div>
      );
    }
    return (
      <span className="text-xs lg:text-sm text-slate-700 bg-white/30 backdrop-blur-sm px-2 py-1 rounded-full border border-white/40 drop-shadow-sm w-fit">
        {badge.text}
      </span>
    );
  };

  const renderLinkIcon = (type: string) => {
    switch (type) {
      case 'github':
        return <Github className="w-3 h-3 lg:w-4 lg:h-4" />;
      case 'appstore':
        return (
          <svg viewBox="0 0 384 512" className="w-3 h-3 lg:w-4 lg:h-4" fill="currentColor">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
          </svg>
        );
      case 'medium':
        return (
          <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        );
      default:
        return <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />;
    }
  };

  const getLinkClassName = (type: string) => {
    switch (type) {
      case 'github':
        return 'bg-[#24292e] text-white hover:bg-[#24292e]/90';
      case 'appstore':
        return 'bg-black text-white hover:bg-black/90';
      case 'medium':
        return 'bg-black text-white hover:bg-black/90';
      default:
        return 'bg-blue-500 text-white hover:bg-blue-600';
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Featured Projects</h2>
      
      <div className="grid gap-6">
                {projectsData.map((project, index) => (
          <div key={index} className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-4 lg:p-6 shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
            {/* Desktop Layout: Badge sağ üstte */}
            <div className="hidden lg:flex lg:items-start lg:justify-between lg:mb-4">
              <h3 className="text-sf-title1 font-sf-bold text-slate-900 drop-shadow-sm leading-tight flex-1 pr-4">{project.title}</h3>
              {project.badge && (
                <div className="flex-shrink-0">
                  {renderBadge(project.badge)}
                </div>
              )}
            </div>

            {/* Mobile Layout: Badge alt alta */}
            <div className="lg:hidden space-y-3 mb-4">
              <h3 className="text-sf-title1 font-sf-bold text-slate-900 drop-shadow-sm leading-tight">{project.title}</h3>
              {project.badge && renderBadge(project.badge)}
            </div>

            <p className="text-sf-body font-sf-regular text-slate-800 mb-4 leading-relaxed drop-shadow-sm">
              {project.description}
            </p>

            {/* Desktop Layout: Technologies ve links yan yana */}
            <div className="hidden lg:block">
              <div className="flex flex-wrap items-center gap-2">
                {/* Technologies */}
                {project.technologies.map((tech, techIndex) => {
                  const colors = [
                    'bg-blue-400/20 text-blue-800 border-blue-300/30',
                    'bg-emerald-400/20 text-emerald-800 border-emerald-300/30',
                    'bg-violet-400/20 text-violet-800 border-violet-300/30',
                    'bg-orange-400/20 text-orange-800 border-orange-300/30',
                    'bg-rose-400/20 text-rose-800 border-rose-300/30',
                    'bg-cyan-400/20 text-cyan-800 border-cyan-300/30',
                    'bg-red-400/20 text-red-800 border-red-300/30'
                  ];
                  return (
                    <span key={techIndex} className={`px-3 py-1 backdrop-blur-sm rounded-lg text-sm border drop-shadow-sm ${colors[techIndex % colors.length]}`}>
                      {tech}
                    </span>
                  );
                })}
                
                {/* Links - Technologies'in sağında */}
                {project.links && project.links.map((link, linkIndex) => (
                  <a 
                    key={linkIndex}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sf-caption1 font-sf-semibold transition-colors w-fit ml-2 ${getLinkClassName(link.type)}`}
                  >
                    {renderLinkIcon(link.type)}
                    <span>{link.label}</span>
                    <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Layout: Eski düzen (technologies yukarıda, links altta) */}
            <div className="lg:hidden space-y-3">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => {
                  const colors = [
                    'bg-blue-400/20 text-blue-800 border-blue-300/30',
                    'bg-emerald-400/20 text-emerald-800 border-emerald-300/30',
                    'bg-violet-400/20 text-violet-800 border-violet-300/30',
                    'bg-orange-400/20 text-orange-800 border-orange-300/30',
                    'bg-rose-400/20 text-rose-800 border-rose-300/30',
                    'bg-cyan-400/20 text-cyan-800 border-cyan-300/30',
                    'bg-red-400/20 text-red-800 border-red-300/30'
                  ];
                  return (
                    <span key={techIndex} className={`px-3 py-1 backdrop-blur-sm rounded-lg text-sm border drop-shadow-sm ${colors[techIndex % colors.length]}`}>
                      {tech}
                    </span>
                  );
                })}
              </div>
              {project.links && project.links.map((link, linkIndex) => (
                <a 
                  key={linkIndex}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sf-caption1 font-sf-semibold transition-colors w-fit ${getLinkClassName(link.type)}`}
                >
                  {renderLinkIcon(link.type)}
                  <span className="hidden sm:inline">{link.label}</span>
                  <span className="sm:hidden">{link.type === 'github' ? 'GitHub' : link.type === 'appstore' ? 'App Store' : link.type === 'medium' ? 'Medium' : 'Link'}</span>
                  <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 