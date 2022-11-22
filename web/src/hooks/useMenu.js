import { useState, useEffect } from "react";
import {
  getIngredientsByType,
  getItemTypes,
  postOrder,
} from "../api/ServerAPI";
const useMenu = () => {
  const [menuLoading, setMenuLoading] = useState(true);
  const [menuError, setMenuError] = useState(null);
  const [ingredients_by_type, setIngredientsByType] = useState(null);
  const [itemTypes, setItemTypes] = useState(null);
  var initialLoad = true;

  useEffect(() => {
    if (menuLoading && initialLoad) {
      initialLoad = false;

      Promise.all([getIngredientsByType(), getItemTypes()]).then((values) => {
        if (ingredients_by_type === null) {
          setIngredientsByType(values[0]);
        }
        if (itemTypes === null) {
          setItemTypes(values[1]);
        }

        setMenuLoading(false);
      });
    }
  }, []);

  return {
    menuLoading,
    menuError,
    ingredients_by_type,
    itemTypes,
  };
};

export default useMenu;
