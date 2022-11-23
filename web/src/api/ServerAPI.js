import axios from "axios";
import { API_URL } from "../API";

const client = axios.create({
  baseURL: API_URL 
});



export const getIngredientsByType = () => {
    
        return client.get('/api/server/ingredients').then((res) => { 
            return res.data
        });
        
     
}

export const getItemTypes = () => {
    
    return client.get('/api/server/types').then((res) => { 
        return res.data
    });
    
 
}

export const postOrder = (reqJson) => {
    client.post('/api/checkout/', { 
        order: reqJson.order,
        pizzas: reqJson.pizzas[0],
        drinks: reqJson.drinks 
        
    }).catch((error) => { 
        console.log(error)
    }).then((res) =>
    {
        localStorage.setItem("order_id", res.data["order_id"]);
        localStorage.setItem("order_time_hours", res.data["order_time_hours"]);
        localStorage.setItem("order_time_mins", res.data["order_time_mins"]);
    });
    
 
}

