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
      console.log('order effect')
      console.log(order)
      updateStorage();
    }
  }, [order]);

  useEffect(() => {
    if (!orderLoading) {
      console.log('updating order')
      console.log(pizzas)
      setOrder({
        order_info: { ...order.order_info },
        pizzas: pizzas,
        drinks: drinks,
        seasonal_items: seasonalItems,
      });
    }
  }, [pizzas, drinks, seasonalItems]);

  const updateStorage = () => {
    try {
      
      localStorage.setItem("order", JSON.stringify(order));
      console.log(order)
      console.log('updated order')
    } catch (e) {
      console.log("Trouble updating localStorage");
      console.log(e);
    }
  };

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

  const deletePizza = (index) => {
    setPizzas(order.pizzas.filter((pizza, i) => i !== index));
  };

  const addItem = (item) => {
    setSeasonalItems([
      ...order.seasonal_items,
      {
        item_name: item.item_name,
        item_price: item.item_price,
      },
    ]);
  };

  const deleteItem = (index) => {
    setSeasonalItems(order.seasonal_items.filter((item, i) => i !== index));
  };

  const addDrink = (drink) => {
    setDrinks([
      ...order.drinks,
      {
        drink_type: drink.drink_type,
        drink_price: drink.drink_price,
      },
    ]);
  };

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
