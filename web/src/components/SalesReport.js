import { useState } from "react";
import DatePicker from "react-datepicker";
import dateFormat, { masks } from "dateformat";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { getSalesReport } from "../api/ReportAPI";

const SalesReport = ({ setAlertText, setShowAlert }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState([]);

  const handleGenerateReport = () => {
    if (startDate === null || typeof startDate === undefined) {
      setAlertText("Please enter a start date.");
      setShowAlert(true);
      return;
    }
    if (endDate === null || typeof endDate === undefined) {
      setAlertText("Please enter a end date.");
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    getSalesReport(
      dateFormat(startDate, "yyyy-mm-dd"),
      dateFormat(endDate, "yyyy-mm-dd")
    ).then((res) => {
      setSalesData(res["sales"]);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <p>
              This report shows the sales by menu item given a certain date
              range.
            </p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Start Date"
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control mb-2"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="form-control"
            />
            <div className="text-center my-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleGenerateReport()}>
                Generate
              </button>
            </div>
          </div>
          <div className="col-xs-12 col-md-8">
            <div
              className="border border-dark mx-5"
              style={{ maxHeight: "60vh", overflowY: "auto" }}>
              <table className="w-100">
                <thead className="table-header position-sticky">
                  <tr>
                    <th className="px-1">Menu Item</th>
                    <th className="px-1">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((val, key) => {
                    return (
                      <tr
                        key={key}
                        className="table-row border-top border-secondary">
                        <td>{val.item_name}</td>
                        <td>${val.sales}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
