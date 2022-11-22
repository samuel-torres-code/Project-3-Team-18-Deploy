import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const UserDrinkRows = ({ drinks, handleDeleteDrink }) => {
  return drinks.map((drink, index) => {
    return (
      <div key={drink.drink_type + index} className="row my-2">
        <div className="col-9">
          <strong className="my-0">{drink.drink_type}</strong>
          <p className="my-0"> ${drink.drink_price} </p>
        </div>
        <div className="col-2 text-end p-0">
          <button
            onClick={() => handleDeleteDrink(index)}
            className="btn btn-primary mx-2">
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
      <div key={item.item_name + index} className="row my-2">
        <div className="col-9">
          <strong className="my-0">{item.item_name}</strong>
          <p className="my-0"> ${item.item_price} </p>
        </div>
        <div className="col-2 text-end p-0">
          <button
            onClick={() => handleDeleteSeasonalItem(index)}
            className="btn btn-primary mx-2">
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
        <div className="col-7">
          <strong className="text-left my-0">{pizza.pizza_type}</strong>
          <p className="text-left mb-1">${pizza.pizza_price}</p>

          {pizza.ingredients?.map((ingredient, index) => (
            <p
              key={ingredient + pizza.pizza_type + index}
              className="text-left my-0">
              {convertWord(ingredient)}
            </p>
          ))}
        </div>
        <div className="col-4 d-flex-inline p-0 text-end">
          <button
            onClick={() => handleEditPizza(index)}
            className="btn btn-primary mx-2 mb-2">
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            onClick={() => handleDeletePizza(index)}
            className="btn btn-primary mx-2 mb-2">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  });
};

const UserOrderCard = ({
  drinks,
  pizzas,
  seasonal_items,
  deleteDrink,
  deleteItem,
  deletePizza,
}) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, [load]);

  function handleEditPizza(index) {
    console.log("Edit pizza:" + index);
    setLoad(true);
  }

  function calculatePrice() {
    var total_price = 0.0;
    pizzas.forEach((pizza) => {
      total_price += Number(pizza.pizza_price);
    });
    drinks.forEach((drink) => {
      total_price += Number(drink.drink_price);
    });
    seasonal_items.forEach((item) => {
      total_price += Number(item.item_price);
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
    <div className="container row">
      <div className="card col-lg-6 col-md-8 col-sm-12 mx-auto p-0">
        <ul className="list-group list-group-flush">
          <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
            <li className="list-group-item drinks">
              <strong className="fs-5">Drinks:</strong>
              <UserDrinkRows
                drinks={drinks}
                handleDeleteDrink={deleteDrink}></UserDrinkRows>
            </li>
            <li className="list-group-item seasonal_items">
              <strong className="fs-5">Seasonal Items:</strong>
              <UserSeasonalItemRows
                seasonal_items={seasonal_items}
                handleDeleteSeasonalItem={deleteItem}></UserSeasonalItemRows>
            </li>
            <li className="list-group-item pizzas">
              <strong className="fs-5">Pizzas:</strong>
              <UserPizzaRows
                pizzas={pizzas}
                handleEditPizza={handleEditPizza}
                handleDeletePizza={deletePizza}></UserPizzaRows>
            </li>
          </div>
        </ul>
        <div className="list-group-item row mx-0 d-flex">
          <div className="col-sm-12 col-lg-6 my-2 fs-5">
            <strong className="align-middle">
              Total Price: ${calculatePrice()}
            </strong>
          </div>
          <div className="col-sm-12 col-lg-6 px-0 text-center my-2 d-flex justify-content-evenly">
            <button className="btn btn-secondary" onClick={resetPage}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderCard;
