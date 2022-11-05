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
    <div
      class="border border-dark mx-5"
      style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <table class="w-100">
        <thead class="table-header position-sticky">
          <th>Ingredient</th>
          <th>Type</th>
          <th>Inventory</th>
          <th>Select</th>
        </thead>
        {data.map((val, key) => {
          return (
            <tr key={key} class="table-row border-top border-secondary">
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
