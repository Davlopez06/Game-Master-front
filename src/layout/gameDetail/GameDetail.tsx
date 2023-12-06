import Detail from "@/components/detail";
import Navbar from "@/components/navbar";
import './GameDetail.scss';

const GameDetail = () => {
    return (
        <div className="game-datail">
          <Navbar isHome={false} />
          <Detail />
        </div>
      );
}

export default GameDetail;