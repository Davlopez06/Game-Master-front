import PropTypes from 'prop-types';
import './Logo.scss';

const Logo = ({ src = '', rotate = false }) => {
  const isRotate = () => {
    if (rotate) return ' logo-rotate';

    return '';
  };

  return <img src={src} alt="Logo" className={`logo${isRotate()}`} />;
};

Logo.propTypes = {
  src: PropTypes.string,
  rotate: PropTypes.bool,
};

export default Logo;
