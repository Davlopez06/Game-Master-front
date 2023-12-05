import PropTypes from 'prop-types';
import './Logo.scss';

// eslint-disable-next-line
const Logo = ({ src = '', rotate = false, classNa = '', handleClick = () => {} }) => {
  const isRotate = () => {
    if (rotate) return ' logo-rotate';

    return '';
  };

  return <img src={src} alt="Logo" className={`${classNa}${isRotate()}`} onClick={handleClick} />;
};

Logo.propTypes = {
  classNa: PropTypes.string,
  handleClick: PropTypes.func,
  rotate: PropTypes.bool,
  src: PropTypes.string,
};

export default Logo;
