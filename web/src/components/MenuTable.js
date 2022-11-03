const MenuTable = () => {
  const data = [
    { name: "one-topping", price: 9.99 },
    { name: "build-your-own", price: 8.99 },
    { name: "cheese", price: 7.99 },
    { name: "Fountain", price: 1.99 },
    { name: "Bottle", price: 1.99 },
  ];

  return (
    <div class="border border-dark mx-5 my-4">
      <table class="w-100">
        <tr class="border-bottom border-dark">
          <th>Menu Item</th>
          <th>Price</th>
          <th>Select</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key} class="border-bottom border-secondary">
              <td>{val.name}</td>
              <td>{val.price}</td>
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

export default MenuTable;
