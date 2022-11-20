import { useState, useEffect } from "react";
import ItemButton from "../components/ItemButton";
import useOrder from "../hooks/useOrder";
import { getIngredientsByType, getItemTypes, postOrder } from "../api/ServerAPI";

const Pizza = () => {
  const buttonClick = () => {
    alert("button click");
  };
  const [pizzaIndex,setPizzaIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  
  const [pizza,setPizza] = useState(null)
  const { loading, error, order, addNewPizza,
    updatePizza,deletePizza,addDrink} = useOrder([])

    //For Testing, remove later with dynamic url
    useEffect(() => {
        addNewPizza()
        setPizzaIndex(order.pizzas.length-1)
        setPizza(order.pizzas[order.pizzas.length-1])
        addDrink("Fountain","2.45")
    },[])

  return (
    <div className="container">
      <h1 className="text-center">Create Pizza Page</h1>
      <div className="row">
        <ItemButton
          imgName={"scary_pizza.png"}
          cardText="Scary Pizza"
          onClick={buttonClick}></ItemButton>
      </div>
    </div>
  );
};

export default Pizza;
