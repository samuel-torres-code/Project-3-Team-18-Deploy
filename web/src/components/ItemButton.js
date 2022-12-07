import "./ItemButton.css";

/**
 * Component to display a clickable button for each menu item.
 * @param {boolean} selected
 * @param {string} cardText
 * @param {function} onClick
 * @returns html to display a button
 */
const ItemButton = ({ selected = false, cardText, onClick }) => {
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
