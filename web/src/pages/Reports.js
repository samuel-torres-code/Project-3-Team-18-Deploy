import { useEffect, useState } from "react";
import useMenu from "../hooks/useMenu";
import useOrder from "../hooks/useOrder";
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

  if (condrender) {
    return (
      <span className="translate">
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
              <span className="translate" style={{pointerEvents: "none"}}>
              Sales Report </span>
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
                <span className="translate" style={{pointerEvents: "none"}}>
              Excess Report</span>
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
                <span className="translate" style={{pointerEvents: "none"}}>
              Restock Report </span>
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
                <span className="translate" style={{pointerEvents: "none"}}>
              Honors Addendum </span>
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
        {loadTab === "Restock Report" && (
          <RestockReport
            setShowAlert={setShowAlert}
            setAlertText={setAlertText}></RestockReport>
        )}
        {loadTab === "Honors Addendum" && (
          <HonorsReport
            setShowAlert={setShowAlert}
            setAlertText={setAlertText}></HonorsReport>
        )}
      </div>
      </span>
    );
  }
};

export default Reports;
