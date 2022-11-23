import { getStaticContextFromError } from "@remix-run/router";
import { useState } from "react";
const IngredientTable = ({ sendToParent }) => {
  const data = [
    { name: "Red", type: "Sauce", inventory: 1000 },
    { name: "Pesto", type: "Sauce", inventory: 1000 },
    { name: "White", type: "Sauce", inventory: 1000 },
    { name: "Zesty Red", type: "Sauce", inventory: 1000 },
    { name: "Mozzarella", type: "Cheese", inventory: 1000 },
    { name: "Parmesan", type: "Cheese", inventory: 1000 },
    { name: "Ricotta", type: "Cheese", inventory: 1000 },
    { name: "Vegan", type: "Cheese", inventory: 1000 },
    { name: "House Blend", type: "Cheese", inventory: 1000 },
    { name: "Oregano", type: "Drizzle", inventory: 1000 },
    { name: "Siracha", type: "Drizzle", inventory: 1000 },
    { name: "Balsamic", type: "Drizzle", inventory: 1000 },
    { name: "BBQ", type: "Drizzle", inventory: 1000 },
    { name: "Basil Pesto", type: "Drizzle", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Pepperoni", type: "Meats", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Cherry Tomatos", type: "Raw Veggies", inventory: 1000 },
    { name: "Carmalized Onions", type: "Roasted Veggies", inventory: 1000 },
    { name: "Carmalized Onions", type: "Roasted Veggies", inventory: 1000 },
    { name: "Carmalized Onions", type: "Roasted Veggies", inventory: 1000 },
    { name: "Carmalized Onions", type: "Roasted Veggies", inventory: 1000 },
    { name: "Carmalized Onions", type: "Roasted Veggies", inventory: 1000 },
  ];

  let selectedIngredients = ["apple"];

  function handleSelectChange(event) {
    if (event.target.checked) {
      selectedIngredients.push(event.target.value);
    } else {
      selectedIngredients = selectedIngredients.filter(function (item) {
        return item !== event.target.value;
      });
    }
    sendToParent(selectedIngredients);
  }

  return (
    <div
      className="border border-dark mx-5"
      style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <table className="w-100">
        <thead className="table-header position-sticky">
          <tr>
            <th className="px-1">Ingredient</th>
            <th className="px-1">Type</th>
            <th className="px-1">Inventory</th>
            <th className="px-1">Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key} className="table-row border-top border-secondary">
                <td>{val.name}</td>
                <td>{val.type}</td>
                <td>{val.inventory}</td>
                <td>
                  <input
                    type="checkbox"
                    value={val.name}
                    onChange={handleSelectChange}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;
