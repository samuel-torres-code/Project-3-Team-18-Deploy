import ItemButton from "./ItemButton";
/**
 * Component for formatted card containing inputs for adding a seasonal item
 * @param {Object} param0 Object containing the neccessary dependencies for the component
 * @returns a formatted card containing inputs for adding a seasonal item
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
          <button className="btn btn-primary" onClick={addPizzaFunction}>
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
                imgName={"scary_pizza.png"}
                cardText={item.item_name}
                onClick={itemButtonFunction}></ItemButton>
            );
          })}
        </div>
        <div className="d-flex justify-content-center gap-3 my-4">
          <button
            className="btn btn-primary"
            value="Fountain"
            onClick={drinkFunction}>
            <span className="translate" style={{ pointerEvents: "none" }}>
              Add Fountain Drink
            </span>
          </button>
          <button
            className="btn btn-primary"
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
