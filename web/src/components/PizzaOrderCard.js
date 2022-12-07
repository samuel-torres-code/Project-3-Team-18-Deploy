import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

/**
 * Converts camelCase to spaced string
 * @param {string} str 
 * @returns 
 */
const convertWord = (str) => {
    return str.replace(/([a-z])([A-Z])/g, `$1 $2`);
}

/**
 * Contains a div that displays a list of ingredients in a button group
 * @param {Object} param0 Object containing all the dependencies
 * @returns 
 */
const IngredientSelectGroup = ({ width, ingredients, handleChange, value, disabled }) => {
  return (
    <div className={`col-lg-${width} col-md-${width+1} text-center`}>
      <p>
        <strong>{convertWord(ingredients[0])}</strong>
      </p>

      <ToggleButtonGroup
        vertical="true"
        type="checkbox"
        value={value}
        onChange={handleChange}
        
      >
        {ingredients[1].map((ingredient, index) => {
          return (
            <ToggleButton
              key={`${ingredient.ingredient_id}_${index}_${ingredient.ingredient_name}_${ingredient.ingredient_type}`}
              id={`tbg-btn-${ingredient.ingredient_id}`}
              value={ingredient.ingredient_id}
              disabled={disabled}
            >
              {convertWord(ingredient.ingredient_name)}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};

/**
 * Creates a card for the Server that displays ingredient options and lets you edit a pizza
 * @param {Object} param0 Object containing all the dependencies for the component
 * @returns a formatted div containing all the ingredient selectors for a pizza
 */
const PizzaOrderCard = ({
  ingredients_by_type,
  value,
  handleChange,
  baseIngredients,
  toppingIngredients,
  disabled
}) => {
  return (
    <span className='translate'>
    <div className="card dynamic-height" style={{ height: "85vh", overflowY: "scroll" }}>
      <div className="container py-2">
        <div className="row">
          {baseIngredients.map((type, key) => (
            <IngredientSelectGroup
              key={type}
              width={3}
              handleChange={handleChange}
              value={value}
              ingredients={[type, ingredients_by_type[type]]}
              disabled = {disabled}
            ></IngredientSelectGroup>
          ))}
          {toppingIngredients.map((type, key) => (
            <IngredientSelectGroup
              key={type}
              width={4}
              handleChange={handleChange}
              value={value}
              ingredients={[type, ingredients_by_type[type]]}
              disabled = {disabled}
            ></IngredientSelectGroup>
          ))}
        </div>
      </div>
    </div>
    </span>
  );
};

export default PizzaOrderCard;
