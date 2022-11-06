// import IngredientTable from "../components/IngredientTable";
// import InputGroup from "../components/InputGroup";
import MenuTable from "../components/MenuTable";
import { useState } from "react";

function Manager() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [restockAmount, setRestockAmount] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientType, setNewIngredientType] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");

  const ingredientData = [
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

  const menuItemData = [
    { name: "one-topping", price: 9.99 },
    { name: "build-your-own", price: 8.99 },
    { name: "cheese", price: 7.99 },
    { name: "Fountain", price: 1.99 },
    { name: "Bottle", price: 1.99 },
  ];

  function handleSelectIngredientChange(event) {
    if (event.target.checked) {
      setSelectedIngredients([...selectedIngredients, event.target.value]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter(function (item) {
          return item !== event.target.value;
        })
      );
    }
  }

  function handleSelectMenuItemChange(event) {
    if (event.target.checked) {
      setSelectedMenuItems([...selectedMenuItems, event.target.value]);
    } else {
      setSelectedMenuItems(
        selectedMenuItems.filter(function (item) {
          return item !== event.target.value;
        })
      );
    }
  }

  function handleRestockChange(event) {
    setRestockAmount(event.target.value);
  }

  function handleRestockClick() {
    console.log("Restock: " + restockAmount);
  }

  function handleRemoveClick() {
    console.log("Ingredients: " + selectedIngredients);
  }

  function handleAddNameChange(event) {
    setNewIngredientName(event.target.value);
  }

  function handleAddTypeChange(event) {
    setNewIngredientType(event.target.value);
  }

  function handleAddIngredientClick() {
    console.log("Name: " + newIngredientName + "\tType: " + newIngredientType);
  }

  function handleItemPriceChange(event) {
    setNewItemPrice(event.target.value);
  }

  function handleItemPriceClick() {
    console.log("New Price: " + newItemPrice + "\tItems: " + selectedMenuItems);
  }

  return (
    <div className="row w-100">
      <div className="col my-5">
        {/* Ingredient Table */}
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
              {ingredientData.map((val, key) => {
                return (
                  <tr
                    key={key}
                    className="table-row border-top border-secondary">
                    <td>{val.name}</td>
                    <td>{val.type}</td>
                    <td>{val.inventory}</td>
                    <td>
                      <input
                        type="checkbox"
                        value={val.name}
                        onChange={handleSelectIngredientChange}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="col my-auto">
        {/* Restock Ingredients */}
        <div className="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Restock Selected Ingredient</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <input
              type="text"
              placeholder="Restock Amount"
              className="m-2"
              value={restockAmount}
              onChange={handleRestockChange}></input>
            <input
              type="button"
              className="btn btn-primary my-2"
              value="Restock"
              onClick={handleRestockClick}></input>
          </div>
        </div>

        {/* Remove Ingredients */}
        <div className="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Remove Selected Ingredient</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <input
              type="button"
              className="btn btn-primary my-2"
              value="Remove Ingredient"
              onClick={handleRemoveClick}></input>
          </div>
        </div>

        {/* Add Ingredients */}
        <div className="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Add Ingredient</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <div className="d-flex flex-wrap my-2 justify-content-center">
              <input
                type="text"
                placeholder="Ingredient Name"
                className="me-2"
                value={newIngredientName}
                onChange={handleAddNameChange}></input>
              <select
                className="form-select w-auto"
                onChange={handleAddTypeChange}
                defaultValue={""}>
                <option value="">Select Type</option>
                <option value="Sauce">Sauce</option>
                <option value="Cheese">Cheese</option>
                <option value="Drizzle">Drizzle</option>
                <option value="Meats">Meats</option>
                <option value="Raw Veggies">Raw Veggies</option>
                <option value="Roasted Veggies">Roasted Veggies</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <input
              type="button"
              className="btn btn-primary my-2"
              value="Add Ingredient"
              onClick={handleAddIngredientClick}></input>
          </div>
        </div>
      </div>
      <div className="col my-auto">
        {/* Menu Items Table */}
        <div className="border border-dark mx-5">
          <table className="w-100">
            <thead className="table-header position-sticky">
              <tr>
                <th className="px-1">Menu Item</th>
                <th className="px-1">Price</th>
                <th className="px-1">Select</th>
              </tr>
            </thead>
            <tbody>
              {menuItemData.map((val, key) => {
                return (
                  <tr key={key} className="border-top border-secondary">
                    <td>{val.name}</td>
                    <td>{val.price}</td>
                    <td>
                      <input
                        type="checkbox"
                        value={val.name}
                        onChange={handleSelectMenuItemChange}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Change Menu Item Price */}
        <div className="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Change Selected Menu Item Price</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <input
              type="text"
              placeholder="New Price"
              className="m-2"
              value={newItemPrice}
              onChange={handleItemPriceChange}></input>
            <input
              type="button"
              className="btn btn-primary my-2"
              value="Change Price"
              onClick={handleItemPriceClick}></input>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
