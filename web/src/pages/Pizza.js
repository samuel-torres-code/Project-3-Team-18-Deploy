import ItemButton from "../components/ItemButton"



const Pizza = () => {
    const buttonClick = () => {
        alert('button click')
    }

    return (
        <div className="container">
            <div className="row">
                <ItemButton imgName={"loader_pizza.gif"} cardText="Joey sucks eggs af" onClick={buttonClick} ></ItemButton>
            </div>

        </div>
    )
}

export default Pizza