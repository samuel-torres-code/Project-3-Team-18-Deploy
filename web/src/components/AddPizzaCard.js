/**
 * Component for formatted card containing inputs for adding a pizza
 * @param {Object} param0 Object containing the neccessary dependencies for the component
 * @returns a formatted card containing inputs for adding a pizza
 */
const AddPizzaCard = ({handleAddPizza,pizza_types,disabled}) => {
    return (
        <span className='translate'>
        <div className="card text-center">
            <div className="card-text container my-2">
                <h5 className="card-title"> <span className='translate'>Add Items</span></h5>
                <div className="btn-group-vertical" role="group" aria-label="Pizza Type Selector">
                    {pizza_types.map((type) => {
                        return <button disabled={disabled} key={type.pizza_type} type="button" className="btn btn-primary" onClick= {() => handleAddPizza(type.pizza_type,`${type.pizza_price}`)}>{type.pizza_type}</button>
                    })}
                </div>
            </div>
        </div>
        </span>
    )
}

export default AddPizzaCard;