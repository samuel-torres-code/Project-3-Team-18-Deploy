import { useEffect, useState } from "react";
import axios from "axios";
import AddItemCard from "../components/AddItemCard";
import UserOrderCard from "../components/UserOrderCard";
import { API_URL } from "../API";
import { getItemTypes, postOrder } from "../api/ServerAPI";
import useMenu from "../hooks/useMenu";
import useOrder from "../hooks/useOrder";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [loadMenu, setLoadMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(false);

  const {
    orderLoading,
    orderError,
    order,
    setOrderName,
    addNewPizza,
    updatePizza,
    deletePizza,
    addDrink,
    addItem,
    deleteItem,
    deleteDrink,
  } = useOrder([]);
  const { menuLoading, menuError, itemTypes } = useMenu([]);

  const navigate = useNavigate();
  const client = axios.create({
    baseURL: API_URL,
  });

  useEffect(() => {
    setOrderName(localStorage.getItem("user"));
  }, []);

  function handleSwitchTab(event) {
    if (event.target.value === "Menu") {
      setLoadMenu(true);
    } else if (event.target.value === "Cart") {
      setLoadMenu(false);
    }
  }

  function handleAddPizzaClick() {
    navigate("/pizza");
  }

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
        }}>
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
              Menu
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
              Current Order
            </button>
          </li>
        </ul>
        {showAlert ? (
          <Alert
            variant="primary"
            onClose={() => setShowAlert(false)}
            dismissible>
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
            addPizzaFunction={handleAddPizzaClick}></AddItemCard>
        ) : (
          <UserOrderCard
            drinks={order.drinks}
            pizzas={order.pizzas}
            seasonal_items={order.seasonal_items}
            deleteDrink={deleteDrink}
            deleteItem={deleteItem}
            deletePizza={deletePizza}></UserOrderCard>
        )}
      </div>
    );
  }
};

export default Order;
