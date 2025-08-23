'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface Track {
  title: string;
  artist: string;
  url: string;
  cover?: string;
}

// Local müzik dosyası - DaftPunk Around The World
const track: Track = {
  title: "Around The World",
  artist: "Daft Punk", 
  url: "/music/daftpunk.mp3", // Local dosya public/music/ klasöründe
  cover: "/dp.jpg" // Daft Punk album cover
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };
    
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        setIsLoading(true);
        
        // Basit play attempt
        await audio.play();
        setIsPlaying(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Playback failed:', error);
        setIsLoading(false);
        // Browser auto-play policy nedeniyle user interaction gerekebilir
      }
    }
  };





  return (
    <div className="fixed bottom-4 right-4 z-50">
      <audio
        ref={audioRef}
        src={track.url}
        preload="metadata"
      />
      
      <div className={`bg-white/20 backdrop-blur-xl backdrop-saturate-150 rounded-2xl shadow-xl border border-white/30 transition-all duration-300 ${
        isMinimized ? 'w-16 h-16' : 'w-80 h-auto'
      }`}>
        
        {isMinimized ? (
          // Minimized View
                     <div className="w-full h-full flex items-center justify-center relative">
             <button
               onClick={togglePlay}
               disabled={isLoading}
               className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${
                 isLoading 
                   ? 'bg-gray-300 cursor-not-allowed' 
                   : 'bg-white/30 hover:bg-white/50'
               }`}
             >
               {isLoading ? (
                 <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
               ) : isPlaying ? (
                 <Pause className="w-5 h-5 text-slate-800" />
               ) : (
                 <Play className="w-5 h-5 text-slate-800 ml-0.5" />
               )}
             </button>
            
            <button
              onClick={() => setIsMinimized(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-white/50 hover:bg-white/70 rounded-full flex items-center justify-center transition-all"
            >
              <ChevronUp className="w-4 h-4 text-slate-800" />
            </button>
            
            {/* Playing indicator */}
            {isPlaying && (
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
            )}
          </div>
        ) : (
          // Full View
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sf-caption1 font-sf-semibold text-slate-800">Now Playing</span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center transition-all"
              >
                <ChevronDown className="w-4 h-4 text-slate-800" />
              </button>
            </div>

            {/* Track Info */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={track.cover || '/profile.jpg'}
                alt={track.title}
                className="w-12 h-12 rounded-xl object-cover shadow-lg"
                width={48}
                height={48}
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sf-subhead font-sf-semibold text-slate-900 truncate">{track.title}</h4>
                <p className="text-sf-caption1 font-sf-medium text-slate-700 truncate">{track.artist}</p>
              </div>
            </div>



            {/* Controls */}
            <div className="flex items-center justify-center">
              <button
                onClick={togglePlay}
                disabled={isLoading}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg ${
                  isLoading 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <Pause className="w-6 h-6 text-slate-800" />
                ) : (
                  <Play className="w-6 h-6 text-slate-800 ml-0.5" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 