import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const DoughInputGroup = ({ingredients,handleChange,value,width}) => {
    return (
        <ToggleButtonGroup vertical="true" type="checkbox" value={value} onChange={handleChange}>
        {ingredients[1].map(ingredient => {return (
        <ToggleButton  key={`${ingredient.ingredient_id}_${ingredient.ingredient_name}_${ingredient.ingredient_type}`} id={`tbg-btn-${ingredient.ingredient_id}`} value={ingredient.ingredient_id} >
            {ingredient.ingredient_name}
        </ToggleButton>)})}
        </ToggleButtonGroup>

    )
}

const DoughCard = () => {
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Dough Type</h5>
            <div className="card-text container w-auto">
                {/* //<DoughInputGroup/> */}
            
            </div>     
          </div>
          </div>
    );
}

export default DoughCard;