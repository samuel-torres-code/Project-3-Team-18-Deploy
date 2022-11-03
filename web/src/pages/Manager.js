import IngredientTable from "../components/IngredientTable";
import InputGroup from "../components/InputGroup";
import MenuTable from "../components/MenuTable";

const Manager = () => {
  return (
    <div class="row w-100">
      {/* <h1>Manager Page</h1> */}
      <div class="col">
        <IngredientTable></IngredientTable>
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
      <div class="col">
        <MenuTable></MenuTable>
        <InputGroup title="Change Selected Menu Item Price" text_hint="New Price" btn_label="Change Price"></InputGroup>
      </div>
    </div>
  );
};

export default Manager;
