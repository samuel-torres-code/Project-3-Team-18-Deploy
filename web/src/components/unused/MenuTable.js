const MenuTable = () => {
  const data = [
    { name: "one-topping", price: 9.99 },
    { name: "build-your-own", price: 8.99 },
    { name: "cheese", price: 7.99 },
    { name: "Fountain", price: 1.99 },
    { name: "Bottle", price: 1.99 },
  ];

  return (
    <div className="border border-dark mx-5">
      <table className="w-100">
        <thead className="table-header position-sticky">
          <tr>
            <td className="px-1">Menu Item</td>
            <td className="px-1">Price</td>
            <td className="px-1">Select</td>
          </tr>
        </thead>
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key} className="border-top border-secondary">
                <td>{val.name}</td>
                <td>{val.price}</td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MenuTable;
