import { useState, useEffect } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import axios from "axios";

function Manager() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [restockAmount, setRestockAmount] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientType, setNewIngredientType] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [ingredientData, setIngredientData] = useState([]);
  const [menuItemData, setMenuItemData] = useState([]);
  const [addEmployeeName, setNewEmployeeName] = useState("");
  const [addEmployeePassword, setNewEmployeePassword] = useState("");
  const [addAsManager, setAsManager] = useState([false, false]);
  const [addedEmployeeDatabase, setAddedEmployeeDatabase] = useState(null);

  const client = axios.create({
    baseURL: "http://localhost:2000",
  });

  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadIngredients();
    loadMenuItems();
  }, []);

  useEffect(() => {
    loadIngredients();
    loadMenuItems();
  }, [load]);

  function loadIngredients() {
    client
      .get("/api/manager/load_ingredients")
      .then((res) => {
        var ingredients = [];
        for (var i = 0; i < res.data.length; i++) {
          ingredients.push({
            name: res.data[i][0],
            type: res.data[i][1],
            inventory: res.data[i][2],
          });
        }
        ingredients.sort((a, b) => {
          const typeA = a.type.toUpperCase();
          const typeB = b.type.toUpperCase();
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (typeA < typeB) return -1;
          if (typeA > typeB) return 1;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        setIngredientData(ingredients);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("Server responded.");
        } else if (error.request) {
          console.log("Network error.");
        } else {
          console.log("Unknown error type.");
          console.log(error);
        }
      });
  }

  function loadMenuItems() {
    client
      .get("/api/manager/load_prices")
      .then((res) => {
        const items = [];
        for (var i = 0; i < res.data["pizza_types"].length; i++) {
          items.push({
            name: res.data["pizza_types"][i]["pizza_type"],
            price: res.data["pizza_types"][i]["pizza_price"],
          });
        }
        for (i = 0; i < res.data["drink_types"].length; i++) {
          items.push({
            name: res.data["drink_types"][i]["drink_type"],
            price: res.data["drink_types"][i]["drink_price"],
          });
        }
        for (i = 0; i < res.data["seasonal_items"].length; i++) {
          items.push({
            name: res.data["seasonal_items"][i]["item_name"],
            price: res.data["seasonal_items"][i]["item_price"],
          });
        }
        setMenuItemData(items);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("Server responded.");
        } else if (error.request) {
          console.log("Network error.");
        } else {
          console.log("Unknown error type.");
          console.log(error);
        }
      });
  }

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

  function handleAddNameChange(event) {
    setNewIngredientName(event.target.value);
  }

  function handleAddTypeChange(event) {
    setNewIngredientType(event.target.value);
  }

  function handleItemPriceChange(event) {
    setNewItemPrice(event.target.value);
  }

  function handleAddEmployeeName(event) {
    setNewEmployeeName(event.target.value);
  }

  function handleAddEmployeePassword(event) {
    setNewEmployeePassword(event.target.value);
  }

  function handleAddAsManager(event) {
    setAsManager(event);
    console.log(event);
  }

  function handleRestockClick() {
    if (selectedIngredients.length === 0) {
      console.error(
        "Invalid Input for Restock Ingredient: No ingredients are selected."
      );
    } else if (restockAmount === "") {
      console.error(
        "Invalid Input for Restock Ingredient: Restock amount is null."
      );
    } else if (isNaN(restockAmount)) {
      console.error(
        "Invalid Input for Restock Ingredient: Restock amount is NaN."
      );
    } else {
      client
        .post("/api/manager/restock", {
          ingredients: selectedIngredients,
          amount: restockAmount,
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("Server responded.");
          } else if (error.request) {
            console.log("Network error.");
          } else {
            console.log("Unknown error type.");
            console.log(error);
          }
        });
      setRestockAmount("");
      setLoad(!load);
      unCheckIngredients();
    }
  }

  function handleRemoveClick() {
    if (selectedIngredients.length === 0) {
      console.error(
        "Invalid Input for Remove Ingredients: No ingredients are selected."
      );
    } else {
      client
        .post("/api/manager/remove_ingredient", {
          ingredients: selectedIngredients,
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("Server responded.");
          } else if (error.request) {
            console.log("Network error.");
          } else {
            console.log("Unknown error type.");
            console.log(error);
          }
        });
      setLoad(!load);
      unCheckIngredients();
    }
  }

  function handleAddIngredientClick() {
    if (newIngredientName === "") {
      console.error(
        "Invalid Input for Add Ingredient: Ingredient name is null."
      );
    } else if (newIngredientType === "") {
      console.error(
        "Invalid Input for Add Ingredient: Ingredient type is null."
      );
    } else {
      client
        .post("/api/manager/add_ingredient", {
          ingredient_name: newIngredientName,
          ingredient_type: newIngredientType,
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("Server responded.");
          } else if (error.request) {
            console.log("Network error.");
          } else {
            console.log("Unknown error type.");
            console.log(error);
          }
        });
      setLoad(!load);
      loadIngredients();
      setNewIngredientName("");
      // setNewIngredientType("");
    }
  }

  function handleItemPriceClick() {
    if (selectedMenuItems.length === 0) {
      console.error(
        "Invalid Input for Update Menu Item Price: No menu items are selected."
      );
    } else if (newItemPrice === "") {
      console.error(
        "Invalid Input for Update Menu Item Price: New item price is null."
      );
    } else if (isNaN(newItemPrice)) {
      console.error(
        "Invalid Input for Update Menu Item Price: New item price is NaN."
      );
    } else {
      client
        .post("/api/manager/update_menu_items", {
          menu_items: selectedMenuItems,
          new_price: newItemPrice,
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("Server responded.");
          } else if (error.request) {
            console.log("Network error.");
          } else {
            console.log("Unknown error type.");
            console.log(error);
          }
        });
      setLoad(!load);
      setNewItemPrice("");
      unCheckMenuItems();
    }
  }

  function handleAddNewEmployee() {
    if (addEmployeeName.length === 0) {
      console.error("Invalid Input for Employee Name: No name is given.");
    } else if (isNaN(addEmployeePassword)) {
      console.error("Invalid Input for Employee Password: Password is NaN.");
    } else {
      client
        .post("/api/manager/addEmployee", {
          emp: addEmployeeName,
          pass: addEmployeePassword,
          status: addAsManager.length > 2 ? "true" : "false",
        })
        .then((res) => {
          if (res.data === true) {
            setAddedEmployeeDatabase(true);
          } else {
            setAddedEmployeeDatabase(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log("Server responded.");
          } else if (error.request) {
            console.log("Network error.");
          } else {
            console.log("Unknown error type.");
            console.log(error);
          }
        });
      setLoad(!load);
      setAsManager([false, false]);
      setNewEmployeeName("");
      setNewEmployeePassword("");
    }
  }

  function unCheckIngredients() {
    // uncheck all ingredient checkboxes
    setSelectedIngredients([]);
    var x = document.getElementsByClassName("ing-checkbox");
    for (var i = 0; i < x.length; i++) {
      x[i].checked = false;
    }
  }

  function unCheckMenuItems() {
    // uncheck all menu item checkboxes
    setSelectedMenuItems([]);
    var x = document.getElementsByClassName("item-checkbox");
    for (var i = 0; i < x.length; i++) {
      x[i].checked = false;
    }
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
                        className="ing-checkbox"
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
        <div
          className="border border-secondary rounded p-3 mb-3 mt-5 mx-auto"
          style={{ width: "80%" }}>
          <h4 className="text-center">Restock Selected Ingredient</h4>
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
              onClick={handleRestockClick}></input>
          </div>
        </div>

        {/* Remove Ingredients */}
        <div
          className="border border-secondary rounded p-3 my-3 mx-auto"
          style={{ width: "80%" }}>
          <h4 className="text-center">Remove Selected Ingredient</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <input
              type="button"
              className="btn btn-primary my-2"
              onClick={handleRemoveClick}></input>
          </div>
        </div>

        {/* Add Ingredients */}
        <div
          className="border border-secondary rounded p-3 mt-3 mb-5 mx-auto"
          style={{ width: "80%" }}>
          <h4 className="text-center">Add Ingredient</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <div className="d-flex flex-wrap justify-content-center">
              <input
                type="text"
                placeholder="Ingredient Name"
                className="m-2"
                value={newIngredientName}
                onChange={handleAddNameChange}></input>
              <select
                className="form-select w-auto my-2"
                onChange={handleAddTypeChange}
                defaultValue={""}>
                <option value="">Select Type</option>
                <option value="Sauce">Sauce</option>
                <option value="Cheese">Cheese</option>
                <option value="Dough">Dough</option>
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
              onClick={handleAddIngredientClick}></input>
          </div>
        </div>
      </div>
      <div className="col my-auto">
        {/* Menu Items Table */}
        <div className="mx-5 mt-5">
          <table className="w-75 border border-dark mx-auto">
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
                        className="item-checkbox"
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
        <div
          className="border border-secondary rounded p-3 mt-3 mb-5 mx-auto"
          style={{ width: "80%" }}>
          <h4 className="text-center">Change Selected Menu Item Price</h4>
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
              onClick={handleItemPriceClick}></input>
          </div>
        </div>

        {/* Add New Employee to System */}
        <div
          className="border border-secondary rounded p-3 mt-3 mb-5 mx-auto"
          style={{ width: "80%" }}>
          <h4 className="text-center">Add Employee to System</h4>
          <div className="d-flex justify-content-center flex-wrap">
            <input
              type="text"
              placeholder="Employee Name"
              className="m-2"
              value={addEmployeeName}
              onChange={handleAddEmployeeName}></input>
            <input
              type="text"
              placeholder="Employee Passcode"
              className="m-2"
              value={addEmployeePassword}
              onChange={handleAddEmployeePassword}></input>
            <ToggleButtonGroup
              type="checkbox"
              value={addAsManager}
              onChange={handleAddAsManager}>
              <ToggleButton
                id="tbg-btn-1 m-2"
                value={true}
                onChange={handleAddAsManager}>
                Add as Manager?
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="d-flex justify-content-center flex-wrap">
            <input
              type="button"
              className="btn btn-primary my-2"
              value="Add Employee"
              onClick={handleAddNewEmployee}></input>
          </div>
          {addedEmployeeDatabase === true && (
            <div
              className="d-flex justify-content-center flex-wrap"
              style={{ color: "blue" }}>
              Added New Employee.
            </div>
          )}
          {addedEmployeeDatabase === false && (
            <div
              className="d-flex justify-content-center flex-wrap"
              style={{ color: "red" }}>
              Failed to Add New Employee. Try Different Passcode.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
