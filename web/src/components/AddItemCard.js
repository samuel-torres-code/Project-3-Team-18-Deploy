import ItemButton from "./ItemButton";

/**
 * Component to display the Menu to the user and to allow them to add items to their order.
 * @param {array} seasonalItems
 * @param {function} drinkFunction
 * @param {function} itemButtonFunction
 * @param {function} addPizzaFunction
 * @returns
 */
const AddItemCard = ({
  seasonalItems,
  drinkFunction,
  itemButtonFunction,
  addPizzaFunction,
}) => {
  return (
    <span className="translate">
      <div className="container px-0">
        <div className="d-flex justify-content-center my-4">
          <button className="btn btn-primary btn-lg" onClick={addPizzaFunction}>
            <span className="translate" style={{ pointerEvents: "none" }}>
              Add Pizza
            </span>
          </button>
        </div>
        <div className="row gap-3 col-lg-6 col-md-8 col-sm-12 mx-auto justify-content-center my-3">
          {seasonalItems.map((item) => {
            return (
              <ItemButton
                key={item.item_name}
                cardText={item.item_name}
                onClick={itemButtonFunction}></ItemButton>
            );
          })}
        </div>
        <div className="d-flex justify-content-center gap-3 my-4">
          <button
            className="btn btn-primary btn-lg"
            value="Fountain"
            onClick={drinkFunction}>
            <span className="translate" style={{ pointerEvents: "none" }}>
              Add Fountain Drink
            </span>
          </button>
          <button
            className="btn btn-primary btn-lg"
            value="Bottle"
            onClick={drinkFunction}>
            <span className="translate" style={{ pointerEvents: "none" }}>
              Add Bottle Drink
            </span>
          </button>
        </div>
      </div>
    </span>
  );
};

export default AddItemCard;
