import { useState, useEffect } from 'react';

export default function useWindowSize() {
  const initialWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const [windowWidth, setWindowWidth] = useState(initialWidth);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
    };

    if (typeof window !== 'undefined')
      window.addEventListener('resize', handleResize);

    return () => {
      if (typeof window !== 'undefined')
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth < 578 ? true : false;
  const isTablet = windowWidth >= 578 && windowWidth < 992 ? true : false;
  const isDesktop = windowWidth >= 992 ? true : false;

  return { isMobile, isTablet, isDesktop };
}