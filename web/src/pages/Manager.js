import IngredientTable from "../components/IngredientTable";
import InputGroup from "../components/InputGroup";

const Manager = () => {
  const data = [
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
    { name: "Subham", inventory: 25 },
    { name: "Anom", inventory: 19 },
    { name: "Megha", inventory: 19 },
  ];

  return (
    <div class="row w-100">
      {/* <h1>Manager Page</h1> */}
      <div class="col">
        <IngredientTable data={data}></IngredientTable>
      </div>
      <div class="col pt-5">
        <InputGroup
          title="Restock Selected Ingredient"
          text_hint="Restock Amount"
          btn_label="Restock"></InputGroup>
        <InputGroup
          title="Remove Selected Ingredient"
          btn_label="Remove Ingredient"></InputGroup>
        <InputGroup
          title="Add Ingredient"
          text_hint="Ingredient Name"
          ingredient_type={true}
          btn_label="Add Ingredient"></InputGroup>
      </div>
      <div class="col"></div>
    </div>
  );
};

export default Manager;
