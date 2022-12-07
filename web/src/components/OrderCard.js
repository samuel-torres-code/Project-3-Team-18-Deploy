import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "./OrderCard.css";
import { useEffect, useState } from "react";

/**
 * Converts CamelCase and dash-seperated words into spaced and Capitalized words
 * @param {String} string given string
 * @returns a formatted string
 */
const convertWord = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, `$1 $2`)
    .replace(/-([a-z])/g, (g) => {
      return " " + g.substr(1).toUpperCase();
    })
    .replace(/(^[a-z])/g, (g) => {
      return g.toUpperCase();
    });
};

/**
 * Component for displaying drink counts
 * @param {Object} param0 Object containing the necessary dependencies for the component
 * @returns a div containing the drink counts
 */
const DrinkCountRows = ({ drink_counts }) => {
  return drink_counts.map((drink, index) => {
    return (
      <div key={drink.drink_name + index} className="container">
        <div className="row">
          <div className="col-6">
            <span className="translate">{drink.drink_name}: </span>
          </div>
          <div className="col-2">{drink.drink_count}</div>
        </div>
      </div>
    );
  });
};

/**
 * Component for displaying seasonal items on the order
 * @param {Object} param0 Object containing the necessary dependencies for the component
 * @returns a div containing the seasonal items on the order
 */
const SeasonalItemRows = ({ seasonal_items, handleDeleteSeasonalItem }) => {
  return seasonal_items.map((item, index) => (
    <div key={item.item_name + index} className="row my-2">
      <div className="col-6">
        <p className="my-0"><span className="translate">{item.item_name}</span></p>
        <p className="my-0"> ${item.item_price} </p>
      </div>
      <div className="col-2 "></div>
      <div className="col-2 mx-2">
        <button
          onClick={() => handleDeleteSeasonalItem(index)}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  ));
};

/**
 * Component for displaying the pizzas on the order
 * @param {Object} param0 Object containing the necessary dependencies for the component
 * @returns a div containing the pizzas on the order
 */
const PizzaRows = ({
  pizzas,
  handleDeletePizza,
  handleEditPizza,
  currentPizzaID,
  showAlerts,
}) => {
  return pizzas.map((pizza, index) => (
    <div
      key={pizza.pizza_type + index}
      className={
        pizza.pizza_id === currentPizzaID
          ? `row my-2 selected-pizza py-2`
          : `row my-2 py-2`
      }
    >
      <div className="col-6">
        <p className="text-left my-0"><span className="translate">{`Pizza ${index + 1} `}</span></p>
      </div>
      <div className="col-2 mx-1 ">
        <button
          onClick={() => handleEditPizza(pizza.pizza_id)}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
      </div>
      <div className="col-2 mx-1">
        <button
          onClick={() => handleDeletePizza(pizza.pizza_id)}
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
      <div className="col-12">
        {showAlerts[index] &&
          pizza.pizza_error.split("\n").map((str) => {
            if (str !== "") {
              return (
                <Alert
                  key={str}
                  className="py-1 px-1 my-1 text-left"
                  variant="primary"
                >
                  <span className="translate">{str}</span>
                </Alert>
              );
            }
          })}
        <p className="text-left mb-1"><span className="translate">{`Type: ${convertWord(
          pizza.pizza_type
        )}`} </span></p>

        <p className="text-left mb-1">${pizza.pizza_price}</p>

        {pizza.ingredients.map((ingredient, index) => (
          <p
            key={ingredient.ingredient_name + pizza.pizza_type + index}
            className="text-left my-0"
          >
            <span className="translate">
            {ingredient.ingredient_name}
            </span>
          </p>
        ))}
      </div>
    </div>
  ));
};


/**
 * Component for displaying name and interacting with the order
 * @param {Object} param0 Object containing the necessary dependencies for the component
 * @returns a div containing the name, checkout and cancel buttons
 */
const OrderInfo = ({
  order_info,
  onFormChange,
  handleSubmitName,
  disabled,
  handleCheckout,
  resetPage,
  showOrderAlert,
  orderAlertText,
}) => {
  if (order_info.name === "") {
    return (
      <span className="translate">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Customer's name"
            aria-label="Customer's name"
            aria-describedby="customer-enter-name"
            name="order_name"
            onChange={onFormChange}
          />
          <Button
            onClick={() => handleSubmitName()}
            variant="outline-primary"
            id="customer-enter-name"
          >
            <span className="translate">Start Order</span>
          </Button>
        </InputGroup>
      </span>
    );
  } else {
    return (
      <span className="translate">
        <div className="container">
          <div className="row">
            {showOrderAlert && (
              <Alert className="py-1 px-1 my-1 text-left" variant="primary">
                {orderAlertText}
              </Alert>
            )}
            <div className="col-12">
              <span className="translate">Order Name: {order_info.name}</span>
            </div>
            <div className="col-xs-12 col-md-6 my-1">
              <button
                disabled={disabled}
                className="btn btn-primary"
                onClick={() => handleCheckout()}
              >
                <span className="translate">Checkout</span>
              </button>
            </div>
            <div className="col-xs-12 col-md-6 my-1">
              <button
                disabled={disabled}
                className="btn btn-secondary"
                onClick={() => resetPage()}
              >
                <span className="translate">Cancel</span>
              </button>
            </div>
          </div>
        </div>
      </span>
    );
  }
};

/**
 * Component for displaying order information for the current order
 * @param {Object} param0 Object containing the necessary dependencies for the component
 * @returns a div containing the information for the current order
 */
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
  currentPizzaID,
  disabled,
  handleCheckout,
  resetPage,
  showAlerts,
  showOrderAlert,
  orderAlertText,
}) => {
  const calculatePrice = () => {
    var total_price = 0.0;
    pizzas.forEach((element) => {
      total_price += Number(element.pizza_price);
    });
    drink_counts.forEach((element) => {
      total_price += Number(element.drink_count) * Number(element.drink_price);
    });
    return `$${total_price.toFixed(2)}`;
  };

  return (
    <>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <OrderInfo
              handleCheckout={handleCheckout}
              resetPage={resetPage}
              disabled={disabled}
              handleSubmitName={handleSubmitName}
              onFormChange={onFormChange}
              order_info={order_info}
              showOrderAlert={showOrderAlert}
              orderAlertText={orderAlertText}
            />
          </li>
          <div style={{ maxHeight: "80vh", overflowY: "scroll" }}>
            <li className="list-group-item">
              <strong>
                <span className="translate">Drinks</span>
              </strong>
              <DrinkCountRows drink_counts={drink_counts} />
            </li>
            <li className="list-group-item">
              <strong>
                <span className="translate">Seasonal Items</span>
              </strong>
              <SeasonalItemRows
                handleDeleteSeasonalItem={handleDeleteSeasonalItem}
                seasonal_items={seasonal_items}
              />
            </li>
            <li className="list-group-item">
              <strong>
                <span className="translate">Pizzas</span>
              </strong>
              <PizzaRows
                currentPizzaID={currentPizzaID}
                pizzas={pizzas}
                handleDeletePizza={handleDeletePizza}
                handleEditPizza={handleEditPizza}
                showAlerts={showAlerts}
              />
            </li>
            <li className="list-group-item">
              <strong>
                <span className="translate">Total Price: </span>
                {calculatePrice()}
              </strong>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
};

export default OrderCard;
