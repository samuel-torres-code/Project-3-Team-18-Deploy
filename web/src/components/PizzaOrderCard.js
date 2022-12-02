import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const convertWord = (str) => {
    return str.replace(/([a-z])([A-Z])/g, `$1 $2`);
}
const IngredientSelectGroup = ({ ingredients, handleChange, value, disabled }) => {
  return (
    <div className="col-lg-4 col-xs-5 ">
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
    <div className="card dynamic-height" style={{ maxHeight: "90vh", overflowY: "scroll" }}>
      <div className="container py-2">
        <div className="row">
          {baseIngredients.map((type, key) => (
            <IngredientSelectGroup
              key={type}
              handleChange={handleChange}
              value={value}
              ingredients={[type, ingredients_by_type[type]]}
              disabled = {disabled}
            ></IngredientSelectGroup>
          ))}
          {toppingIngredients.map((type, key) => (
            <IngredientSelectGroup
              key={type}
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
