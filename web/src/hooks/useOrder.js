import { useState, useEffect } from "react";

// Example JSON Structure
// {
//     "order": {
//         "emp_id": "-1",
//         "cust_name": "Sam Torres"
//     },
//     "pizzas":[
//         {
//             "pizza_type": "cheese",
//             "pizza_price": "6.45",
//             "ingredients":[
//                 { "ingredient_id" : "4" },
//                 { "ingredient_id" : "36" },
//                 { "ingredient_id" : "18" },
//             ]
//         },
//         ...
//     ],
//     "drinks": [
//         {
//             "drink_type": "Fountain",
//             "drink_price": "2.49",
//         },
//         {
//             "drink_type": "Bottled",
//             "drink_price": "2.49",
//         },
//         ...
//     ],
//     "seasonal_items": [
//         {
//             "item_name": "Chicken Wings",
//             "item_price": "12.99",
//         },
//         {
//             "item_name": "Lobster Mac",
//             "item_price": "8.49",
//         },
//         ...
//     ]
// }

const useOrder = () => {
  const [orderLoading, setOrderLoading] = useState(true);
  const [orderError, setOrderError] = useState(null);
  const [order, setOrder] = useState({
    // order_info:{
    //     emp_id: "-1",
    //     cust_name: ""
    // },
    // pizzas:[],
    // drinks:[]
  });
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    if (!orderLoading) {
      updateStorage();
    }
  }, [order]);

  useEffect(() => {
    if (!orderLoading) {
      setOrder({
        order_info: { ...order.order_info },
        pizzas: pizzas,
        drinks: drinks,
        seasonal_items: seasonalItems,
      });
    }
  }, [pizzas, drinks, seasonalItems]);

  /**
   * Updates the local storage for the order with the state variable
   */
  const updateStorage = () => {
    try {
      
      localStorage.setItem("order", JSON.stringify(order));
    } catch (e) {
      console.log("Trouble updating localStorage");
      console.log(e);
    }
  };

  /**
   * Loads the local storage order info into the state variable
   */
  const loadStorage = () => {
    if (localStorage.getItem("order") == null) {
      setOrder({
        order_info: {
          emp_id: "-1",
          cust_name: "",
        },
        pizzas: [],
        drinks: [],
        seasonal_items: [],
      });
    } else {
      const orderJSON = JSON.parse(localStorage.getItem("order"));
      setOrder(orderJSON);
      setPizzas(orderJSON.pizzas);
      setSeasonalItems(orderJSON.seasonal_items);
      setDrinks(orderJSON.drinks);
    }

    setOrderLoading(false);
  };

  /**
   * Updates the order state variables
   * @param {string} name name for the order
   */
  const setOrderName = (name) => {
    setOrder({
      order_info: {
        ...order.order_info,
        cust_name: name,
      },
      pizzas: [...order.pizzas],
      drinks: [...order.drinks],
      seasonal_items: [...order.seasonal_items],
    });
  };

  /**
   * resets the order state variable
   */
  const clearOrder = () => {
    setOrder({
      order_info: {
        ...order.order_info,
        cust_name: order.order_info.cust_name,
      },
      pizzas: [],
      drinks: [],
      seasonal_items: [],
    });
  };

  const updatePizza = (updatedPizza, index) => {
    if (
      updatedPizza != null &&
      typeof updatedPizza !== "undefined" &&
      index < pizzas.length
    ) {
    const newPizzas = order.pizzas.map((currPizza, i) => Number(index) === i ? updatedPizza : currPizza)

      setPizzas(
        newPizzas
      );
    }
  };

  /**
   * Updates the order state variable to update the pizza at given index with the given one
   * @param {Pizza} updatedPizza object containing pizza attributes
   * @param {Number} index index of pizza to update
   */
  const updatePizzaAsync = async (updatedPizza, index) => {
    if (
      updatedPizza != null &&
      typeof updatedPizza !== "undefined" &&
      index < pizzas.length
    ) {
    const newPizzas = order.pizzas.map((currPizza, i) => Number(index) === i ? updatedPizza : currPizza)

      setPizzas(
        newPizzas
      );
    }
  };

  /**
   * Adds the given pizza object to the state variable
   * @param {Pizza} pizza Object containing pizza attributes
   * @returns returns the new index of the pizza
   */
  const addNewPizza = (pizza = {
    pizza_type: "",
    pizza_price: "0.00",
    ingredients: [],
  }) => {
    setPizzas([
      ...order.pizzas,
      pizza,
    ]);
    return pizzas.length;
  };

  /**
   * Adds the given pizza object to the state variable asynchronously
   * @param {Pizza} pizza Object containing pizza attributes
   * @returns returns the new index of the pizza 
   */
  const addNewPizzaAsync = async (pizza = {
    pizza_type: "",
    pizza_price: "0.00",
    ingredients: [],
  }) => {
    setPizzas([
      ...order.pizzas,
      pizza,
    ]);
    return pizzas.length;
  };

  /**
   * Deletes the pizza at the given index
   * @param {Number} index index of pizza to delete
   */
  const deletePizza = (index) => {
    setPizzas(order.pizzas.filter((pizza, i) => i !== index));
  };

  /**
   * Adds a given seasonal item to state
   * @param {Item} item Object containing seasonal item attributes
   */
  const addItem = (item) => {
    setSeasonalItems([
      ...order.seasonal_items,
      {
        item_name: item.item_name,
        item_price: item.item_price,
      },
    ]);
  };

  /**
   * deletes the seasonal item at the given index
   * @param {Number} index index of seasonal item to delete
   */
  const deleteItem = (index) => {
    setSeasonalItems(order.seasonal_items.filter((item, i) => i !== index));
  };

  /**
   * Adds the given drink to state
   * @param {Drink} drink object containing the attributes of a drink
   */
  const addDrink = (drink) => {
    setDrinks([
      ...order.drinks,
      {
        drink_type: drink.drink_type,
        drink_price: drink.drink_price,
      },
    ]);
  };

  /**
   * Deletes the drink at the given index from state
   * @param {Number} index index of drink to delete
   */
  const deleteDrink = (index) => {
    setDrinks(order.drinks.filter((item, i) => i !== index));
  };

  return {
    orderLoading,
    orderError,
    order,
    setOrderName,
    addNewPizza,
    updatePizza,
    addNewPizzaAsync,
    updatePizzaAsync,
    deletePizza,
    addDrink,
    addItem,
    deleteItem,
    deleteDrink,
    clearOrder,
  };
};

export default useOrder;
