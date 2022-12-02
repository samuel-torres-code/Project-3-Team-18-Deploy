import { useState, useEffect } from "react";
import IngredientItemButton from "../components/IngredientItemButton";
import useOrder from "../hooks/useOrder";
import useMenu from "../hooks/useMenu";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
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
  return [
    "Dough",
    "Sauce",
    "Cheese",
    ...arr.filter(
      (ing) =>
        ing !== "Other" &&
        ing !== "Dough" &&
        ing !== "Sauce" &&
        ing !== "Cheese" &&
        ing !== "Drizzle"
    ),
    "Drizzle",
  ];
};

const Pizza = () => {
  const [pizzaIndex, setPizzaIndex] = useState(-1);
  //const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [dropdownStates, setDropdownStates] = useState([false]);
  const [pizza, setPizza] = useState({
    pizza_type: "",
    pizza_price: "0.00",
    ingredients: [],
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const navigate = useNavigate();
  const {
    orderLoading,
    orderError,
    order,
    addNewPizzaAsync,
    updatePizzaAsync,
  } = useOrder([]);
  const { menuLoading, menuError, ingredients_by_type, itemTypes } = useMenu();
  const [queryParameters] = useSearchParams();
  const indexURL = queryParameters.get("index");

  const checkRequirements = (currentPizza) => {
    //Check if required buttons are checked (Dough and Type)
    if (pizza.pizza_type === "") {
      setAlertText("Please select a pizza type.");
      setShowAlert(true);
      return true;
    }
    //Find Dough IDs
    const doughIDs = ingredients_by_type.Dough.map((ing) => ing.ingredient_id);
    if (
      pizza.ingredients.filter((ing) =>
        doughIDs.includes(Number(ing.ingredient_id))
      ).length != 1
    ) {
      setAlertText("Please select one type of dough.");
      setShowAlert(true);
      return true;
    }

    setShowAlert(false);
    return false;
  };

  const resetToppings = (type) => {
    const not_topping_types = ["Other", "Dough", "Sauce", "Cheese", "Drizzle"];
    const filtered_ingredient_ids = Object.keys(ingredients_by_type)
      .filter((key) => not_topping_types.includes(key))
      .reduce((obj, key) => {
        obj[key] = ingredients_by_type[key];
        return obj;
      }, {});

    const not_topping_ids = Object.values(filtered_ingredient_ids)
      .map((ingredients) => {
        return ingredients.map((ingredient) => {
          return ingredient.ingredient_id;
        });
      })
      .flat();
    setPizza({
      ...type,
      ingredients: pizza.ingredients.filter((ing) => {
        return not_topping_ids.includes(Number(ing.ingredient_id));
      }),
    });
  };

  const checkToppings = (currentPizza, type) => {
    if (type === "") {
      setAlertText("Please select a pizza type.");
      setShowAlert(true);
      return true;
    }
    if (menuLoading && menuError === "") {
      setAlertText("Toppings haven't loaded yet. Stand by.");
      setShowAlert(true);
      return true;
    }

    const topping_types = Object.keys(ingredients_by_type).filter(
      (ing) =>
        ing !== "Other" &&
        ing !== "Dough" &&
        ing !== "Sauce" &&
        ing !== "Cheese" &&
        ing !== "Drizzle"
    );

    const toppings = Object.keys(ingredients_by_type)
      .filter((key) => topping_types.includes(key))
      .reduce((obj, key) => {
        obj[key] = ingredients_by_type[key];
        return obj;
      }, {});
    const topping_ids = Object.values(toppings)
      .map((ingredients) => {
        return ingredients.map((ingredient) => {
          return ingredient.ingredient_id;
        });
      })
      .flat();

    //get number of toppings
    const toppingsOnPizza = currentPizza.ingredients.filter((ing) => {
      return topping_ids.indexOf(Number(ing.ingredient_id)) !== -1;
    });
    if (type === "cheese") {
      if (toppingsOnPizza.length > 0) {
        setAlertText("Cheese pizza can't have toppings.");
        setShowAlert(true);
        return true;
      }
    } else if (type === "one-topping") {
      if (toppingsOnPizza.length > 1) {
        setAlertText("One topping pizza can only have one topping.");
        setShowAlert(true);
        return true;
      }
    } else if (type === "build-your-own") {
      if (toppingsOnPizza.length > 4) {
        setAlertText("Build your own pizza can only have up to 4 toppings.");
        setShowAlert(true);
        return true;
      }
    } else {
      setAlertText("Invalid pizza type. Please select another pizza type.");
      setShowAlert(true);
      return true;
    }
    setShowAlert(false);
    return false;
  };

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
    }
  }, [orderLoading]);

  useEffect(() => {
    if (menuLoading === false) {
      setDropdownStates([
        true,
        ...Array(Object.keys(ingredients_by_type).length - 1).fill(false),
      ]);
    }
  }, [menuLoading]);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    }
  }, [showAlert]);

  const handleSavePizza = () => {
    if (checkRequirements(pizza)) {
      return;
    }

    //If index == -1
    if (pizzaIndex === -1) {
      //  add pizza
      addNewPizzaAsync(pizza).then(() => {
        //Cheeky little workaround
        //Not professional at all
        //Needed because navigate rerenders useOrder before it can update the order state
        // and put in local storage
        setTimeout(() => {
          navigate("/order");
        }, 100);
      });
    } else {
      //  Save pizza
      //  Same workaround needed
      updatePizzaAsync(pizza, pizzaIndex).then(() => {
        setTimeout(() => {
          navigate("/order");
        }, 100);
      });
    }
  };

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
        <div className="row mt-2">
          <div className="col-1 mt-2">
            <Button
              variant="secondary"
              onClick={() => {
                navigate("/order");
              }}
              className="mx-2"
            >
              Back
            </Button>
          </div>

          <div className="col-11">
            {showAlert ? (
              <Alert variant="primary" onClose={() => setShowAlert(false)}>
                {alertText}
              </Alert>
            ) : (
              // add spacing for alert
              <div style={{ height: "75px" }}></div>
            )}
          </div>
        </div>
        <div className="row">
          {/* Pizza Types Dropdown */}
          <div className="ingredientDropdownContainer mb-2">
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
                        if (!checkToppings(pizza, type.pizza_type)) {
                          setPizza({ ...type, ingredients: pizza.ingredients });
                        } else {
                          resetToppings(type);
                        }
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
                              if (
                                !containsIngredient(ingredient.ingredient_id)
                              ) {
                                const newPizza = {
                                  ...pizza,
                                  ingredients: [
                                    ...pizza.ingredients,
                                    {
                                      ingredient_id: `${ingredient.ingredient_id}`,
                                    },
                                  ],
                                };

                                if (
                                  !checkToppings(newPizza, newPizza.pizza_type)
                                ) {
                                  setPizza(newPizza);
                                }
                              } else {
                                const newPizza = {
                                  ...pizza,
                                  ingredients: pizza.ingredients.filter(
                                    (ing) =>
                                      ing.ingredient_id !==
                                      "" + ingredient.ingredient_id
                                  ),
                                };
                                setPizza(newPizza);
                                if (!checkToppings(pizza, pizza.pizza_type)) {
                                  //setShowAlert(false);
                                }
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
        <div className="row justify-content-between ">
          <div className="col-3">
            <Button
              onClick={() => {
                handleSavePizza();
              }}
              className="mx-2"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Pizza;
