import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:2000/" 
});



export const getIngredientsByType = () => {
    
        return client.get('api/server/ingredients').then((res) => { 
            return res.data
        });
        
     
}

export const getItemTypes = () => {
    
    return client.get('api/server/types').then((res) => { 
        return res.data
    });
    
 
}

export const postOrder = (reqJson) => {
    client.post('api/checkout/', { 
        order: reqJson.order,
        pizzas: reqJson.pizzas[0],
        drinks: reqJson.drinks 
        
    }).catch((error) => { 
        console.log(error)
    });
    
 
}

