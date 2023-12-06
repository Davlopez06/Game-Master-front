import useWindowScrollResize from '@/utils/useWindowScrollResize';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const Game = ({
  _id = '',
  name = '',
  rating = 0,
  img = '',
}) => {
  const [width, setWidth] = useState('0px');
  const [isVisible, setIsVisible] = useState(false);
  const card = useRef<HTMLButtonElement>(null);
  const router = useRouter()

  const verificateVisibility = () => {
    if (card.current) {
      const rect = card.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      setIsVisible((rect.top >= 0 || rect.bottom >= 0) && (rect.top <= windowHeight || rect.bottom <= windowHeight));
    }
  };

  const getVisibleClass = (classVisble: string) => {
    if (!isVisible) return 'no-visible-card';

    return classVisble;
  };

  const getRatingPercent = () => {
    setWidth(`${(rating * 100) / 5}%`);
  };

  const handleGame = () => {
    router.push('/game/' + _id)
  }
  useWindowScrollResize(verificateVisibility, card);

  useEffect(() => {
    setTimeout(() => {
      getRatingPercent();
    }, 1000);
  }, [rating]);
  return (
    <button className={`${getVisibleClass('card')}`} ref={card} onClick={handleGame}>
      <img src={img} alt={name} className="card-img" />
      <h5 className="card-title">{name}</h5>
      <div className="card-rating">
        <p className="card-rating-text">Rating:</p>
        <div className="card-rating-bar">
          <div className="card-rating-color" style={{ width: width }} />
        </div>
      </div>
    </button>
  );
};

Game.propTypes = {
  _id: PropTypes.string,
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  fecha: PropTypes.string,
  rating: PropTypes.number,
  plataformas: PropTypes.array,
  generos: PropTypes.array,
  img: PropTypes.string,
  __v: PropTypes.number,
};

export default Game;
