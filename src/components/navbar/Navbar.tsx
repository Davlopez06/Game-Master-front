import Logo from '@/components/logo';
import Menu from '@/asets/images/menu.png';
import LogoBlack from '@/asets/images/logoblack.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ContextState } from '@/context/context';
import { fetchData } from '@/utils/fetchData';
import useSWR from 'swr';
import './Navbar.scss';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { types, getTypes } = ContextState();
  // eslint-disable-next-line
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/types`, fetchData);
  const router = useRouter();

  const getFiters = () => {
    if (types?.length === 0) return null;

    return types?.map((type, i) => {
      return (
        <button key={`slide-menu-item-${i}`} className="slide-menu-item">
          {type.name}
        </button>
      );
    });
  };

  const getMenu = () => {
    const isShow = showMenu ? ' show' : '';

    return (
      <div className={`slide-menu${isShow}`}>
        <div className="slide-menu-container">
          <button className="slide-menu-item">Create game</button>
        </div>
        <div className="slide-menu-container">
          <p className="slide-menu-title">Sort:</p>
          <button className="slide-menu-item">A-Z</button>
          <button className="slide-menu-item">Z-A</button>
        </div>
        <div className="slide-menu-container">
          <p className="slide-menu-title">Filter:</p>
          <button className="slide-menu-item">All</button>
          {getFiters()}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getTypes(data);
  }, [data, getTypes]);

  return (
    <div className="navbar">
      <Logo src={Menu?.src} classNa="logo-menu" handleClick={() => setShowMenu(!showMenu)} />
      <div className="logo-container">
        <Logo src={LogoBlack?.src} classNa="logo-black" handleClick={() => router.push('/')} />
      </div>
      {getMenu()}
    </div>
  );
};

export default Navbar;
