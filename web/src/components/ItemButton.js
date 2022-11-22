import "./ItemButton.css";
import useImage from "../hooks/useImage";
import(`../images/loader_pizza.gif`);
import(`../images/image_not_found.png`);

const ItemButton = ({cardText, imgName, onClick}) => {
    const { loading, error, image } = useImage(imgName)
    return (
        <div className="col-3 card grow" onClick={onClick} style={{minWidth:"130px"}}>
            {/* <img className="mt-2" src={loading? '../images/loader_pizza.gif' : image} alt={cardText? error? error: cardText : "No alt text"}/> */}
            <div className="card-body text-center my-2">
                {cardText? cardText : "No text"}
            </div>
        </div>
    )
}

export default ItemButton;
