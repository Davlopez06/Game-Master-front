import { ContextState } from '@/context/context';
import './Games.scss';
import useSWR from 'swr';
import { fetchData } from '@/utils/fetchData';
import { useEffect, useState } from 'react';
import Arrow from '@/asets/images/arrow.png';
import Game from './child/Game';
import useWindowSize from '@/utils/useWindowSize';

const Games = () => {
  const { games, getGames } = ContextState();
  const [page, setPage] = useState(1);
  const [numberGames, setNumberGames] = useState(9);
  // eslint-disable-next-line
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/games`, fetchData);
  const { isTablet } = useWindowSize();

  const getGamesCards = () => {
    if (games?.length === 0) return null;

    return games?.slice(numberGames * (page - 1), numberGames * page).map((game, i) => <Game key={`game-${i}`} {...game} />);
  };

  const getTotalPages = (length: number) => {
    if (length % numberGames !== 0) return Math.floor(length / numberGames) + 1;

    return length / numberGames;
  };

  const handleArrow = (direction: string) => {
    if (direction === 'left') setPage(prevPage => prevPage - 1);
    else setPage(prevPage => prevPage + 1);
  };

  const getArrowClass = (direction: string) => {
    if (direction === 'left') {
      if (page <= 1) return 'games-arrow-no-valid';

      return 'games-arrow';
    } else {
      if (page >= getTotalPages(games?.length ?? numberGames)) return 'games-arrow-no-valid';

      return 'games-arrow';
    }
  };

  const getPaginate = () => {
    if (games?.length === 0) return null;

    return (
      <div className="games-paginate">
        <button className={getArrowClass('left')} onClick={() => handleArrow('left')}>
          <img src={Arrow?.src} alt="Arrow" className="arrow-left" />
        </button>
        <div className="games-pages">
          {page} / {getTotalPages(games?.length ?? numberGames)}
        </div>
        <button className={getArrowClass('rigth')} onClick={() => handleArrow('rigth')}>
          <img src={Arrow?.src} alt="Arrow" className="arrow-right" />
        </button>
      </div>
    );
  };

  useEffect(() => {
    getGames(data);
  }, [data]);

  useEffect(() => {
    if (isTablet) setNumberGames(10);
    else setNumberGames(9);
  }, [isTablet]);

  return (
    <div className="games">
      <div className="games-container">{getGamesCards()}</div>
      {getPaginate()}
    </div>
  );
};

export default Games;
