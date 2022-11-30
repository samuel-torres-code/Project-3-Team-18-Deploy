import { useState, useEffect } from "react";
import IngredientItemButton from "../components/IngredientItemButton";
import useOrder from "../hooks/useOrder";
import useMenu from "../hooks/useMenu";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Pizza.css";

const convertWord = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, `$1 $2`)
    .replace(/-([a-z])/g, (g) => {
      return " " + g.substr(1).toUpperCase();
    })
    .replace(/(^[a-z])/g, (g) => {
      return g.toUpperCase();
    });
};

const customCase = (str) => {};

const orderTypes = (arr) => {
  return ["Dough", ...arr.filter((ing) => ing !== "Other" && ing !== "Dough")];
};

const Pizza = () => {
  const [pizzaIndex, setPizzaIndex] = useState(-1);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dropdownStates, setDropdownStates] = useState([false]);
  const [pizza, setPizza] = useState({
    pizza_type: "",
    pizza_price: "0.00",
    ingredients: [],
  });
  const navigate = useNavigate();
  const {
    orderLoading,
    orderError,
    order,
    addNewPizzaAsync,
    updatePizzaAsync,
    deletePizza,
    addDrink,
    saving
  } = useOrder([]);
  const { menuLoading, menuError, ingredients_by_type, itemTypes } = useMenu();

  const [queryParameters] = useSearchParams();
  const indexURL = queryParameters.get("index");

  const containsIngredient = (ingredient_id_int) => {
    if (typeof pizza !== "undefined" && pizza != null) {
      return (
        pizza.ingredients.filter(
          (ing) => ing.ingredient_id === "" + ingredient_id_int
        ).length >= 1
      );
    }
    return false;
  };
  
  useEffect(() => {
    if (!orderLoading) {
      if (indexURL != null && typeof indexURL !== "undefined") {
        setPizzaIndex(indexURL);
        setPizza(order.pizzas[indexURL]);
      } 
      
      // else {
      //   // if (order.pizzas.length === 0) {
      //   //   addNewPizza();
      //   //   setPizzaIndex(0);
      //   // } else {
      //   //   addNewPizza();
      //   //   setPizzaIndex(order.pizzas.length);
      //   // }
      //}
    }
  }, [orderLoading]);

  useEffect(() => {
    // console.log(pizzaIndex)
    // if (!orderLoading && pizzaIndex >= 0) {
    //   console.log('update pizza')
    //   console.log(pizza)
    //   updatePizza(pizza, pizzaIndex);
    // }
  }, [pizza]);

  useEffect(() => {
    // if (!orderLoading) {
    //   if (
    //     pizzaIndex == -1 &&
    //     order.pizzas.length > 0 &&
    //     indexURL != null &&
    //     typeof indexURL !== "undefined"
    //   ) {
    //     //setPizzaIndex(order.pizzas.length - 1);
    //   }
    //   if (pizzaIndex < order.pizzas.length && pizzaIndex >= 0) {
    //     setPizza(order.pizzas[pizzaIndex]);
    //   }
    // }
  }, [pizzaIndex, order]);

  useEffect(() => {
    if (menuLoading === false) {
      console.log("resetting buttons")
      setDropdownStates(
        Array(Object.keys(ingredients_by_type).length).fill(false)
      );
    }
  }, [menuLoading]);

  const handleSavePizza = () => {
    //If index == -1
    if(pizzaIndex === -1) {
      //  add pizza
      addNewPizzaAsync(pizza).then(() => {
        //Cheeky little workaround
        //Not professional at all
        //Needed because navigate rerenders useOrder before it can update the order state
        // and put in local storage
        setTimeout(() => {
          navigate('/order');
        },100)
      });
      
    }
    else {
      
      //  Save pizza
      //  Same workaround needed
      updatePizzaAsync(pizza,pizzaIndex).then(() => {
        setTimeout(() => {
          navigate('/order');
        },100)
        
      });
    }
    

     

    //Redirect to order
    //navigate('/order');
  }

  if (menuError || orderError) {
    return (
      <div>
        <p>Menu Error: {menuError}</p>
        <p>Order Error: {orderError}</p>
      </div>
    );
  } else if (menuLoading || orderLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={require("../loader_pizza.gif")}
          alt="Loading"
          style={{ width: "15vw", height: "auto" }}
        />
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row justify-content-between my-2">
          <div className="col-3">
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/order");
              }}
            >
              Back
            </Button>
          </div>

          <div className="col-3 text-end">
            <Button
              onClick={() => {
               handleSavePizza();
              }}
            >
              Finish
            </Button>
          </div>
        </div>
        <div className="row">

          {/* Pizza Types Dropdown */}
          <div className="ingredientDropdownContainer my-2">
            <Button
              onClick={() =>
                setDropdownStates(
                  dropdownStates.map((s, i) => (i === 0 ? !s : s))
                )
              }
              aria-controls="pizza-type-collapse"
              aria-expanded={dropdownStates[0]}
              className="ingredientDropdown shadow-none"
              variant="link"
            >
              Pizza Type
              {!dropdownStates[0] ? (
                <FontAwesomeIcon className="mx-2" icon={faCaretDown} />
              ) : (
                <FontAwesomeIcon className="mx-2" icon={faCaretUp} />
              )}
            </Button>

            <Collapse in={dropdownStates[0]}>
              <div id="pizza-type-collapse">
                <div className="row justify-content-center">
                  {itemTypes.pizza_types.map((type, i) => (
                    <IngredientItemButton
                      key={`${type}_${i}`}
                      cardText={`${convertWord(type.pizza_type)} $${
                        type.pizza_price
                      }`}
                      
                      selected={pizza.pizza_type === type.pizza_type}
                      onClick={() => {
                        setPizza({ ...type, ingredients: pizza.ingredients });
                        // console.log({...pizza, pizza_type:type})
                      }}
                    ></IngredientItemButton>
                  ))}
                </div>
              </div>
            </Collapse>
          </div>

          {/* Pizza Ingredients Dropdowns */}
          {ingredients_by_type ? (
            orderTypes(Object.keys(ingredients_by_type)).map((type, i) => {
              return (
                <div
                  key={`${type}_${i}`}
                  className="ingredientDropdownContainer my-2"
                >
                  <Button
                    variant="link"
                    onClick={() =>
                      setDropdownStates(
                        dropdownStates.map((s, ind) =>
                          ind === i + 1 ? !s : false
                        )
                      )
                    }
                    aria-controls="pizza-type-collapse"
                    aria-expanded={dropdownStates[i + 1]}
                    className="ingredientDropdown shadow-none"
                  >
                    {convertWord(type)}
                    {!dropdownStates[i + 1] ? (
                      <FontAwesomeIcon className="mx-2" icon={faCaretDown} />
                    ) : (
                      <FontAwesomeIcon className="mx-2" icon={faCaretUp} />
                    )}
                  </Button>
                  <Collapse in={dropdownStates[i + 1]}>
                    <div id="pizza-type-collapse">
                      <div className="row justify-content-center">
                        {ingredients_by_type[type].map((ingredient, i) => (
                          <IngredientItemButton
                            selected={containsIngredient(
                              ingredient.ingredient_id
                            )}
                            key={`${ingredient.ingredient_name}_${i}`}
                            cardText={convertWord(ingredient.ingredient_name)}
                            onClick={() => {
                              //console.log(containsIngredient(ingredient.ingredient_id))
                              if (
                                !containsIngredient(ingredient.ingredient_id)
                              ) {
                                //console.log("adding ingredient")
                                setPizza({
                                  ...pizza,
                                  ingredients: [
                                    ...pizza.ingredients,
                                    {
                                      ingredient_id: `${ingredient.ingredient_id}`,
                                    },
                                  ],
                                });
                              } else {
                                console.log("removing ingredient")
                                setPizza({
                                  ...pizza,
                                  ingredients: pizza.ingredients.filter(
                                    (ing) =>
                                      ing.ingredient_id !==
                                      "" + ingredient.ingredient_id
                                  ),
                                });
                              }
                            }}
                          ></IngredientItemButton>
                        ))}
                      </div>
                    </div>
                  </Collapse>
                </div>
              );
            })
          ) : (
            <p>no menu yet</p>
          )}

        </div>
      </div>
    );
  }
};

export default Pizza;
