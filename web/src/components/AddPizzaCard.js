
const AddPizzaCard = ({handleAddPizza}) => {
    return (
        <div className="card">
            <div className="card-text container w-auto">
                <h5 className="card-title">Add Items</h5>
                <div className="btn-group" role="group" aria-label="Pizza Type Selector">
                    <button type="button" className="btn btn-primary" onClick= {() => handleAddPizza('build-your-own','$4.99')}>build-your-own</button>
                    <button type="button" className="btn btn-primary" onClick= {() => handleAddPizza('cheese','$3.00')} >cheese</button>
                    <button type="button" className="btn btn-primary" onClick= {() => handleAddPizza('one-topping','$4.00')}>one-topping</button>
                </div>
            </div>
        </div>
    )
}

export default AddPizzaCard;