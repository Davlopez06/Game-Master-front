import { useState, useEffect } from 'react';
import './LandingPage.scss';
import Logo from '@/components/logo/Logo';
import LogoRotate from '@/asets/images/logo1.png';
import LogoName from '@/asets/images/logo2.png';
import { useRouter } from 'next/router';

const LandingPage = () => {
  const [goHome, setGoHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setGoHome(true);
    }, 4000);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    if (goHome) router.push('/home');
  }, [goHome]);

  return (
    <div className="landingpage">
      <Logo rotate={true} src={LogoRotate?.src} />
      <Logo src={LogoName?.src} />
    </div>
  );
};

export default LandingPage;
