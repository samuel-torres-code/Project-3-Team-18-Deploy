import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const DoughInputGroup = ({ingredients,handleChange,value,width,disabled}) => {
    return (
        <span className='translate'>
        <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
        {ingredients[1].map((ingredient,index) => {return (
        <ToggleButton disabled={disabled} key={`${ingredient.ingredient_id}_${index}_${ingredient.ingredient_name}_${ingredient.ingredient_type}`} id={`tbg-btn-${ingredient.ingredient_id}`} value={ingredient.ingredient_id} >
            {ingredient.ingredient_name}
        </ToggleButton>)})}
        </ToggleButtonGroup>
        </span>
    )
}

const DoughCard = ({ingredients_by_type, value, handleChange,disabled}) => {
    if(!disabled) {
    return (
        <span className='translate'>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title"><span className='translate'>Dough Type</span></h5>
            <div className="card-text container w-auto">
                {ingredients_by_type ?
                <DoughInputGroup disabled={disabled} ingredients={['Dough',ingredients_by_type['Dough']]} value={value} handleChange={handleChange}/>
                :
                <p>Not loaded</p>
                }
            
            </div>     
          </div>
          </div>
        </span>
    );}
}

export default DoughCard;