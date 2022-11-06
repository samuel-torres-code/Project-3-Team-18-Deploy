import { ingredients } from '../api/ExampleData'
import React, { useEffect, useState } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';



const groupBy = (x,f)=>x.reduce((a,b,i)=>((a[f(b,i,x)]||=[]).push(b),a),{});

const IngredientSelectGroup = ({ingredients,handleChange,value,width}) => {
    return (
        <div className={`col-${width}`} >
            <p>
                <strong>{ingredients[0]}</strong>
            </p>
        
        
        <ToggleButtonGroup vertical="true" type="checkbox" value={value} onChange={handleChange}>
        {ingredients[1].map(ingredient => {return (
        <ToggleButton  key={`${ingredient.ingredient_id}_${ingredient.ingredient_name}_${ingredient.ingredient_type}`} id={`tbg-btn-${ingredient.ingredient_id}`} value={ingredient.ingredient_id} >
            {ingredient.ingredient_name}
        </ToggleButton>
        
    )
})}
</ToggleButtonGroup></div>)
}

const PizzaOrderCard = () => {
    const ingredients_by_type = groupBy(ingredients, ingredient => ingredient.ingredient_type);
    const [value, setValue] = useState([]);
    const baseIngredients = ['Sauce','Drizzle','Cheese'];
    const toppingIngredients = ['RawVeggies','RoastedVeggies','Meats'];

    useEffect(() => {
        //Runs on the first render
        //And any time any dependency value changes
        console.log(value)
      }, [value]);

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => {
        setValue(val);
        
        
        
    };
    //const handleChange = (val) => setValue(val);
    
    //console.log(ingredients_by_type)
    return (
        <div className="card" style={{maxHeight:"90vh", overflowY:'scroll'}}>
            <div className="container py-2">
                <div className="row">
                
                {baseIngredients.map((type,key) => 
                    <IngredientSelectGroup key={type} width={4} handleChange={handleChange} value={value} ingredients={[type,ingredients_by_type[type]]}></IngredientSelectGroup>
                )}
                {toppingIngredients.map((type,key) => 
                    <IngredientSelectGroup key={type} width={4} handleChange={handleChange} value={value} ingredients={[type,ingredients_by_type[type]]}></IngredientSelectGroup>
                )}

        
    
    </div>
                {/* <InputGroup ingredients={ingredients_by_type.Meats} ingredient_type="Meats"></InputGroup> */}
            </div>
        </div>
    )
}

export default PizzaOrderCard;