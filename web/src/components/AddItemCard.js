import ItemButton from "./ItemButton";

const AddItemCard = ({ seasonalItems, drinkFunction, itemButtonFunction }) => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-primary">Add Pizza</button>
      </div>
      <div className="row gap-4 w-50 mx-auto justify-content-center my-3">
        {seasonalItems.map((item_name) => {
          console.log(seasonalItems);
          return (
            <ItemButton
              imgName={"scary_pizza.png"}
              cardText={item_name.replace(/([a-z])([A-Z])/g, "$1 $2")}
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
