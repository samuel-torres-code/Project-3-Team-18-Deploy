const SeasonalItemCard = ({handleAddSeasonalItem,seasonal_item_types,disabled}) => {
    return (
        <span className='translate'>
        <div className="card">
            <div className="card-text container my-2">
                <h5 className="card-title"> <span className='translate'>Add Seasonal Items</span></h5>
                <div className="btn-group-vertical" role="group" aria-label="Seasonal Item Selector">
                    {seasonal_item_types.map((type) => {
                        return <button disabled={disabled} key={type.item_name} type="button" className="btn btn-primary" onClick={() => {handleAddSeasonalItem(type)}} >{type.item_name}</button>
                    })}
                </div>
            </div>
        </div>
        </span>
    )
}

export default SeasonalItemCard;