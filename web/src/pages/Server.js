import DoughCard from "../components/DoughCard"
import DrinkCard from "../components/DrinkCard"
import OrderCard from "../components/OrderCard"
import PizzaOrderCard from "../components/PizzaOrderCard"


const Server = () => {
    return (
    <div className="container">
      <div className="row my-2">
        <div className="col-3"><OrderCard /></div>
        <div className="col-3">
          <DrinkCard />
          <DoughCard />
        </div>
        <div className="col-6"><PizzaOrderCard /></div>
      </div>
      
    </div>);
  };
  
  export default Server;