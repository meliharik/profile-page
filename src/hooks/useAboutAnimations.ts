import { useEffect, useRef, useState } from 'react';
import { annotate } from 'rough-notation';

export const useAboutAnimations = (activeSection: string) => {
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const [animationsStarted, setAnimationsStarted] = useState(false);

  useEffect(() => {
    if (activeSection === 'about' && aboutTextRef.current && !animationsStarted) {
      const timer = setTimeout(() => {
        // Technology highlights için elementleri bul
        const techElements = aboutTextRef.current?.querySelectorAll('.highlight-tech');
        const availabilityElement = aboutTextRef.current?.querySelector('.availability-highlight');

        if (techElements && techElements.length > 0) {
          // Tech highlights oluştur - CSS animasyonlu
          const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#06B6D4']; // blue, emerald, purple, amber, cyan
          
          Array.from(techElements).forEach((element, index) => {
            const htmlElement = element as HTMLElement;
            const color = colors[index % colors.length];
            
            // CSS animasyonu ile düzgün highlight
            setTimeout(() => {
              htmlElement.style.background = `linear-gradient(120deg, ${color}40 0%, ${color}40 100%)`;
              htmlElement.style.backgroundSize = '0% 100%';
              htmlElement.style.backgroundRepeat = 'no-repeat';
              htmlElement.style.backgroundPosition = 'left center';
              htmlElement.style.transition = 'background-size 600ms ease-in-out';
              htmlElement.style.borderRadius = '4px';
              htmlElement.style.padding = '2px 4px';
              
              // Animasyonu başlat
              setTimeout(() => {
                htmlElement.style.backgroundSize = '100% 100%';
              }, 50);
            }, index * 300); // Delay artırıldı - daha uzun aralıklarla
          });

          // Availability highlight oluştur
          let availabilityAnnotation;
          if (availabilityElement) {
            availabilityAnnotation = annotate(availabilityElement as HTMLElement, {
              type: 'box',
              color: '#10B981', // softer emerald
              animationDuration: 800,
              strokeWidth: 2,
              padding: 6,
              iterations: 1
            });
          }

          // Availability animasyonunu başlat - tech highlights bittikten sonra
          if (availabilityAnnotation) {
            setTimeout(() => {
              availabilityAnnotation.show();
              setAnimationsStarted(true);
            }, 2800); // 4*300ms(delays) + 600ms(duration) + 1200ms(extra buffer) = 2800ms
          } else {
            setAnimationsStarted(true);
          }
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [activeSection, animationsStarted]);

  // About dışında bir section'a geçilirse animasyon state'ini reset et
  useEffect(() => {
    if (activeSection !== 'about') {
      setAnimationsStarted(false);
    }
  }, [activeSection]);

  return { aboutTextRef, animationsStarted };
}; 