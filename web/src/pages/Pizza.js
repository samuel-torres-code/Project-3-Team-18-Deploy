import ItemButton from "../components/ItemButton"



const Pizza = () => {
    const buttonClick = () => {
        alert('button click')
    }

    return (
        <div className="container">
            <div className="row">
                {/* <ItemButton imgName={"scary_pizza.png"} cardText="Not Found" onClick={buttonClick} ></ItemButton> */}
            </div>

        </div>
    )
}

export default Pizza