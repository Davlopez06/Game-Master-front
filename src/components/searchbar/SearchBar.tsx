import Logo from "../logo";
import LogoSearch from '@/asets/images/lupa.png';
import './SearchBar.scss';
import { useState, useRef } from "react";
import useWindowScrollResize from "@/utils/useWindowScrollResize";

const SearchBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const searchbar = useRef<HTMLDivElement>(null);
  
    const verificateVisibility = () => {
      if (searchbar.current) {
        const rect = searchbar.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        setIsVisible(
          (rect.top >= 0 || rect.bottom >= 0) &&
            (rect.top <= windowHeight || rect.bottom <= windowHeight),
        );
      }
    };
  
    const getVisibleClass = (classVisble: string) => {
      if (!isVisible) return 'no-visible-bar';
  
      return classVisble;
    };
  
    useWindowScrollResize(verificateVisibility, searchbar);

    return (
        <div className={getVisibleClass('search-bar')} ref={searchbar}>
            <input className="search-bar-input" type="text" placeholder="Search..." />
            <Logo src={LogoSearch?.src} classNa="logo-search"/>
        </div>
    )
}

export default SearchBar;
