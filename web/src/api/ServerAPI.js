import axios from "axios";
import { API_URL } from "../API";

const client = axios.create({
  baseURL: API_URL,
});

/**
 * Calls api to fetch all ingredients from the database (see API Documentation for structure)
 * @returns a formatted json object of the ingredients in the database grouped by type
 */
export const getIngredientsByType = () => {
  return client.get("/api/server/ingredients").then((res) => {
    return res.data;
  });
};

/**
 * Calls api to fetch all menu items from the database (see API Documentation for structure)
 * @returns a formatted json object of the menu items in the database grouped by type
 */
export const getItemTypes = () => {
  return client.get("/api/server/types").then((res) => {
    return res.data;
  });
};

/**
 * Calls api to update the database with the given order and stores its info in localStorage
 * @returns nothing
 */
export const postOrder = (reqJson) => {
    if(reqJson.pizzas.length) {
        if(Array.isArray(reqJson.pizzas[0])) {
            reqJson.pizzas = reqJson.pizzas[0]
        }
    }
    // console.log(reqJson)
    if(reqJson.order ==null || typeof(reqJson.order) === 'undefined') {
        reqJson.order= reqJson.order_info
    }
  client
    .post("/api/checkout/", {
      order: reqJson.order,
      pizzas: reqJson.pizzas,
      drinks: reqJson.drinks,
      seasonal_items: reqJson.seasonal_items,
    })
    .catch((error) => {
      console.log(error);
    }).then((res) =>
    {
        localStorage.setItem("order_id", res.data["order_id"]);
        localStorage.setItem("order_time_hours", res.data["order_time_hours"]);
        localStorage.setItem("order_time_mins", res.data["order_time_mins"]);
    });
};
