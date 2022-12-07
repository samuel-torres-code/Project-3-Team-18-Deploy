import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import ExcessReport from "../components/ExcessReport";
import HonorsReport from "../components/EmployeeSalesReport";
import SalesReport from "../components/SalesReport";
import RestockReport from "../components/RestockReport";

const Reports = () => {
  const [loadTab, setLoadTab] = useState("Sales Report");
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState(false);
  const [condrender, setcondrender] = useState(localStorage.getItem("manager"));

  function handleSwitchTab(event) {
    setLoadTab(event.target.value);
  }

  if (condrender) {
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
        {loadTab === "Sales Report" && (
          <SalesReport
            setShowAlert={setShowAlert}
            setAlertText={setAlertText}></SalesReport>
        )}
        {loadTab === "Excess Report" && (
          <ExcessReport
            setShowAlert={setShowAlert}
            setAlertText={setAlertText}></ExcessReport>
        )}
        {loadTab === "Restock Report" && <RestockReport></RestockReport>}
        {loadTab === "Honors Addendum" && (
          <HonorsReport
            setShowAlert={setShowAlert}
            setAlertText={setAlertText}></HonorsReport>
        )}
      </div>
    );
  }
};

export default Reports;
