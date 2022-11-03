const IngredientTable = ({data}) => {
  return (
    <div class="border border-dark mx-5 my-4">
      <table class="w-100">
        <tr>
          <th>Ingredient</th>
          <th>Inventory</th>
          <th>Select</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key} class="border-bottom border-secondary">
              <td>{val.name}</td>
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
