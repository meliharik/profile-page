import { useEffect, useRef, useState } from 'react';

export const useHeaderVisibility = (activeSection: string) => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [showHeaderProfile, setShowHeaderProfile] = useState(false);

  // Hero section görünürlüğünü takip et - tamamen kaybolunca header profil göster
  useEffect(() => {
    if (activeSection !== 'about' || !heroSectionRef.current) {
      setShowHeaderProfile(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hero section tamamen ekrandan çıkınca (isIntersecting false) header profil göster
        setShowHeaderProfile(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0 // Hero section tamamen kaybolunca tetikle
      }
    );

    observer.observe(heroSectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [activeSection]);

  return { heroSectionRef, showHeaderProfile };
}; 