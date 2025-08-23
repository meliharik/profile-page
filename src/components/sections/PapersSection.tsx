import Image from 'next/image';

interface PapersSectionProps {
  setSelectedImage: (image: string | null) => void;
}

export const PapersSection = ({ setSelectedImage }: PapersSectionProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-sf-large font-sf-bold text-slate-900 mb-8 drop-shadow-sm">Academic Papers & Research</h2>
      
      <div className="grid gap-8">
        {/* ICETI'24 Paper */}
        <div className="group grid lg:grid-cols-5 gap-6 bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl overflow-hidden shadow-xl border border-white/30 hover:bg-white/25 transition-all duration-300">
          {/* Image Section */}
          <div className="lg:col-span-2 relative h-48 lg:h-auto overflow-hidden cursor-pointer" onClick={() => setSelectedImage("/presentations/bosna.jpg")}>
            <Image 
              src="/presentations/bosna.jpg" 
              alt="ICETI&apos;24 Conference Paper"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
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
          <div className="lg:col-span-3 p-4 lg:p-6 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sf-caption1 font-sf-semibold text-blue-700 bg-blue-50/50 px-2 py-1 rounded-lg">Oct 2024</span>
            </div>
            
            <h3 className="text-sf-title1 font-sf-bold text-slate-900 mb-3 leading-tight">
              ENCRYPTED MESSAGING APPLICATION COMBINING AES AND RSA ALGORITHMS
            </h3>
            
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-sf-semibold text-sf-title2 mb-3">
              ICETI&apos;24 - International Conference on Engineering and Technology Innovation • First Author
            </p>
            
            <p className="text-sf-body font-sf-regular text-slate-800 mb-4 leading-relaxed">
              This paper presents a secure messaging application that combines AES and RSA encryption algorithms 
              to provide end-to-end encryption with optimal security and performance balance.
            </p>
            
            <div className="space-y-3">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-blue-400/20 backdrop-blur-sm text-blue-800 rounded-md text-xs border border-blue-300/30">Encryption</span>
                <span className="px-2 py-1 bg-emerald-400/20 backdrop-blur-sm text-emerald-800 rounded-md text-xs border border-emerald-300/30">AES</span>
                <span className="px-2 py-1 bg-violet-400/20 backdrop-blur-sm text-violet-800 rounded-md text-xs border border-violet-300/30">RSA</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sf-caption1 font-sf-medium text-slate-700">View in</span>
                <a href="https://www.iceti.org/sites/default/files/iceti_2024_book_of_proceedings.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-sf-caption1 font-sf-semibold transition-colors w-fit">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                  </svg>
                  <span className="hidden sm:inline">Journal</span>
                  <span className="sm:hidden">Journal</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 