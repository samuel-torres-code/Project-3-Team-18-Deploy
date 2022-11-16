const DrinkRows = ({drink_types, updateDrinkCount, disabled}) => {

    return (drink_types.map((type) => (
        <div key={type.drink_type} className ="row my-2">
              <div className="col-6">
                {type.drink_type}
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

const DrinkCard = ({updateDrinkCount, drink_types, disabled}) => {
    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add Drinks</h5>
            <div className="card-text container w-auto">
                <DrinkRows updateDrinkCount={updateDrinkCount} drink_types={drink_types} disabled={disabled} />
            
            </div> 
            
            
          </div>
          </div>
    );
}

export default DrinkCard;