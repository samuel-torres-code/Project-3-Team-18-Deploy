
/**
 * Component for displaying rows and inputs for each drink type
 * @param {Object} param0 Object containing the neccessary dependencies for the component
 * @returns a formatted card containing rows and inputs for each drink type
 */
const DrinkRows = ({drink_types, updateDrinkCount, disabled}) => {

    return (drink_types.map((type) => (
        <div key={type.drink_type} className ="row my-2">
              <div className="col-6">
              <span className='translate'>{type.drink_type}</span>
              </div>
              <div className="col-2 mx-1">
              <button disabled={disabled} onClick = {() => updateDrinkCount(type.drink_type,1)} className="btn btn-primary">+</button>
              </div>
              <div className="col-2 mx-1">
              <button disabled={disabled} onClick = {() => updateDrinkCount(type.drink_type,-1)} className="btn btn-primary">-</button>
              </div>
              </div> 
    )))
}

/**
 * Component for formatted card containing inputs for drinks
 * @param {Object} param0 Object containing the neccessary dependencies for the component
 * @returns a formatted card containing inputs for adding a a drink
 */
const DrinkCard = ({updateDrinkCount, drink_types, disabled}) => {
    return (
      <span className='translate'>
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title"><span className='translate'>Add Drinks</span></h5>
            <div className="card-text container w-auto">
            <DrinkRows updateDrinkCount={updateDrinkCount} drink_types={drink_types} disabled={disabled} />
            
            </div> 
            
            
          </div>
          </div>
        </span>
    );
}

export default DrinkCard;