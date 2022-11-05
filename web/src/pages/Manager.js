import IngredientTable from "../components/IngredientTable";
// import InputGroup from "../components/InputGroup";
import MenuTable from "../components/MenuTable";

const Manager = () => {
  return (
    <div class="row w-100">
      <div class="col my-5">
        <IngredientTable></IngredientTable>
      </div>
      <div class="col my-auto">
        <div class="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Restock Selected Ingredient</h4>
          <div class="d-flex justify-content-center flex-wrap">
            <div class="d-flex flex-wrap my-2">
              <input
                type="text"
                placeholder="Restock Amount"
                class="me-2"></input>
            </div>
            <input
              type="button"
              class="btn btn-primary my-2"
              value="Restock"></input>
          </div>
        </div>

        <div class="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Remove Selected Ingredient</h4>
          <div class="d-flex justify-content-center flex-wrap">
            <input
              type="button"
              class="btn btn-primary my-2"
              value="Remove Ingredient"></input>
          </div>
        </div>

        <div class="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Add Ingredient</h4>
          <div class="d-flex justify-content-center flex-wrap">
            <div class="d-flex flex-wrap my-2">
              <input
                type="text"
                placeholder="Ingredient Name"
                class="me-2"></input>
              <select
                class="form-select w-auto"
                aria-label="Default select example">
                <option selected>Select Type</option>
                <option value="1">Sauce</option>
                <option value="2">Cheese</option>
                <option value="3">Drizzle</option>
                <option value="4">Meats</option>
                <option value="5">Raw Veggies</option>
                <option value="6">Roasted Veggies</option>
                <option value="7">Other</option>
              </select>
            </div>
            <input
              type="button"
              class="btn btn-primary my-2"
              value="Add Ingredient"></input>
          </div>
        </div>

        {/* <InputGroup
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
          btn_label="Add Ingredient"></InputGroup> */}
      </div>
      <div class="col my-auto">
        <MenuTable></MenuTable>
        <div class="border border-secondary rounded p-3 my-3 mx-auto w-75">
          <h4>Change Selected Menu Item Price</h4>
          <div class="d-flex justify-content-center flex-wrap">
            <div class="d-flex flex-wrap my-2">
              <input type="text" placeholder="New Price" class="me-2"></input>
            </div>
            <input
              type="button"
              class="btn btn-primary my-2"
              value="Change Price"></input>
          </div>
        </div>

        {/* <InputGroup
          title="Change Selected Menu Item Price"
          text_hint="New Price"
          btn_label="Change Price"></InputGroup> */}
      </div>
    </div>
  );
};

export default Manager;
