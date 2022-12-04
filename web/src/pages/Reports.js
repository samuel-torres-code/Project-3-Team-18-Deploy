import { useEffect, useState } from "react";
import useMenu from "../hooks/useMenu";
import useOrder from "../hooks/useOrder";
import Alert from "react-bootstrap/Alert";
import ExcessReport from "../components/ExcessReport";
import HonorsReport from "../components/HonorsReport";

const Reports = () => {
  const [loadTab, setLoadTab] = useState("Sales Report");
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(false);

  const {
    orderLoading,
    orderError,
    order,
    setOrderName,
    addNewPizza,
    // updatePizza,
    deletePizza,
    addDrink,
    addItem,
    deleteItem,
    deleteDrink,
    clearOrder,
  } = useOrder([]);

  const { menuLoading, menuError, itemTypes, ingredients_by_type } = useMenu(
    []
  );

  function makeAlert(text) {
    setAlertText(text);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  }

  function handleSwitchTab(event) {
    setLoadTab(event.target.value);
  }

  if (menuError || orderError) {
    return (
      <div>
        <p>Menu Error: {menuError}</p>
        <p>Order Error: {orderError}</p>
      </div>
    );
  } else if (menuLoading || orderLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img
          src={require("../loader_pizza.gif")}
          alt="Loading"
          style={{ width: "15vw", height: "auto" }}
        />
      </div>
    );
  } else {
    return (
      <div className="container">
        <ul className="nav nav-tabs justify-content-center my-3">
          <li className="nav-item">
            <button
              className={
                loadTab === "Sales Report"
                  ? "nav-link fw-bolder fs-5 active link-primary"
                  : "nav-link fw-bolder fs-5 link-secondary"
              }
              value="Sales Report"
              onClick={handleSwitchTab}>
              Sales Report
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                loadTab === "Excess Report"
                  ? "nav-link fw-bolder fs-5 active link-primary"
                  : "nav-link fw-bolder fs-5 link-secondary"
              }
              value="Excess Report"
              onClick={handleSwitchTab}>
              Excess Report
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                loadTab === "Restock Report"
                  ? "nav-link fw-bolder fs-5 active link-primary"
                  : "nav-link fw-bolder fs-5 link-secondary"
              }
              value="Restock Report"
              onClick={handleSwitchTab}>
              Restock Report
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                loadTab === "Seasonal Items"
                  ? "nav-link fw-bolder fs-5 active link-primary"
                  : "nav-link fw-bolder fs-5 link-secondary"
              }
              value="Seasonal Items"
              onClick={handleSwitchTab}>
              Seasonal Items
            </button>
          </li>
          <li className="nav-item">
            <button
              className={
                loadTab === "Honors Addendum"
                  ? "nav-link fw-bolder fs-5 active link-primary"
                  : "nav-link fw-bolder fs-5 link-secondary"
              }
              value="Honors Addendum"
              onClick={handleSwitchTab}>
              Honors Addendum
            </button>
          </li>
        </ul>
        {showAlert ? (
          <Alert
            variant="primary"
            onClose={() => setShowAlert(false)}
            dismissible>
            {alertText}
          </Alert>
        ) : (
          // add spacing for alert
          <div style={{ height: "58px" }}></div>
        )}
        {loadTab === "Sales Report" && <h1>Sales Report</h1>}
        {loadTab === "Excess Report" && <ExcessReport setShowAlert={setShowAlert} setAlertText={setAlertText}></ExcessReport>}
        {loadTab === "Restock Report" && <h1>Restock Report</h1>}
        {loadTab === "Seasonal Items" && <h1>Seasonal Items</h1>}
        {loadTab === "Honors Addendum" && <HonorsReport setShowAlert={setShowAlert} setAlertText={setAlertText}></HonorsReport>}
      </div>
    );
  }
};

export default Reports;
