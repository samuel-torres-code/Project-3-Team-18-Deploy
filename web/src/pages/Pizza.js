import { useState, useEffect } from "react";
import ItemButton from "../components/ItemButton";
import useOrder from "../hooks/useOrder";
import useMenu from "../hooks/useMenu";
import {
  getIngredientsByType,
  getItemTypes,
  postOrder,
} from "../api/ServerAPI";

const Pizza = () => {
  const buttonClick = () => {
    alert("button click");
  };
  const [pizzaIndex, setPizzaIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const [pizza, setPizza] = useState(null);
  const {
    orderLoading,
    error,
    order,
    addNewPizza,
    updatePizza,
    deletePizza,
    addDrink,
  } = useOrder([]);
  const { menuLoading, menuError, ingredients_by_type, itemTypes } = useMenu();

  //For Testing, remove later with dynamic url
  useEffect(() => {
    addNewPizza();
    setPizzaIndex(order.pizzas.length - 1);
    setPizza(order.pizzas[order.pizzas.length - 1]);
    addDrink("Fountain", "2.45");
  }, []);

  if (menuLoading || orderLoading) {
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
        <h1 className="text-center">Create Pizza Page</h1>
        <div className="row">
          

          {/* Pizza Types Dropdowns */}
          {/* Pizza Ingredients Dropdowns */}

          {/* Order Collapse */}
          
        </div>
      </div>
    );
  }
};

export default Pizza;
