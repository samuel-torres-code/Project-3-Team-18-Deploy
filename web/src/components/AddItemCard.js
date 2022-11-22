import ItemButton from "./ItemButton";

const AddItemCard = ({
  seasonalItems,
  drinkFunction,
  itemButtonFunction,
  addPizzaFunction,
}) => {
  return (
    <div className="container px-0">
      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-primary" onClick={addPizzaFunction}>
          Add Pizza
        </button>
      </div>
      <div
        className="row gap-3 w-50 mx-auto justify-content-center my-3"
        style={{ minWidth: "300px" }}>
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
          Add Fountain Drink
        </button>
        <button
          className="btn btn-primary"
          value="Bottle"
          onClick={drinkFunction}>
          Add Bottle Drink
        </button>
      </div>
    </div>
  );
};

export default AddItemCard;
