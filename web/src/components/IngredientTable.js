import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const IngredientTable = ({ ingredientData, selectFunction }) => {
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
            <th className="px-1">Fill Level</th>
            <th className="px-1">Edit</th>
            <th className="px-1">Delete</th>
          </tr>
        </thead>
        <tbody>
          {ingredientData.map((val, key) => {
            return (
              <tr key={key} className="table-row border-top border-secondary">
                <td>{val.name}</td>
                <td>{val.type}</td>
                <td>{val.inventory}</td>
                <td>{val.fill_level || "10%"}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-2">
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mx-2">
                    <FontAwesomeIcon icon={faTrash} />
                  </button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;
