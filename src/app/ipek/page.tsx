'use client';

import { useState } from 'react';

export default function IpekPage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    // Viewport boyutları
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Ekranın %15-%55 arasında - dar ama güvenli aralık
    const randomX = viewportWidth * (0.15 + Math.random() * 0.4);
    const randomY = viewportHeight * (0.15 + Math.random() * 0.4);

    console.log('Viewport:', viewportWidth, 'x', viewportHeight);
    console.log('New position:', randomX, randomY);

    setNoButtonPosition({ x: randomX, y: randomY });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50">
          <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Melih İpek&apos;i seviyor mu?
          </h1>

          <div className="flex gap-8 justify-center items-center relative">
            {/* Evet butonu */}
            <button
              className="px-12 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white text-xl font-semibold rounded-full hover:scale-110 hover:shadow-2xl transition-all duration-300 transform hover:rotate-3"
            >
              Evet ❤️
            </button>

            {/* Hayır butonu - kaçan */}
            <button
              onMouseEnter={handleNoHover}
              style={{
                position: noButtonPosition.x !== 0 ? 'fixed' : 'relative',
                left: noButtonPosition.x !== 0 ? `${noButtonPosition.x}px` : 'auto',
                top: noButtonPosition.y !== 0 ? `${noButtonPosition.y}px` : 'auto',
                zIndex: 9999
              }}
              className="px-12 py-4 bg-gradient-to-r from-gray-400 to-gray-600 text-white text-xl font-semibold rounded-full hover:scale-110 hover:shadow-2xl transform"
            >
              Hayır 😢
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
