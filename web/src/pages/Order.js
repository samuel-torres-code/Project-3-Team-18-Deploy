import { useEffect, useState } from "react";
import AddItemCard from "../components/AddItemCard";
import UserOrderCard from "../components/UserOrderCard";
import { postOrderAsync } from "../api/ServerAPI";
import useMenu from "../hooks/useMenu";
import useOrder from "../hooks/useOrder";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [loadMenu, setLoadMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");

  const {
    orderLoading,
    orderError,
    order,
    setOrderName,
    addNewPizza,
    deletePizza,
    addDrink,
    addItem,
    deleteItem,
    deleteDrink,
    clearOrder,
  } = useOrder([]);
  const { menuLoading, menuError, itemTypes, ingredients_by_type } = useMenu(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!orderLoading) {
      if (localStorage.getItem("user") !== null) {
        setOrderName(localStorage.getItem("user"));
      } else {
        setOrderName("Guest");
      }
    }
  }, [orderLoading]);

  /**
   * Switches the active tab on the page.
   * @param {event} event
   */
  function handleSwitchTab(event) {
    if (event.target.value === "Menu") {
      setLoadMenu(true);
    } else if (event.target.value === "Cart") {
      setLoadMenu(false);
    }
  }

  /**
   * Redirects user to the pizza route to add a pizza.
   */
  function handleAddPizzaClick() {
    addNewPizza();
    navigate(`/pizza`);
  }

  /**
   * Redirects user to the pizza route with a specified index of pizza to edit.
   * @param {int} index
   */
  function handleEditPizzaClick(index) {
    navigate(`/pizza?index=${index}`);
    console.log("Edit Pizza " + index);
  }

  /**
   * Adds a drink to the order and alerts the user.
   * @param {event} event
   */
  function handleAddDrinkClick(event) {
    addDrink(
      itemTypes.drink_types.find(
        (drink) => drink.drink_type === event.target.value
      )
    );

    setAlertText(`Added ${event.target.value} Drink to Order!`);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  /**
   * Adds an item to the order and alerts the user.
   * @param {event} event
   */
  function handleAddItemClick(event) {
    addItem(
      itemTypes.seasonal_item_types.find(
        (item) => item.item_name === event.target.dataset.user
      )
    );

    setAlertText(`Added ${event.target.dataset.user} to Order!`);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  /**
   * Checks the user out and redirects them to the pickup order page.
   */
  function handleCheckout() {
    if (
      order.drinks.length > 0 ||
      order.pizzas.length > 0 ||
      order.seasonal_items.length > 0
    ) {
      postOrderAsync(order).then(() => {
        localStorage.removeItem("order");
        setTimeout(() => {
          navigate("/pickup");
        }, 50);
      });
    } else {
      console.error("No items selected in order");
    }
  }

  if (menuError || orderError) {
    return (
      <div>
        <p>Menu Error: {menuError}</p>
        <p>Order Error: {orderError}</p>
      </div>
    );
  } else if (menuLoading || orderLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("../loader_pizza.gif")}
          alt="Loading"
          style={{ width: "15vw", height: "auto" }}
        />
      </div>
    );
  } else {
    return (
      <div className="container">
        <ul className="nav nav-tabs justify-content-center my-3">
          <li className="nav-item">
            <button
              className={
                loadMenu
                  ? "nav-link fw-bolder fs-5 active link-primary"
                  : "nav-link fw-bolder fs-5 link-secondary"
              }
              value="Menu"
              aria-current="page"
              onClick={handleSwitchTab}>
              <span
                className="translate mx-3"
                style={{ pointerEvents: "none" }}
              >
                Menu
              </span>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                loadMenu
                  ? "nav-link fw-bolder fs-5 link-secondary"
                  : "nav-link fw-bolder fs-5 active link-primary"
              }
              value="Cart"
              onClick={handleSwitchTab}>
              <span
                className="translate mx-3"
                style={{ pointerEvents: "none" }}
              >
                Current Order
              </span>
            </button>
          </li>
        </ul>
        {showAlert ? (
          <Alert
            variant="primary"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertText}
          </Alert>
        ) : (
          // add spacing for alert
          <div style={{ height: "58px" }}></div>
        )}
        {loadMenu ? (
          <AddItemCard
            seasonalItems={itemTypes.seasonal_item_types}
            drinkFunction={handleAddDrinkClick}
            itemButtonFunction={handleAddItemClick}
            addPizzaFunction={handleAddPizzaClick}
          ></AddItemCard>
        ) : (
          <UserOrderCard
            drinks={order.drinks}
            pizzas={order.pizzas}
            seasonal_items={order.seasonal_items}
            deleteDrink={deleteDrink}
            deleteItem={deleteItem}
            deletePizza={deletePizza}
            editPizza={handleEditPizzaClick}
            handleCheckout={handleCheckout}
            handleResetPage={clearOrder}
            ingredients_by_type={ingredients_by_type}
          ></UserOrderCard>
        )}
      </div>
    );
  }
};

export default Order;
