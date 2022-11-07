const DrinkRows = ({drink_types, updateDrinkCount}) => {

    return (drink_types.map((type) => (
        <div key={type.drink_id} className ="row my-2">
              <div className="col-8">
                {type.drink_name}
              </div>
              <div className="col-2">
              <button onClick = {() => updateDrinkCount(type.drink_name,1)} className="btn btn-primary">+</button>
              </div>
              <div className="col-2">
              <button onClick = {() => updateDrinkCount(type.drink_name,-1)} className="btn btn-primary">-</button>
              </div>
              </div> 
    )))
}

const DrinkCard = ({updateDrinkCount}) => {
    const drink_types = [{
        drink_id: 0,
        drink_name:"Fountain",
        drink_price: 2.50
    },{
        drink_id: 1,
        drink_name:"Bottled",
        drink_price: 2.50
    }]


    return (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add Drinks</h5>
            <div className="card-text container w-auto">
                <DrinkRows updateDrinkCount={updateDrinkCount} drink_types={drink_types} />
            
            </div> 
            
            
          </div>
          </div>
    );
}

export default DrinkCard;