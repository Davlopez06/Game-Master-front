import Navbar from '@/components/navbar';
import './Home.scss';
import Searchbar from '@/components/searchbar';
import Games from '@/components/games';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Searchbar />
      <Games />
    </div>
  );
};

export default Home;
