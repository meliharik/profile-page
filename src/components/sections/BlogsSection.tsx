import { useMediumPosts } from '@/hooks/useMediumPosts';
import Image from 'next/image';

interface BlogsSectionProps {
  activeSection: string;
}

export const BlogsSection = ({ activeSection }: BlogsSectionProps) => {
  const { mediumPosts, loadingPosts } = useMediumPosts(activeSection);

  return (
    <div className="space-y-8">
      <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Blog Posts & Articles</h2>
      
      {loadingPosts ? (
        <div className="flex items-center justify-center py-12">
          <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-slate-800 font-medium">Loading Medium posts...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-8">
          {mediumPosts.length > 0 ? (
            mediumPosts.slice(-2).reverse().map((post, index) => {
              const publishDate = new Date(post.pubDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              });
              
              // Extract plain text from HTML content
              const description = post.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
              
              // Extract reading time (if available in content)
              const readingTime = Math.ceil(post.content?.length / 1000) || '5';
              
              return (
                <div key={index} className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
                  {/* Image Section */}
                  <div className={`lg:col-span-2 relative h-48 lg:h-auto overflow-hidden ${index % 2 === 0 ? 'order-1' : 'order-2 lg:order-2'}`}>
                    <Image 
                      src={post.description?.match(/<img[^>]+src="([^">]+)"/)?.[1] || 'https://via.placeholder.com/400x200/00ab6b/ffffff?text=Medium+Article'} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className={`lg:col-span-3 p-6 flex flex-col justify-center ${index % 2 === 0 ? 'order-2' : 'order-1 lg:order-1'}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-sf-caption1 font-sf-semibold text-emerald-700 bg-emerald-50/50 px-2 py-1 rounded-lg">{publishDate}</span>
                    </div>
                    
                    <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-3 leading-tight line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 font-sf-semibold text-sf-title2 mb-3">
                      Medium • @melihify
                    </p>
                    
                    <p className="text-sf-body font-sf-regular text-slate-800 mb-4 leading-relaxed line-clamp-3">
                      {description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {post.categories?.slice(0, 2).map((category: string, catIndex: number) => (
                          <span key={catIndex} className="px-2 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-md text-xs border border-emerald-300/30 capitalize">
                            {category}
                          </span>
                        ))}
                        <span className="px-2 py-1 bg-amber-400/20 backdrop-blur-sm text-amber-800 rounded-md text-xs border border-amber-300/30">{readingTime} min read</span>
                      </div>
                                             <div className="flex items-center gap-3">
                         <span className="text-sf-caption1 font-sf-medium text-slate-700">Read on</span>
                                                 <a href={post.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-sf-caption1 font-sf-semibold transition-colors">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75S24 8.83 24 12z"/>
                          </svg>
                          Medium
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl p-8 shadow-xl border border-white/30 text-center">
              <p className="text-slate-800 font-medium">No blog posts found. Please check back later!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 