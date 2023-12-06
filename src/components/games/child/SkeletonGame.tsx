import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const SkeletonGame = ({ isTablet = false }) => {
    const [noData,setNoData] = useState(false)

    const Array = isTablet ? ['','','',''] : ['','','']

    const getSkeleton = () => Array.map((_, i) => <div key={`game-skeleton-${i}`} className="game-skeleton"/>)

    useEffect(()=> {
        const timeData = setTimeout(()=> {
            setNoData(true)
        }, 6000)

        return () => clearTimeout(timeData);
    },[])

    if (noData) return <div className='game-no-data'>
        No hay data disponible
    </div>
    
    return getSkeleton()
}

SkeletonGame.propTypes = {
    isTablet: PropTypes.bool,
}

export default SkeletonGame;