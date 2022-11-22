import ItemButton from "../components/IngredientItemButton";

const Order = () => {
  const buttonClick = () => {
    alert("button click");
  };

  return (
    <div className="container">
      <h1 className="text-center">Order Page</h1>
      <div className="row">
        <ItemButton
          imgName={"scary_pizza.png"}
          cardText="Not Found"
          onClick={buttonClick}></ItemButton>
      </div>
    </div>
  );
};

export default Order;
