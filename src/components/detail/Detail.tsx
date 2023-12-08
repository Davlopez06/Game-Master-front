import { useRouter } from 'next/router';
import './Detail.scss';
import { ContextState } from '@/context/context';
import useSWR from 'swr';
import { fetchData } from '@/utils/fetchData';
import { useEffect, useRef, useState } from 'react';

const Detail = () => {
  const { game, getGame } = ContextState();
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [padding, setPadding] = useState('12px');
  const [width, setWidth] = useState('0px');
  const { id } = router.query;
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, fetchData);
  const container = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);

  const handleClickOutside = (event: any) => {
    if (container.current && !container.current.contains(event.target)) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };

  const getIsClicked = () => {
    if (!clicked) return '';

    return ' clicked';
  };

  const getRatingPercent = () => {
    if (clicked) setWidth(`${(game?.[0]?.rating * 100) / 5}%`);
    else setWidth('0%');
  };

  const getSubItem = (array: [] | string[]) => array?.map(item => <p key={item}>{item}</p>);

  const getClickedContet = () => {
    return (
      <div className="game-detail-info">
        <div className="game-detail-item">
          <h5>Name:</h5>
          <p>{game?.[0]?.name}</p>
        </div>
        <div className="game-detail-item">
          <h5>Summary:</h5>
          <p>{game?.[0]?.description}</p>
        </div>
        <div className="game-detail-item">
          <h5>Date:</h5>
          <p>{game?.[0]?.fecha}</p>
        </div>
        <div className="game-detail-item">
          <h5>Rating:</h5>
          <div className="game-detail-bar">
            <div className="game-detail-color" style={{ width: width }} />
          </div>
        </div>
        <div className="game-detail-item">
          <h5>Platforms:</h5>
          <div className="game-detail-subitem">{getSubItem(game?.[0]?.plataformas)}</div>
        </div>
        <div className="game-detail-item">
          <h5>Genders:</h5>
          <div className="game-detail-subitem">{getSubItem(game?.[0]?.generos)}</div>
        </div>
      </div>
    );
  };

  const getStyleDetail = () => {
    const padding = img?.current?.clientHeight ?? 0;
    if (clicked && img) setPadding(`${padding / 2 + 12}px`);
    else setPadding('12px');
  };

  const handleDelete = async () => {
    const responde = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/games/${id}`, {
      method: 'DELETE',
    });

    router.push('/home');
  };

  const getDeleteButton = () => {
    if (game?.[0]?.id < 10000000) return null;

    return (
      <button className="delete-button" onClick={handleDelete}>
        Delete Game
      </button>
    );
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getGame(data);
  }, [data]);

  useEffect(() => {
    getStyleDetail();

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', getStyleDetail);

      return () => {
        window.removeEventListener('resize', getStyleDetail);
      };
    }
  }, [img, clicked]);

  useEffect(() => {
    setTimeout(() => {
      getRatingPercent();
    }, 1000);
  }, [game, clicked]);

  if (Object?.keys(game ?? {})?.includes('error') || !data || error)
    return (
      <div className="detail">
        <div className="detail-container-error">No existe este juego</div>;
      </div>
    );

  return (
    <div className="detail" style={{ paddingTop: padding }}>
      <div className={`detail-container${getIsClicked()}`} ref={container}>
        <img className="game-detail-img" src={game?.[0]?.img} alt={game?.[0]?.name} ref={img} />
        {getClickedContet()}
        {getDeleteButton()}
      </div>
    </div>
  );
};

export default Detail;
