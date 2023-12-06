import { useEffect } from 'react';

export default function useWindowScrollResize(funtion: any, variable: any) {
  useEffect(() => {
    window.addEventListener('scroll', funtion);
    window.addEventListener('resize', funtion);
    funtion(); // Verificar la visibilidad inicial al cargar el componente

    return () => {
      window.removeEventListener('scroll', funtion);
      window.removeEventListener('resize', funtion);
    };
  }, [funtion, variable]);
}