import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const UserDrinkRows = ({ drinks, handleDeleteDrink }) => {
  return drinks.map((drink, index) => {
    return (
      <div key={drink.name + index} className="row my-2">
        <div className="col-10">
          <p className="my-0">{drink.name}</p>
          <p className="my-0"> {drink.price} </p>
        </div>
        <div className="col-2">
          <button
            onClick={() => handleDeleteDrink(index)}
            className="btn btn-primary">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  });
};

const UserSeasonalItemRows = ({ seasonal_items, handleDeleteSeasonalItem }) => {
  return seasonal_items.map((item, index) => {
    return (
      <div key={item.name + index} className="row my-2">
        <div className="col-10">
          <p className="my-0">{item.name}</p>
          <p className="my-0"> {item.price} </p>
        </div>
        <div className="col-2">
          <button
            onClick={() => handleDeleteSeasonalItem(index)}
            className="btn btn-primary">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  });
};

const UserPizzaRows = ({ pizzas, handleEditPizza, handleDeletePizza }) => {
  const convertWord = (str) => {
    return str.replace(/([a-z])([A-Z])/g, `$1 $2`);
  };

  return pizzas.map((pizza, index) => {
    return (
      <div key={pizza.pizza_type + index} className="row my-2">
        <div className="col-8">
          <p className="text-left my-0">{pizza.type}</p>
          <p className="text-left mb-1">${pizza.price}</p>

          {pizza.ingredients?.map((ingredient, index) => (
            <p key={ingredient + pizza.type + index} className="text-left my-0">
              {convertWord(ingredient)}
            </p>
          ))}
        </div>
        <div className="col-2">
          <button
            onClick={() => handleEditPizza(index)}
            className="btn btn-primary">
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
        <div className="col-2">
          <button
            onClick={() => handleDeletePizza(index)}
            className="btn btn-primary">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  });
};

const UserOrderCard = ({ drinks, pizzas, seasonal_items }) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, [load]);

  function handleDeleteDrink(index) {
    drinks.splice(index, 1);
    setLoad(true);
  }

  function handleDeleteSeasonalItem(index) {
    seasonal_items.splice(index, 1);
    setLoad(true);
  }

  function handleEditPizza(index) {
    console.log("Edit pizza:" + index);
    setLoad(true);
  }

  function handleDeletePizza(index) {
    pizzas.splice(index, 1);
    setLoad(true);
  }

  function calculatePrice() {
    var total_price = 0.0;
    pizzas.forEach((element) => {
      total_price += Number(element.price);
    });
    drinks.forEach((element) => {
      total_price += Number(element.price);
    });
    seasonal_items.forEach((element) => {
      total_price += Number(element.price);
    });
    return `${total_price.toFixed(2)}`;
  }

  function handleCheckout() {
    alert("Checkout");
  }

  function resetPage() {
    console.log("RESET");
  }

  return (
    <div className="container w-50">
      <div className="card">
        <ul className="list-group list-group-flush">
          <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <li className="list-group-item drinks">
              <strong>Drinks:</strong>
              <UserDrinkRows
                drinks={drinks}
                handleDeleteDrink={handleDeleteDrink}></UserDrinkRows>
            </li>
            <li className="list-group-item seasonal_items">
              <strong>Seasonal Items:</strong>
              <UserSeasonalItemRows
                seasonal_items={seasonal_items}
                handleDeleteSeasonalItem={
                  handleDeleteSeasonalItem
                }></UserSeasonalItemRows>
            </li>
            <li className="list-group-item pizzas">
              <strong>Pizzas:</strong>
              <UserPizzaRows
                pizzas={pizzas}
                handleEditPizza={handleEditPizza}
                handleDeletePizza={handleDeletePizza}></UserPizzaRows>
            </li>
            <li className="list-group-item">
              <div className="col-6">
                <strong>Total Price: ${calculatePrice()}</strong>
              </div>
              <div className="col-3">
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-secondary" onClick={resetPage}>
                  Cancel
                </button>
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserOrderCard;
