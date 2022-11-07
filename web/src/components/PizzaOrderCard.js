import React from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const IngredientSelectGroup = ({ ingredients, handleChange, value, width, disabled }) => {
  return (
    <div className={`col-${width}`}>
      <p>
        <strong>{ingredients[0]}</strong>
      </p>

      <ToggleButtonGroup
        vertical="true"
        type="checkbox"
        value={value}
        onChange={handleChange}
        
      >
        {ingredients[1].map((ingredient) => {
          return (
            <ToggleButton
              key={`${ingredient.ingredient_id}_${ingredient.ingredient_name}_${ingredient.ingredient_type}`}
              id={`tbg-btn-${ingredient.ingredient_id}`}
              value={ingredient.ingredient_id}
              disabled={disabled}
            >
              {ingredient.ingredient_name}
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
    <div className="card" style={{ maxHeight: "90vh", overflowY: "scroll" }}>
      <div className="container py-2">
        <div className="row">
          {baseIngredients.map((type, key) => (
            <IngredientSelectGroup
              key={type}
              width={4}
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
  );
};

export default PizzaOrderCard;
