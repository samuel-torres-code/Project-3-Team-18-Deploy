import React, { useEffect, useState } from "react";
import DrinkCard from "../components/DrinkCard";
import OrderCard from "../components/OrderCard";
import PizzaOrderCard from "../components/PizzaOrderCard";
import "./Server.css";
import AddPizzaCard from "../components/AddPizzaCard";

import {
  getIngredientsByType,
  getItemTypes,
  postOrder,
} from "../api/ServerAPI";

import SeasonalItemCard from "../components/SeasonalItemCard";

// eslint-disable-next-line
const groupBy = (x, f) =>
  // eslint-disable-next-line
  x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});

const Server = () => {
  //useEffects and useStates
  const [ingredients_by_type, setIngredientsByType] = useState({});
  const [nextPizzaID, setNextPizzaID] = useState(1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [itemTypes, setItemTypes] = useState({});
  const [pizzasOnOrder, setPizzasOnOrder] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);
  const [drinkCounts, setDrinkCounts] = useState([]);
  const [currentPizzaID, setCurrentPizzaID] = useState(-1);
  const [orderInfo, setOrderInfo] = useState({ name: "" });
  const [form, setForm] = useState({ order_name: "" });
  const [isLoading, setIsLoading] = useState(true);
  let initialLoad = true;
  const baseIngredients = ["Dough", "Sauce", "Drizzle", "Cheese"];
  const toppingIngredients = ["RawVeggies", "RoastedVeggies", "Meats"];
  const [showAlerts, setShowAlerts] = useState([]);
  const [showOrderAlert, setShowOrderAlert] = useState(false);
  const [orderAlertText, setOrderAlertText] = useState("");

  useEffect(() => {
    if (isLoading && initialLoad) {
      initialLoad = false;

      Promise.all([getIngredientsByType(), getItemTypes()]).then((values) => {
        setIngredientsByType(values[0]);
        setItemTypes(values[1]);
        setIsLoading(false);
      });
    }
  });

  useEffect(() => {
    if (showOrderAlert) {
      setTimeout(() => {
        setShowOrderAlert(false);
      }, 5000);
    }
  }, [showOrderAlert]);

  /**
   * Sets the text for the name input
   * @param {Keyboard Event} e
   */
  const handleFormChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Creates a new empty order if the name is submitted
   */
  const handleSubmitName = () => {
    if (form.order_name !== "") {
      createEmptyOrder(form.order_name);
    }
  };

  /**
   * Resets all state variables associated with order and sets order name
   * @param {string} name
   */
  const createEmptyOrder = (name) => {
    setPizzasOnOrder([]);
    setSeasonalItems([]);
    setDrinkCounts(
      itemTypes.drink_types.map((drink_type) => ({
        drink_name: drink_type.drink_type,
        drink_count: 0,
        drink_price: drink_type.drink_price,
      }))
    );
    setOrderInfo({ name: name });
  };

  /**
   * Updates ingredients for selected pizza when ingredient buttons are clicked
   * @param {int} val
   */
  const handleChange = async (val) => {
    if (!currentPizzaID !== -1) {
      //If pizza is selected
      //Update the selected pizza with selected ingredients
      const currIng = Object.values(ingredients_by_type)
        .flat()
        .filter((ing) => val.indexOf(ing.ingredient_id) !== -1);
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

  /**
   * Adds new pizza to the order using the given type and price
   * @param {string} type
   * @param {string} price
   */
  const handleAddPizza = (type, price) => {
    setPizzasOnOrder([
      ...pizzasOnOrder,
      {
        pizza_type: type,
        pizza_price: price,
        ingredients: [],
        pizza_id: nextPizzaID,
        pizza_error: "",
      },
    ]);
    setCurrentPizzaID(nextPizzaID);
    setSelectedIngredients([]);
    setNextPizzaID(nextPizzaID + 1);
  };

  /**
   * Deletes selected pizza and deselects it if it was selected
   * @param {Number} id
   */
  const handleDeletePizza = (id) => {
    setPizzasOnOrder(pizzasOnOrder.filter((p, i) => p.pizza_id !== id));
    if (id === currentPizzaID) {
      setSelectedIngredients([]);
      setCurrentPizzaID(-1);
    }
  };

  /**
   * Sets current pizza and ingredient state variables
   * @param {Number} id
   */
  const handleEditPizza = (id) => {
    //setCurrentPizzaIndex(index);
    if (id !== currentPizzaID) {
      setCurrentPizzaID(id);
      //Select Ingredients
      setSelectedIngredients(
        pizzasOnOrder
          .filter((pizza) => pizza.pizza_id === id)[0]
          .ingredients.map((ing) => {
            return Number(ing.ingredient_id);
          })
      );
    } else {
      setCurrentPizzaID(-1);
      setSelectedIngredients([]);
    }
  };

  /**
   * Adds a Seasonal Item to the order
   * @param {SeasonalItem} item
   */
  const handleAddSeasonalItem = (item) => {
    setSeasonalItems([...seasonalItems, item]);
  };
  const handleDeleteSeasonalItem = (index) => {
    setSeasonalItems(seasonalItems.filter((s, i) => i !== index));
  };

  /**
   * Checks all pizzas on the order to see if they match their type requirements and updates alerts
   * @returns Bool denoting whether or not there are any pizza errors
   */
  const checkPizzas = () => {
    var tempPizzasOnOrder = pizzasOnOrder;
    tempPizzasOnOrder.forEach((pizza, index) => {
      var error = "";
      //Check if Pizza has dough
      //Check if number toppings match
      //Find Dough IDs
      const doughIDs = ingredients_by_type.Dough.map(
        (ing) => ing.ingredient_id
      );
      if (
        pizza.ingredients.filter((ing) =>
          doughIDs.includes(Number(ing.ingredient_id))
        ).length != 1
      ) {
        error += "Please select one type of dough.\n";
      }

      const topping_types = Object.keys(ingredients_by_type).filter(
        (ing) =>
          ing !== "Other" &&
          ing !== "Dough" &&
          ing !== "Sauce" &&
          ing !== "Cheese" &&
          ing !== "Drizzle"
      );

      const toppings = Object.keys(ingredients_by_type)
        .filter((key) => topping_types.includes(key))
        .reduce((obj, key) => {
          obj[key] = ingredients_by_type[key];
          return obj;
        }, {});
      const topping_ids = Object.values(toppings)
        .map((ingredients) => {
          return ingredients.map((ingredient) => {
            return ingredient.ingredient_id;
          });
        })
        .flat();

      //get number of toppings
      const toppingsOnPizza = pizza.ingredients.filter((ing) => {
        return topping_ids.indexOf(Number(ing.ingredient_id)) !== -1;
      });

      if (pizza.pizza_type === "cheese") {
        if (toppingsOnPizza.length > 0) {
          error += "Cheese pizza can't have toppings.";
        }
      } else if (pizza.pizza_type === "one-topping") {
        if (toppingsOnPizza.length > 1) {
          error += "One topping pizza can only have one topping.";
        }
      } else if (pizza.pizza_type === "build-your-own") {
        if (toppingsOnPizza.length > 4) {
          error += "Build your own pizza can only have up to 4 toppings.";
        }
      } else {
        error += "Invalid pizza type. Please select another pizza type.";
      }
      pizza.pizza_error = error;
    });

    var errors = false;
    var tempAlerts = new Array(tempPizzasOnOrder.length).fill(false);
    tempPizzasOnOrder.forEach((pizza, index) => {
      if (pizza.pizza_error !== "") {
        errors = true;
        tempAlerts[index] = true;
      }
    });
    setShowAlerts(tempAlerts);

    setPizzasOnOrder(tempPizzasOnOrder);

    return errors;
  };

  /**
   * Resets page to all defaults
   */
  const resetPage = () => {
    createEmptyOrder("");
    setDrinkCounts([]);
    setShowAlerts([]);
    setSelectedIngredients([]);
    setCurrentPizzaID(-1);
  };

  /**
   * 
   * @returns 
   */
  const handleCheckout = () => {
    var error = "";
    //Check if order has name
    if (orderInfo.name === "") {
      error += "Order has not been started.";
    }

    const numDrinks = drinkCounts.reduce(
      (accum, item) => accum + item.drink_count,
      0
    );
    //Check if order has anything
    if (
      pizzasOnOrder.length === 0 &&
      seasonalItems.length === 0 &&
      numDrinks === 0
    ) {
      error += "There is nothing on the order.";
    }

    const errors = checkPizzas();

    //Alert Errors
    if (error !== "" || errors) {
      setOrderAlertText(error);
      setShowOrderAlert(true);
      return;
    }

    //construct drinks
    let formattedDrinks = [];
    for (let i = 0; i < drinkCounts.length; i++) {
      for (let j = 0; j < drinkCounts[i].drink_count; j++) {
        formattedDrinks.push({
          drink_type: drinkCounts[i].drink_name,
          drink_price: drinkCounts[i].drink_price,
        });
      }
    }

    //Arrange JSON
    const reqJson = {
      order: {
        emp_id: 1,
        cust_name: orderInfo.name,
      },
      pizzas: [
        pizzasOnOrder.map((pizza) => ({
          pizza_type: pizza.pizza_type,
          pizza_price: pizza.pizza_price,
          ingredients: [
            pizza.ingredients.map((ingredient) => ({
              ingredient_id: ingredient.ingredient_id,
            })),
          ],
        })),
      ],
      seasonal_items: seasonalItems,
      drinks: formattedDrinks,
    };

    //Send Request
    postOrder(reqJson);

    //Create empty order of name
    resetPage();
  };

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

  if (localStorage.getItem("employee") === "true")
    if (!isLoading) {
      return (
        <div className="container-fluid">
          <div className="row my-2">
            <div className="col-md-12 col-lg-3">
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
                disabled={orderInfo.name === ""}
                handleCheckout={handleCheckout}
                resetPage={resetPage}
                showAlerts={showAlerts}
                showOrderAlert={showOrderAlert}
                orderAlertText={orderAlertText}
              />
            </div>
            <div className="col-md-12 col-lg-3">
              <DrinkCard
                disabled={orderInfo.name === ""}
                updateDrinkCount={updateDrinkCount}
                drink_types={itemTypes.drink_types}
              />
              <SeasonalItemCard
                disabled={orderInfo.name === ""}
                handleAddSeasonalItem={handleAddSeasonalItem}
                seasonal_item_types={itemTypes.seasonal_item_types}
              />

              <AddPizzaCard
                handleAddPizza={handleAddPizza}
                pizza_types={itemTypes.pizza_types}
                disabled={orderInfo.name === ""}
              />
              {/* <DoughCard
              ingredients_by_type={ingredients_by_type}
              value={selectedIngredients}
              handleChange={handleChange}
              disabled={currentPizzaID === -1}
            /> */}
            </div>
            <div className="col-md-12 col-lg-6">
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
    } else {
      return (
        <>
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
        </>
      );
    }
};

export default Server;
