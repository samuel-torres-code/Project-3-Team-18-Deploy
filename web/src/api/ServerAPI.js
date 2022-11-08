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

