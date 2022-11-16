
const AddPizzaCard = ({handleAddPizza,pizza_types,disabled}) => {
    return (
        <div className="card">
            <div className="card-text container my-2">
                <h5 className="card-title">Add Items</h5>
                <div className="btn-group-vertical" role="group" aria-label="Pizza Type Selector">
                    {pizza_types.map((type) => {
                        return <button disabled={disabled} key={type.pizza_type} type="button" className="btn btn-primary" onClick= {() => handleAddPizza(type.pizza_type,`${type.pizza_price}`)}>{type.pizza_type}</button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default AddPizzaCard;