import { getIngredientsByType } from '../api/ServerAPI'

const Home = () => {
    getIngredientsByType()
    return <h1>Home</h1>;
  };
  
  export default Home;
  