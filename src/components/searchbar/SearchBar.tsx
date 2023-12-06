import Logo from "../logo";
import LogoSearch from '@/asets/images/lupa.png';
import './SearchBar.scss';
import { useState, useRef, useEffect } from "react";
import useWindowScrollResize from "@/utils/useWindowScrollResize";
import useSWR from "swr";
import { fetchData } from "@/utils/fetchData";
import { ContextState } from "@/context/context";

const SearchBar = () => {
  const { getGames } = ContextState()
    const [isVisible, setIsVisible] = useState(false);
    const [inputText,setInputText] = useState('')
    const searchbar = useRef<HTMLDivElement>(null);
    const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/games?name=${inputText}`, fetchData);
  
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

    const handleChange = (e: any) => {
      setInputText(e.target.value)
    }

    useEffect(()=> {
      getGames(data);
    },[data])
  
    useWindowScrollResize(verificateVisibility, searchbar);

    return (
        <div className={getVisibleClass('search-bar')} ref={searchbar}>
            <input className="search-bar-input" type="text" placeholder="Search..." value={inputText} onChange={handleChange} />
            <Logo src={LogoSearch?.src} classNa="logo-search"/>
        </div>
    )
}

export default SearchBar;
