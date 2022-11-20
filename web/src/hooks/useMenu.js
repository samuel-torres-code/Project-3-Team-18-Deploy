import { useState, useEffect } from "react"
import { getIngredientsByType, getItemTypes, postOrder } from "../api/ServerAPI";
const useMenu = () => {

    const [menuLoading, setMenuLoading] = useState(true)
    const [menuError, setMenuError] = useState(null)
    const [ingredients_by_type, setIngredientsByType] = useState(null)
    const [itemTypes,setItemTypes] = useState({});
    var initialLoad = true

    useEffect(() => {
        if(menuLoading && initialLoad) {
          initialLoad = false
          
          Promise.all([getIngredientsByType(), getItemTypes()]).then((values) => {
              setIngredientsByType(values[0])
              setItemTypes(values[1])
              setMenuLoading(false)
          })
        }
      })
      return {
          menuLoading,
          menuError,
          ingredients_by_type,
          itemTypes,
      }
}

export default useMenu