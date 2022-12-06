import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const UserPizzaRows = ({
  pizzas,
  handleEditPizza,
  handleDeletePizza,
  ingredient_dict,
}) => {
  const convertWord = (str) => {
    return str.replace(/([a-z])([A-Z])/g, `$1 $2`);
  };

  return pizzas.map((pizza, index) => {
    return (
      <span className="translate">
        <div key={pizza.pizza_type + index} className="row my-2">
          <div className="col-7">
            <strong className="text-left my-0">{pizza.pizza_type}</strong>
            <p className="text-left mb-1">${pizza.pizza_price}</p>

            {pizza.ingredients?.map((ingredient, index) => (
              <p
                key={ingredient + pizza.pizza_type + index}
                className="text-left my-0">
                {convertWord(
                  ingredient_dict[ingredient.ingredient_id].ingredient_name
                )}
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
      </span>
    );
  });
};

const UserSeasonalItemRows = ({ seasonal_items, handleDeleteSeasonalItem }) => {
  return seasonal_items.map((item, index) => {
    return (
      <span className="translate">
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
      </span>
    );
  });
};

const UserDrinkRows = ({ drinks, handleDeleteDrink }) => {
  return drinks.map((drink, index) => {
    return (
      <span className="translate">
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
      </span>
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
  editPizza,
  handleResetPage,
  handleCheckout,
  ingredients_by_type,
}) => {
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, [load]);

  // function handleEditPizza(index) {
  //   console.log("Edit pizza:" + index);
  //   setLoad(true);
  // }

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

  return (
    <span className="translate">
      <div className="container row mx-auto">
        <div className="card col-lg-6 col-md-8 col-sm-12 mx-auto p-0">
          <ul className="list-group list-group-flush">
            <div style={{ maxHeight: "65vh", overflowY: "auto" }}>
              <li className="list-group-item pizzas">
                <strong className="fs-5">
                  <span className="translate">Pizzas:</span>
                </strong>
                <UserPizzaRows
                  pizzas={pizzas}
                  handleEditPizza={editPizza}
                  handleDeletePizza={deletePizza}
                  ingredient_dict={Object.values(ingredients_by_type)
                    .flat()
                    .reduce(function (map, obj) {
                      map[obj.ingredient_id] = obj;
                      return map;
                    }, {})}></UserPizzaRows>
              </li>
              <li className="list-group-item seasonal_items">
                <strong className="fs-5">
                  <span className="translate">Seasonal Items:</span>
                </strong>
                <UserSeasonalItemRows
                  seasonal_items={seasonal_items}
                  handleDeleteSeasonalItem={deleteItem}></UserSeasonalItemRows>
              </li>
              <li className="list-group-item drinks">
                <strong className="fs-5">
                  <span className="translate">Drinks:</span>
                </strong>
                <UserDrinkRows
                  drinks={drinks}
                  handleDeleteDrink={deleteDrink}></UserDrinkRows>
              </li>
            </div>
          </ul>
          <div className="list-group-item row mx-0 d-flex">
            <div className="col-sm-12 col-lg-6 my-2 fs-5">
              <strong className="align-middle">
                <span className="translate">
                  Total Price: ${calculatePrice()}
                </span>
              </strong>
            </div>
            <div className="col-sm-12 col-lg-6 px-0 text-center my-2 d-flex justify-content-evenly">
              <button className="btn btn-secondary" onClick={handleResetPage}>
                <span className="translate">Cancel</span>
              </button>
              <button className="btn btn-primary" onClick={handleCheckout}>
                <span className="translate">Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </span>
  );
};

export default UserOrderCard;
