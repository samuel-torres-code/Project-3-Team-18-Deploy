import { useState, useEffect } from "react";
import ItemButton from "../components/ItemButton";
import useOrder from "../hooks/useOrder";
import useMenu from "../hooks/useMenu";
import {
  getIngredientsByType,
  getItemTypes,
  postOrder,
} from "../api/ServerAPI";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const convertWord = (str) => {
  return str.replace(/([a-z])([A-Z])/g, `$1 $2`);
}

const customCase = (str) => {
  
}

const orderTypes = (arr) => {
  return ['Dough',...arr.filter((ing) => ing !== 'Other' && ing !== 'Dough')]
}

const Pizza = () => {
  
  const [pizzaIndex, setPizzaIndex] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dropdownStates,setDropdownStates] =  useState([false])
  const [pizza, setPizza] = useState(null);
  const {
    orderLoading,
    orderError,
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
    setPizzaIndex(order.pizzas.length);
    
    addDrink("Fountain", "2.45");
  }, []);

  useEffect(() => {
    if(typeof(pizza) !== 'undefined' && pizza != null) {
      console.log('updating pizza')
      updatePizza(pizza,pizzaIndex)
    }
    console.log("Pizza")
    console.log(pizza)
    
  }, [pizza]);

  useEffect(() => {
    console.log(order)
    setPizza(order.pizzas[pizzaIndex]);
  },[pizzaIndex,order])

  useEffect(() => {
    if(menuLoading === false) {
      setDropdownStates(Array(Object.keys(ingredients_by_type).length).fill(false))
      
    }
  },[menuLoading])
  if (menuError || orderError) {
    return (<div>
      <p>
        Menu Error: {menuError}
      </p>
      <p>
        Order Error: {orderError}
      </p>
    </div>)
  }
  else if (menuLoading || orderLoading) {
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
          <Button
        onClick={() => setDropdownStates(dropdownStates.map((s,i) => i === 0? !s: s))}
        aria-controls="pizza-type-collapse"
        aria-expanded={dropdownStates[0]}
          >
            Pizza Types
          </Button>
          <Collapse in={dropdownStates[0]}>
            <div id="pizza-type-collapse">
              <div className="row">

              
              {itemTypes.pizza_types.map((type,i) => <ItemButton key={`${type}_${i}`} cardText ={`${type.pizza_type} - $${type.pizza_price}`} imgName={`${type.pizza_type}.png`} onClick={() => {
                
                setPizza({...type, ingredients:pizza.ingredients})
                // console.log({...pizza, pizza_type:type})
              }}></ItemButton>)}
              </div>
            </div>
          </Collapse>

          {/* Pizza Ingredients Dropdowns */}
          {ingredients_by_type ? orderTypes(Object.keys(ingredients_by_type)).map((type,i) => {
            return (<div key={`${type}_${i}`} className="my-2"><Button
            onClick={() => setDropdownStates(dropdownStates.map((s,ind) => ind === i+1? !s: false))}
            aria-controls="pizza-type-collapse"
            aria-expanded={dropdownStates[i+1]}
              >
                {convertWord(type)}
              </Button>
              <Collapse in={dropdownStates[i+1]}>
                <div id="pizza-type-collapse">
                  <div className="row justify-content-center">
    
                  
                  {ingredients_by_type[type].map((ingredient,i) => <ItemButton selected={false} key={`${ingredient.ingredient_name}_${i}`} cardText ={convertWord(ingredient.ingredient_name)} imgName={`${ingredient.ingredient_name}.png`} onClick={() => {
                    
                    setPizza({...pizza,ingredients:[...pizza.ingredients,{ingredient_id:`${ingredient.ingredient_id}`}]})
                    console.log({...pizza,ingredients:[...pizza.ingredients,{ingredient_id:`${ingredient.ingredient_id}`}]})
                    
                  }}></ItemButton>)}
                  </div>
                </div>
              </Collapse></div>)
          }) : <p>no menu yet</p>}
          

          {/* Order Collapse */}
          
        </div>
      </div>
    );
  }
};

export default Pizza;
