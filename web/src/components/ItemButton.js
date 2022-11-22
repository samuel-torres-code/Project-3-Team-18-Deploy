import "./ItemButton.css";
import useImage from "../hooks/useImage";
import(`../images/loader_pizza.gif`);
import(`../images/image_not_found.png`);

const ItemButton = ({ selected = false, cardText, imgName, onClick }) => {
  const { loading, error, image } = useImage(imgName);
  return (
    <div
      className={`col-3 mx-3 my-3 card grow ${selected ? "selected" : ""}`}
      onClick={onClick}>
      <img
        src={loading ? "../images/loader_pizza.gif" : image}
        alt={cardText ? (error ? error : cardText) : "No alt text"}
      />
      <div className="card-body text-center mx-4 my-2" data-user={cardText}>
        {cardText ? cardText : "No text"}
      </div>
    </div>
  );
};

export default ItemButton;
