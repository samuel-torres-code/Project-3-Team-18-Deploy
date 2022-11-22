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
    order_info: {
      emp_id: "-1",
      cust_name: "",
    },
    pizzas: [],
    drinks: [],
    seasonal_items: [],
  });
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [seasonalItems, setSeasonalItems] = useState([]);

  useEffect(() => {
    loadStorage();
  }, []);

  useEffect(() => {
    console.log("updating storage");
    updateStorage();
  }, [order]);

  useEffect(() => {
    setOrder({
      order_info: { ...order.order_info },
      pizzas: pizzas,
      drinks: drinks,
      seasonal_items: seasonalItems,
    });
  }, [pizzas, drinks, seasonalItems]);

  const updateStorage = () => {
    try {
      localStorage.setItem("order", JSON.stringify(order));
    } catch (e) {
      console.log("Trouble updating localStorage");
      console.log(e);
    }
  };

  const loadStorage = () => {
    if (localStorage.getItem("order") == null) {
      return;
    }
    setOrder(JSON.parse(localStorage.getItem("order")));
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

  const updatePizza = (updatedPizza, index) => {
    setPizzas(
      order.pizzas.map((currPizza, i) =>
        index === i ? updatedPizza : currPizza
      )
    );
  };

  const addNewPizza = () => {
    setPizzas([
      ...order.pizzas,
      {
        pizza_type: "",
        pizza_price: "0.00",
        ingredients: [],
      },
    ]);
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
    deletePizza,
    addDrink,
    addItem,
    deleteItem,
    deleteDrink,
  };
};

export default useOrder;
