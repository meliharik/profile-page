'use client';

import { useState } from 'react';

export default function IpekPage() {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [showText, setShowText] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  // Sırasıyla gösterilecek metinler
  const texts = [
    "Sevgilim, son zamanlarda hayat yoğunluğumuzun artmasından dolayı birbirimize eskisi kadar çok vakit ayıramadığımızın farkındayım. Emin ol bu durumdan ben de çok rahatsızım, ama hayat bu. Mutlaka bunu da atlatacagiz. Buradayken geçirdiğimiz her bir an o kadar değerliymiş ki anlatamam.",
    "Seni gerçekten çok özlüyorum. Burada hangi sokaktan geçtiysek, gözümde tutuyor. Meydanda el ele tutuşarak yürümemiz, Hesburger'de göl kenarında yemek yiyişimiz, Raatuse'de çamaşır yıkayışımız bile! Seni tüm hücrelerime kadar özlüyorum. Şu anda sana sarılmak için neler vermezdim. Seninle sarılıp uyumak için... Neyse gece gece duygusallaştım yine.",
    "Tek bildiğim iyi ki varsın. Seni çok seviyorum. 78. günümüz kutlu olsun. Bu arada unutmadan söyleyeyim, ben Türkiye'ye geldiğimde annem seni bir pazar günü yemeğe davet etmek istiyor haberin olsun ;)))"
  ];

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

  const handleYesClick = () => {
    setShowConfetti(true);
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
        {!showConfetti ? (
          <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50">
            <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Melih İpek&apos;i seviyor mu?
            </h1>

            <div className="flex gap-8 justify-center items-center relative">
              {/* Evet butonu */}
              <button
                onClick={handleYesClick}
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
        ) : (
          <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50">
            {!showText ? (
              <div className="animate-bounce">
                <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 bg-clip-text text-transparent">
                  Biliyordum! ❤️
                </h1>
                <p className="text-2xl text-gray-900 mb-6 font-semibold">
                  Evet, Melih İpek&apos;i çok seviyor! 💕
                </p>
                <div className="text-6xl animate-pulse mb-8">
                  💖 ✨ 🌟 💫 ⭐
                </div>
                <button
                  onClick={() => setShowText(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-700 to-pink-700 text-gray-100 text-xl font-bold rounded-full hover:scale-110 hover:shadow-2xl transition-all duration-300 transform shadow-lg"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  Metni Gör 💌
                </button>
              </div>
            ) : (
              <div className="max-w-2xl">
                <div className="text-xl text-gray-900 mb-8 leading-relaxed font-medium">
                  {texts[textIndex]}
                </div>
                {textIndex < texts.length - 1 && (
                  <button
                    onClick={() => setTextIndex(textIndex + 1)}
                    className="px-10 py-4 bg-gradient-to-r from-blue-700 to-purple-800 text-gray-100 text-xl font-bold rounded-full hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                  >
                    Devam Et →
                  </button>
                )}
                {textIndex === texts.length - 1 && (
                  <div className="text-6xl animate-pulse mt-4">
                    ❤️ 💕 ❤️
                  </div>
                )}
              </div>
            )}
          </div>
        )}
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
