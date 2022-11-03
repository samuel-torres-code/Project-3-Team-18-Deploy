const IngredientTable = () => {
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

  return (
    <div class="border border-dark mx-5 my-4">
      <table class="w-100">
        <tr>
          <th>Ingredient</th>
          <th>Type</th>
          <th>Inventory</th>
          <th>Select</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key} class="border-bottom border-secondary">
              <td>{val.name}</td>
              <td>{val.type}</td>
              <td>{val.inventory}</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default IngredientTable;
