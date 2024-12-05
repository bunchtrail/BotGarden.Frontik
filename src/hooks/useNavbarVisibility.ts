
import { useState, useEffect, useRef } from 'react';
import useIsMobile from './useInMobile';

const useNavbarVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) {
        const currentScrollY = window.scrollY;
        const scrollingUp = currentScrollY < lastScrollY.current;

        if (currentScrollY < 100) {
          setIsVisible(true);
        } else {
          setIsVisible(scrollingUp);
        }

        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return isVisible;
};

export default useNavbarVisibility;