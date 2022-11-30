import { useNavigate } from 'react-router';
import './Home.css';
const Home = () => {
    const navigate = useNavigate();

    return (
      <div >
        <div className="homeContainer container-fluid" >
          <div className="row ">
            <div className="col-sm-12 col-md-1"><img className="smallBackdrop" src={require ('../home_backdrop_small.jpg')} /></div>
          <div className="col-sm-10 col-md-5 py-5">
          <h2>Quality you can taste
          </h2>
          <p>
            Vine-ripened tomato red sauce, antioxidant-rich cherry tomatoes, fresh basil leaves & fresh dough, made in-house daily.
          </p>
          <button onClick={() => navigate('/order')} className="btn btn-primary"> Order Now </button>
          </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  