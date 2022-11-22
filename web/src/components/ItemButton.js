import "./ItemButton.css";
import useImage from "../hooks/useImage";
import(`../images/loader_pizza.gif`);
import(`../images/image_not_found.png`);

const ItemButton = ({selected = false,cardText, imgName, onClick}) => {
    const { loading, error, image } = useImage(imgName)
    if(imgName) {
        return (
            <div className={`col-3 mx-3 my-3 card grow ${selected?"selected":""}`} onClick={onClick}>
                {imgName && <img src={loading? '../images/loader_pizza.gif' : image} alt={cardText? error? error: cardText : "No alt text"}/>}
                <div className="card-body text-center mx-4 my-2">
                    {cardText? cardText : "No text"}
                </div>
            </div>
            
        )
    }
    else {
        return (
            <div className={`col-3 mx-3 my-3 card grow ${selected?"selected":""}`} onClick={onClick}>
                <div className="card-body text-center mx-4 my-2">
                    {cardText? cardText : "No text"}
                </div>
            </div>
            
        )
    }
}

export default ItemButton;
