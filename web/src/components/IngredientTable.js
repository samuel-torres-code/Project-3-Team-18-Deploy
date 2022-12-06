import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const IngredientTable = ({
  ingredientData,
  handleEditIngredientClick,
  handleDeleteIngredientClick,
  handleAddIngredientClick,
  protectedIngredients,
}) => {
  return (
    <div className="container">
      <div
        className="border border-dark mx-5"
        style={{ maxHeight: "70vh", overflowY: "auto" }}>
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
            {ingredientData.map((item, key) => {
              return (
                <tr key={key} className="table-row border-top border-secondary">
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.inventory}</td>
                  <td>{item.fill_level}%</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mx-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#inputModal"
                      onClick={() => handleEditIngredientClick(item.name)}>
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </td>
                  <td>
                    {!protectedIngredients.includes(item.name) && (
                      <button
                        className="btn btn-primary btn-sm mx-auto"
                        onClick={() => handleDeleteIngredientClick(item.name)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end mx-5">
        <button
          className="btn btn-primary btn-sm mt-3 fs-5"
          data-bs-toggle="modal"
          data-bs-target="#inputModal"
          onClick={handleAddIngredientClick}>
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default IngredientTable;
