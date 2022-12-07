
import useImage from "../hooks/useImage";
import "./ItemButton.css";

/**
 * Component for a formatted button containing the text and given image if provided
 * @param {Object} param0 Object containing the necessary dependencies for the given component
 * @returns a formatted button containing the text and given image if provided
 */
const ItemButton = ({ selected = false, cardText, imgName, onClick }) => {
  const { loading, error, image } = useImage(imgName);
  return (
    <div
      style={{ minWidth: "130px" }}
      className={`col-3 mx-3 my-3 card grow ${selected ? "selected" : ""}`}
      onClick={onClick}>
      <div
        className="card-body text-center my-2 px-0 fs-5 d-flex align-items-center"
        data-user={cardText}>
        <span className="translate mx-auto" style={{ pointerEvents: "none" }}>
          {cardText ? cardText : "No text"}
        </span>
      </div>
    </div>
  );
};

export default ItemButton;
