import { useState, useEffect } from "react";
// import ItemButton from "../components/ItemButton";
import axios from "axios";
import AddItemCard from "../components/AddItemCard";
import UserOrderCard from "../components/UserOrderCard";

const Order = () => {
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [loadMenu, setLoadMenu] = useState(false);
  const [pizzasOnOrder, setPizzasOnOrder] = useState([
    {
      pizza_type: "one-topping",
      pizza_price: "12.99",
      ingredients: ["Pepperoni", "Dough"],
    },
    {
      pizza_type: "build-your-own",
      pizza_price: "4.50",
      ingredients: ["Dough", "Red", "Oregano", "House Blend"],
    },
  ]);
  const [itemsOnOrder, setItemsOnOrder] = useState([
    {
      item_name: "chicken wings",
      item_price: "12.99",
    },
  ]);
  const [drinksOnOrder, setDrinksOnOrder] = useState([
    { drink_name: "Fountain", drink_price: "2.39" },
    { drink_name: "Bottle", drink_price: "2.79" },
  ]);

  const client = axios.create({
    baseURL: "http://localhost:2000",
  });

  useEffect(() => {
    loadSeasonalItems();
  }, []);

  function loadSeasonalItems() {
    client.get("/api/manager/load_prices").then((res) => {
      const items = [];
      for (var i = 0; i < res.data["seasonal_items"].length; i++) {
        items.push(res.data["seasonal_items"][i]["item_name"]);
      }
      setSeasonalItems(items);
    });
  }

  const buttonClick = (event) => {
    alert(event.target.key);
  };

  function handleSwitchTab(event) {
    if (event.target.value === "Menu") {
      setLoadMenu(true);
    } else if (event.target.value === "Cart") {
      setLoadMenu(false);
    }
  }

  function handleAddPizzaClick() {
    alert("Add Pizza");
  }

  function handleAddDrinkClick(event) {
    if (event.target.value === "Fountain") {
      alert("Add Fountain Drink");
    } else if (event.target.value === "Bottle") {
      alert("Add Bottle Drink");
    }
  }

  return (
    <div className="container">
      <ul className="nav nav-tabs justify-content-center my-3">
        <li className="nav-item">
          <button
            className={
              loadMenu
                ? "nav-link fw-bolder fs-5 active"
                : "nav-link fw-bolder fs-5 link-primary"
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
                ? "nav-link fw-bolder fs-5 link-primary"
                : "nav-link fw-bolder fs-5 active"
            }
            value="Cart"
            onClick={handleSwitchTab}>
            Current Order
          </button>
        </li>
      </ul>
      {loadMenu ? (
        <AddItemCard
          seasonalItems={seasonalItems}
          drinkFunction={handleAddDrinkClick}
          itemButtonFunction={buttonClick}
          addPizzaFunction={handleAddPizzaClick}></AddItemCard>
      ) : (
        <UserOrderCard
          drinks={drinksOnOrder}
          pizzas={pizzasOnOrder}
          seasonal_items={itemsOnOrder}></UserOrderCard>
      )}
    </div>
  );
};

export default Order;
