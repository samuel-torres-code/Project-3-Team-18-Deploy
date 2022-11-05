const MenuTable = () => {
  const data = [
    { name: "one-topping", price: 9.99 },
    { name: "build-your-own", price: 8.99 },
    { name: "cheese", price: 7.99 },
    { name: "Fountain", price: 1.99 },
    { name: "Bottle", price: 1.99 },
  ];

  return (
    <div class="border border-dark mx-5">
      <table class="w-100">
        <thead
          class="table-header position-sticky"
          styles="background-color:white; box-shadow: inset 0 -1px 0 black; border-collapse: separate;">
          <th>Menu Item</th>
          <th>Price</th>
          <th>Select</th>
        </thead>
        {data.map((val, key) => {
          return (
            <tr key={key} class="border-top border-secondary">
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
