import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const MenuItemsTable = (
  menuItemData,
  handleEditMenuItemClick,
  handleDeleteMenuItemClick,
  seasonalItems,
  handleAddMenuItemClick
) => {
  return (
    <div className="container">
      <div
        className="border border-dark mx-5"
        style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <table className="w-100">
          <thead className="table-header position-sticky">
            <tr>
              <th className="px-1">Menu Item</th>
              <th className="px-1">Price</th>
              <th className="px-1">Edit</th>
              <th className="px-1">Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log(menuItemData)}
            {menuItemData.map((item, key) => {
              return (
                <tr key={key} className="table-row border-top border-secondary">
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mx-auto"
                      data-bs-toggle="modal"
                      data-bs-target="#inputModal"
                      onClick={() => handleEditMenuItemClick(item.name)}>
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                  </td>
                  <td>
                    {seasonalItems.includes(item.name) && (
                      <button
                        className="btn btn-primary btn-sm mx-auto"
                        onClick={() => handleDeleteMenuItemClick(item.name)}>
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
          className="btn btn-primary btn-sm mt-3"
          data-bs-toggle="modal"
          data-bs-target="#inputModal"
          onClick={handleAddMenuItemClick}>
          Add Ingredient
        </button>
      </div>
    </div>
  );
};

export default MenuItemsTable;
