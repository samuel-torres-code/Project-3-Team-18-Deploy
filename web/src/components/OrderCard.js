import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import  InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DrinkCountRows = ({ drink_counts }) => {
  
  return drink_counts.map((drink, index) => {
      return <p key={drink.drink_name + index} className="my-0">
      {drink.drink_name} Drink: {drink.drink_count}
      </p>
    
    
});
};

const SeasonalItemRows = ({ seasonal_items, handleDeleteSeasonalItem }) => {
  return seasonal_items.map((item, index) => (
    <div key={item.item_name + index} className="row my-2">
      <div className="col-8">
        <p className="my-0">{item.item_name}</p>
        <p className="my-0"> {item.item_price} </p>
      </div>
      <div className="col-2">
      </div>
      <div className="col-2">
        <button onClick={()=>handleDeleteSeasonalItem(index)} className="btn btn-primary">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ));
};

const PizzaRows = ({ pizzas, handleDeletePizza, handleEditPizza, currentPizzaID }) => {
  return pizzas.map((pizza, index) => (
    <div key={pizza.pizza_type + index} className="row my-2">
      <div className="col-8">

        <p className="text-left my-0">
          {pizza.pizza_id === currentPizzaID ?
           <strong>{pizza.pizza_type}</strong>:
           <>{pizza.pizza_type}</>
          }
          
          </p>
          <p className="text-left mb-1">
          {pizza.pizza_price}
          </p>
       
        {pizza.ingredients.map((ingredient, index) => (
          <p
            key={ingredient.ingredient_name + pizza.pizza_type + index}
            className="text-left my-0"
          >
            {ingredient.ingredient_name}
          </p>
        ))}
      </div>
      <div className="col-2">
        <button onClick={() => handleEditPizza(pizza.pizza_id)} className="btn btn-primary">
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </div>
      <div className="col-2">
        <button onClick={() => handleDeletePizza(pizza.pizza_id)} className="btn btn-primary">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ));
};

const OrderInfo = ({order_info, onFormChange, handleSubmitName}) => {
  if (order_info.name === "") {
    return (<InputGroup className="mb-3">
              <Form.Control
                placeholder="Customer's name"
                aria-label="Customer's name"
                aria-describedby="customer-enter-name"
                name="order_name"
                onChange={onFormChange}
              />
              <Button onClick={() => handleSubmitName()} variant="outline-primary" id="customer-enter-name">
                Start Order
              </Button>
          </InputGroup>
    )
  }
  else {
    return (<strong>Order Name: {order_info.name}</strong>)
  }

}

const OrderCard = ({
  order_info,
  pizzas,
  seasonal_items,
  drink_counts,
  onFormChange,
  handleEditPizza,
  handleDeletePizza,
  handleDeleteSeasonalItem,
  handleSubmitName,
  currentPizzaID
}) => {
  
  const calculatePrice = () => {
    var total_price = 0.00
    pizzas.forEach(element => {
      total_price += Number(element.pizza_price)
    });
    drink_counts.forEach(element => {
      total_price += Number(element.drink_count) * Number(element.drink_price)
    })
    return `$${total_price.toFixed(2)}`
  }
  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <OrderInfo handleSubmitName={handleSubmitName} onFormChange={onFormChange} order_info = {order_info}/>
          </li>
          <div style={{maxHeight: '80vh', overflowY:'scroll'}} >
          <li className="list-group-item">
          <strong>Drink:</strong>
            <DrinkCountRows drink_counts={drink_counts} />
          </li>
          <li className="list-group-item" >
          <strong>Seasonal Item:</strong>
            <SeasonalItemRows handleDeleteSeasonalItem={handleDeleteSeasonalItem} seasonal_items={seasonal_items} />
          </li>
          <li className="list-group-item">
            <strong>Pizza:</strong>
            <PizzaRows currentPizzaID={currentPizzaID} pizzas={pizzas} handleDeletePizza={handleDeletePizza} handleEditPizza={handleEditPizza}/>
          </li>
          <li className="list-group-item">
            <strong>Total Price: {calculatePrice()}</strong>
            
          </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default OrderCard;
