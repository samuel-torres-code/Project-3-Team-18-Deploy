import "./IngredientItemButton.css";
import useImage from "../hooks/useImage";
import(`../images/loader_pizza.gif`);
import(`../images/image_not_found.png`);

/**
 * Component for a formatted button containing the text and given image if provided
 * @param {Object} param0 Object containing the necessary dependencies for the given component
 * @returns a formatted button containing the text and given image if provided
 */
const IngredientItemButton = ({selected = false,cardText, imgName, onClick}) => {
    const { loading, error, image } = useImage(imgName)
    if(imgName) {
        return (
            
            <div className={`col-md-3 col-sm-4 col-xs-12 mx-3 my-3 card grow ${selected?"selected":""}`} onClick={onClick}>
                {imgName && <img src={loading? '../images/loader_pizza.gif' : image} alt={cardText? error? error: cardText : "No alt text"}/>}
                <div className="card-body text-center mx-4 my-2">
                <span className='translate'>{cardText? cardText : "No text"}</span>
                </div>
            </div>
        )
    }
    else {
        return (
            
            <div className={`col-lg-3 col-md-4 col-sm-6 col-xs-12 mx-3 my-3 card grow ${selected?"selected":""}`} onClick={onClick}>
                <div className="card-body text-center mx-4 my-2">
                <span className='translate'>{cardText? cardText : "No text"}</span>
                </div>
            </div>
            
        )
    }
}

export default IngredientItemButton;
