
import React, { useEffect, useState } from "react";

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

import { getIngredientsByType, getItemTypes, postOrder } from "../api/ServerAPI";


// eslint-disable-next-line
const groupBy = (x, f) =>
// eslint-disable-next-line
  x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

const Server = () => {
  const [ingredients_by_type,setIngredientsByType] = useState({});
  const [nextPizzaID, setNextPizzaID] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [itemTypes,setItemTypes] = useState({});
  const [pizzasOnOrder, setPizzasOnOrder] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [drinkCounts, setDrinkCounts] = useState([]);
  // const [currentPizzaIndex, setCurrentPizzaIndex] = useState(-1);
  const [currentPizzaID, setCurrentPizzaID] = useState(-1);
  const [orderInfo, setOrderInfo] = useState({ name: "" });
  const [form,setForm] = useState({order_name:""});
  const [isLoading,setIsLoading] = useState(true);
  let initialLoad = true;
  const baseIngredients = ["Sauce", "Drizzle", "Cheese"];
  const toppingIngredients = ["RawVeggies", "RoastedVeggies", "Meats"];

  useEffect(() => {
    if(isLoading && initialLoad) {
      initialLoad = false
      
      Promise.all([getIngredientsByType(), getItemTypes()]).then((values) => {
          setIngredientsByType(values[0])
          setItemTypes(values[1])
          setIsLoading(false)
      })
    }
  })

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
    setDrinkCounts(itemTypes.drink_types.map((drink_type) => ({drink_name:drink_type.drink_type,drink_count:0,drink_price:drink_type.drink_price})));
    setOrderInfo({ name: name  })
  };

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
    setCurrentPizzaID(nextPizzaID)
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
    if(id !== currentPizzaID) {
      setCurrentPizzaID(id)
      //Select Ingredients
      setSelectedIngredients(
        pizzasOnOrder.filter((pizza) => pizza.pizza_id ===id)[0].ingredients.map((ing) => {
          return Number(ing.ingredient_id);
      })
      );
    }
    else {
      setCurrentPizzaID(-1)
      setSelectedIngredients([])
    }
    
    //console.log(selectedIngredients)
  };

  const handleDeleteSeasonalItem = (index) => {
    setSeasonalItems(seasonalItems.filter((s, i) => i !== index));
  };
  const resetPage = () => {
    createEmptyOrder("")
    setDrinkCounts([])
    setSelectedIngredients([])
    setCurrentPizzaID(-1)
  }
  const handleCheckout = () => {
    var error = "";
    //Check if order has name
    if(orderInfo.name === "") {
      error += "Order has not been started."
    }

    const numDrinks = drinkCounts.reduce((accum,item) => accum + item.drink_count, 0)
    //Check if order has anything
    if(pizzasOnOrder.length ===0 && seasonalItems.length === 0 && numDrinks === 0) {
      error += "Nothing on Order"
    }

    //Alert Errors
    if(error !== "") {
      alert(error)
      return
    }

    //construct drinks
    let formattedDrinks = []
    for( let i = 0; i < drinkCounts.length; i++) {
      for(let j = 0; j < drinkCounts[i].drink_count; j++) {
        formattedDrinks.push({drink_type: drinkCounts[i].drink_name,drink_price: drinkCounts[i].drink_price})
      }
    }


    //Arrange JSON
    const reqJson = {
      order: {
        emp_id:1,
        cust_name: orderInfo.name
      },
      pizzas:[
        pizzasOnOrder.map((pizza) => ({
          pizza_type: pizza.pizza_type,
          pizza_price: pizza.pizza_price,
          ingredients: [
            pizza.ingredients.map((ingredient) => ({
              ingredient_id: ingredient.ingredient_id
            }))
          ]
        }))
      ],
      drinks:formattedDrinks

    }
    
    //Send Request
    postOrder(reqJson)
    console.log('order added')

    //Alert Success
    alert('Order Success')

    //Create empty order of name 
    resetPage()


  }

  const updateDrinkCount = (type, updateVal) => {
    setDrinkCounts(
      drinkCounts.map((drink) => {
        if (drink.drink_name === type) {
          if (drink.drink_count !== 0 || updateVal > 0) {
            drink.drink_count += updateVal;
          }
        }
        return drink;
      })
    );
  };
  if(!isLoading) {
    
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
              currentPizzaID={currentPizzaID}
              
            />
            <button disabled={orderInfo.name === ""} className="btn btn-primary" onClick={() => handleCheckout()} >Checkout</button>
            <button disabled={orderInfo.name === ""} className="btn btn-secondary" onClick={() => resetPage()} >Cancel Order</button>
          </div>
          <div className="col-3">
            <DrinkCard disabled={orderInfo.name === ""} updateDrinkCount={updateDrinkCount} drink_types={itemTypes.drink_types} />
            <DoughCard
              ingredients_by_type={ingredients_by_type}
              value={selectedIngredients}
              handleChange={handleChange}
              disabled ={currentPizzaID === -1}
            />
            <AddPizzaCard handleAddPizza={handleAddPizza} pizza_types={itemTypes.pizza_types} disabled={orderInfo.name === ""} />
            
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
  }
  else {
    return (<>
    <div style={{width:'100vw',height:'90vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
      <img src={require ('../loader_pizza.gif')} alt="Loading" style={{ width:'15vw', height:'auto'}}/>
      </div>
    </>)
  }
};

export default Server;