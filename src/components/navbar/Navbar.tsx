import Logo from '@/components/logo';
import Menu from '@/asets/images/menu.png';
import Back from '@/asets/images/back.png';
import LogoBlack from '@/asets/images/logoblack.png';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ContextState } from '@/context/context';
import { fetchData } from '@/utils/fetchData';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import './Navbar.scss';

const Navbar = ({ isHome = true}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { types, getTypes, getSort, getFilter } = ContextState();
  // eslint-disable-next-line
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/types`, fetchData);
  const router = useRouter();

  const handleSort = (sort: string) => {
    getFilter('');
    getSort(sort);
    setShowMenu(false);
  };

  const handleFilter = (filter: string) => {
    getSort('');
    if (filter === 'All') getFilter('');
    else getFilter(filter);
    setShowMenu(false);
  };

  const getFiters = () => {
    if (types?.length === 0) return null;

    return types?.map((type, i) => {
      return (
        <button key={`slide-menu-item-${i}`} className="slide-menu-item" onClick={() => handleFilter(type.name)}>
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
          <button className="slide-menu-item" onClick={() => handleSort('A-Z')}>
            A - Z
          </button>
          <button className="slide-menu-item" onClick={() => handleSort('Z-A')}>
            Z - A
          </button>
          <button className="slide-menu-item" onClick={() => handleSort('100-0')}>
            100 - 0
          </button>
          <button className="slide-menu-item" onClick={() => handleSort('0-100')}>
            0 - 100
          </button>
        </div>
        <div className="slide-menu-container">
          <p className="slide-menu-title">Filter:</p>
          <button className="slide-menu-item" onClick={() => handleFilter('All')}>
            All
          </button>
          {getFiters()}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getTypes(data);
  }, [data, getTypes]);

  if (!isHome) return <div className="navbar">
  <Logo src={Back?.src} classNa="logo-menu" handleClick={() => router.push('/home')} />
  <div className="logo-container">
    <Logo src={LogoBlack?.src} classNa="logo-black" handleClick={() => router.push('/')} />
  </div>
</div>

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

Navbar.propTypes = {
  isHome: PropTypes.bool,
}

export default Navbar;
