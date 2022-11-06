const DrinkRows = ({drink_types}) => {

    return (drink_types.map((type) => (
        <div key={type.drink_id} className ="row my-2">
              <div className="col-8">
                {type.drink_name}
              </div>
              <div className="col-2">
              <a href ="/server" className="btn btn-primary">+</a>
              </div>
              <div className="col-2">
              <a href="/server" className="btn btn-primary">-</a>
              </div>
              </div> 
    )))
}

const DrinkCard = () => {
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
                <DrinkRows drink_types={drink_types} />
            
            </div> 
            
            
          </div>
          </div>
    );
}

export default DrinkCard;