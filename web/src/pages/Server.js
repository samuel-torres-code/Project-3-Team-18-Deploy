
import React, { useState } from 'react';
import DoughCard from "../components/DoughCard"
import DrinkCard from "../components/DrinkCard"
import OrderCard from "../components/OrderCard"
import PizzaOrderCard from "../components/PizzaOrderCard"
import { ingredients, pizzas, seasonal_items, drink_counts, order_info } from "../api/ExampleData"
import AddPizzaCard from '../components/AddPizzaCard';

// eslint-disable-next-line
const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b) , a),{});

const Server = () => {

  const ingredients_by_type = groupBy(ingredients, ingredient => ingredient.ingredient_type);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [pizzasOnOrder, setPizzasOnOrder] = useState(pizzas);
  const [seasonalItems, setSeasonalItems] = useState(seasonal_items);
  const [drinkCounts, setDrinkCounts] = useState(drink_counts);
  const [currentPizzaIndex, setCurrentPizzaIndex] = useState(-1);
  const [orderInfo, setOrderInfo] = useState(order_info);
  const baseIngredients = ['Sauce','Drizzle','Cheese'];
  const toppingIngredients = ['RawVeggies','RoastedVeggies','Meats'];
  const handleChange = async (val) => {
    if(!currentPizzaIndex !== -1) {
      //If pizza is selected
      //Update the selected pizza with selected ingredients
      const currIng = ingredients.filter((ing) => val.indexOf(ing.ingredient_id) !== -1)
      setPizzasOnOrder(pizzasOnOrder.map((p,i) => {
        if (i === currentPizzaIndex) {
          p.ingredients = currIng
        }
        return p
      }))
    }
    setSelectedIngredients(val,pizzasOnOrder)
  };
  const handleAddPizza = (type,price) => {
    setPizzasOnOrder([...pizzasOnOrder, {
      pizza_type: type,
      pizza_price: price,
      ingredients: [],
    }])
    setCurrentPizzaIndex(pizzasOnOrder.length)
  }
  const handleDeletePizza = (index) => {
    setPizzasOnOrder(pizzas.filter((p,i) => i !== index))
    if(index === currentPizzaIndex) {
      setSelectedIngredients([])
      setCurrentPizzaIndex(-1)
    }
  } 
  const handleEditPizza = (index) => {
    setCurrentPizzaIndex(index)
    //Select Ingredients
    setSelectedIngredients(pizzasOnOrder[index].ingredients.map((ing) => {
      return Number(ing.ingredient_id)
    }))
    //console.log(selectedIngredients)
    
  }

  const handleDeleteSeasonalItem = (index) => {
    setSeasonalItems(seasonalItems.filter((s,i) => i !== index))
  }

  const updateDrinkCount = (type,updateVal) => {
    setDrinkCounts(drinkCounts.map((drink) => {
      if(drink.drink_type === type) {
        if(drink.drink_count !== 0 || updateVal > 0) {
          drink.drink_count += updateVal
        }
        
      }
      return drink
    }))
  }





  
    return (
    <div className="container">
      <div className="row my-2">
        <div className="col-3"><OrderCard order_info = {orderInfo}
  pizzas = {pizzasOnOrder}
  seasonal_items = {seasonalItems}
  drink_counts = {drinkCounts}
  total_price = {0.00}
  handleDeletePizza = {handleDeletePizza}
  handleEditPizza = {handleEditPizza}
  handleDeleteSeasonalItem = {handleDeleteSeasonalItem}
   /></div>
        <div className="col-3">
          <DrinkCard updateDrinkCount={updateDrinkCount}/>
          <DoughCard ingredients_by_type={ingredients_by_type} value={selectedIngredients} handleChange={handleChange}/>
          <AddPizzaCard handleAddPizza = {handleAddPizza} />
        </div>
        <div className="col-6"><PizzaOrderCard disabled={currentPizzaIndex === -1} handleChange={handleChange} ingredients_by_type={ingredients_by_type} value = {selectedIngredients} setValue ={setSelectedIngredients} baseIngredients={baseIngredients} toppingIngredients={toppingIngredients}/></div>
      </div>
      
    </div>);
  };
  
  export default Server;