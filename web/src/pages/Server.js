<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 3ed02462e8697784ff9c6b845dacb6639d669e15
import DoughCard from "../components/DoughCard";
import DrinkCard from "../components/DrinkCard";
import OrderCard from "../components/OrderCard";
import PizzaOrderCard from "../components/PizzaOrderCard";
import {
  ingredients,
  //pizzas,
  // seasonal_items,
  // drink_counts,
  // order_info,
} from "../api/ExampleData";
import AddPizzaCard from "../components/AddPizzaCard";
<<<<<<< HEAD
import { getIngredientsByType } from "../api/ServerAPI";
=======
>>>>>>> 3ed02462e8697784ff9c6b845dacb6639d669e15

// eslint-disable-next-line
const groupBy = (x, f) =>
// eslint-disable-next-line
  x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

const Server = () => {
  const [ingredients_by_type,setIngredientsByType] = useState({});
  const [nextPizzaID, setNextPizzaID] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [pizzasOnOrder, setPizzasOnOrder] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [drinkCounts, setDrinkCounts] = useState([]);
  // const [currentPizzaIndex, setCurrentPizzaIndex] = useState(-1);
  const [currentPizzaID, setCurrentPizzaID] = useState(-1);
  const [orderInfo, setOrderInfo] = useState({ name: "" });
  const [form,setForm] = useState({order_name:""});
  const baseIngredients = ["Sauce", "Drizzle", "Cheese"];
  const toppingIngredients = ["RawVeggies", "RoastedVeggies", "Meats"];

  useEffect(() => {
    setIngredientsByType(getIngredientsByType())
  },[])

  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmitName = () => {
    // e.preventDefault();
    
    if(form.order_name !== "") {
      //createEmptyOrder(form.order_name)
      createEmptyOrder(form.order_name);
      //setOrderInfo({... orderInfo, name: form.order_name})
      
    }
  }

  const createEmptyOrder = (name) => {
    setPizzasOnOrder([]);
    setSeasonalItems([]);
    setDrinkCounts([
      {
        drink_type: "Fountain",
        drink_count: 0,
      },
      {
        drink_type: "Bottled",
        drink_count: 0,
      }]
    );
    setOrderInfo({ name: name  })
  };
  //createEmptyOrder("Joey")

  const handleChange = async (val) => {
    if (!currentPizzaID !== -1) {
      //If pizza is selected
      //Update the selected pizza with selected ingredients
      const currIng = ingredients.filter(
        (ing) => val.indexOf(ing.ingredient_id) !== -1
      );
      setPizzasOnOrder(
        pizzasOnOrder.map((p, i) => {
          if (p.pizza_id === currentPizzaID) {
            p.ingredients = currIng;
          }
          return p;
        })
      );
    }
    setSelectedIngredients(val, pizzasOnOrder);
  };

  const handleAddPizza = (type, price) => {
    setPizzasOnOrder([
      ...pizzasOnOrder,
      {
        pizza_type: type,
        pizza_price: price,
        ingredients: [],
        pizza_id: nextPizzaID
      },
    ]);
    
    setNextPizzaID(nextPizzaID+1)
  };
  const handleDeletePizza = (id) => {
    console.log(pizzasOnOrder);
    console.log(id)
    
    setPizzasOnOrder(pizzasOnOrder.filter((p, i) => p.pizza_id !== id));
    if (id === currentPizzaID) {
      setSelectedIngredients([]);
      setCurrentPizzaID(-1);

    }
  };
  const handleEditPizza = (id) => {
    //setCurrentPizzaIndex(index);
    setCurrentPizzaID(id)
    console.log(pizzasOnOrder)
    console.log(id)
    //Select Ingredients
    setSelectedIngredients(
      pizzasOnOrder.filter((pizza) => pizza.pizza_id ===id)[0].ingredients.map((ing) => {
        return Number(ing.ingredient_id);
      })
    );
    //console.log(selectedIngredients)
  };

  const handleDeleteSeasonalItem = (index) => {
    setSeasonalItems(seasonalItems.filter((s, i) => i !== index));
  };

  const updateDrinkCount = (type, updateVal) => {
    setDrinkCounts(
      drinkCounts.map((drink) => {
        if (drink.drink_type === type) {
          if (drink.drink_count !== 0 || updateVal > 0) {
            drink.drink_count += updateVal;
          }
        }
        return drink;
      })
    );
  };

  return (
    <div className="container">
      <div className="row my-2">
        <div className="col-3">
          <OrderCard
            order_info={orderInfo}
            pizzas={pizzasOnOrder}
            seasonal_items={seasonalItems}
            drink_counts={drinkCounts}
            total_price={0.0}
            handleDeletePizza={handleDeletePizza}
            handleEditPizza={handleEditPizza}
            handleDeleteSeasonalItem={handleDeleteSeasonalItem}
            onFormChange={handleFormChange}
            handleSubmitName={handleSubmitName}
          />
        </div>
        <div className="col-3">
          <DrinkCard updateDrinkCount={updateDrinkCount} />
          <DoughCard
            ingredients_by_type={ingredients_by_type}
            value={selectedIngredients}
            handleChange={handleChange}
          />
          <AddPizzaCard handleAddPizza={handleAddPizza} />
        </div>
        <div className="col-6">
          <PizzaOrderCard
            disabled={currentPizzaID === -1}
            handleChange={handleChange}
            ingredients_by_type={ingredients_by_type}
            value={selectedIngredients}
            setValue={setSelectedIngredients}
            baseIngredients={baseIngredients}
            toppingIngredients={toppingIngredients}
          />
        </div>
      </div>
    </div>
  );
};

export default Server;