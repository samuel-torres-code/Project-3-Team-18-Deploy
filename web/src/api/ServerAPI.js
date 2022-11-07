import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:2000/" 
});


export const getIngredientsByType = () => {
    
        client.get('api/server/ingredients').then((response) => {
           console.log(response)
        });
     
}

