import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { getRestockReport } from "../api/ReportAPI";

const RestockReport = () => {
  const [restockData, setRestockData] = useState([]);

  /**
   * Loads data necessary for the report.
   */
  const handleGenerateReport = () => {
    getRestockReport().then((res) => {
      setRestockData(res["ingredients"]);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <p>
              This report shows the ingredients that need to be restocked and
              the percentage below the fill level they are at.
            </p>
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
                    <th className="px-1">Ingredient</th>
                    <th className="px-1">Inventory</th>
                    <th className="px-1">Percentage</th>
                    <th className="px-1">Fill Level</th>
                  </tr>
                </thead>
                <tbody>
                  {restockData.map((val, key) => {
                    return (
                      <tr
                        key={key}
                        className="table-row border-top border-secondary">
                        <td>{val.ingredient_name}</td>
                        <td>{val.inventory}</td>
                        <td>{parseFloat(val.percentage).toFixed(2)}%</td>
                        <td>{val.fill_level}</td>
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

export default RestockReport;
