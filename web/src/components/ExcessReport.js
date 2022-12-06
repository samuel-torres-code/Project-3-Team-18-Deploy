import { useState } from "react";
import DatePicker from "react-datepicker";
import dateFormat, { masks } from "dateformat";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { getExcessReport } from "../api/ReportAPI";

const ExcessReport = ({ setAlertText, setShowAlert }) => {
  const [startDate, setStartDate] = useState(null);
  const [ingredientData, setIngredientData] = useState([]);

  const handleGenerateReport = () => {
    if (startDate === null || typeof startDate === undefined) {
      setAlertText("Please enter a start date.");
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    getExcessReport(dateFormat(startDate, "yyyy-mm-dd")).then((res) => {
      setIngredientData(res.ingredients);
      // console.log(res.ingredients);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <p>This is the excess report starting at the specified date.</p>
            
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Start Date"
                  className="form-control"
                />
                <div className="text-center my-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleGenerateReport()}
                  >
                    Generate
                  </button>
                  </div>
                
            
          </div>
          <div className="col-xs-12 col-md-8">
            <div
              className="border border-dark mx-5"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <table className="w-100">
                <thead className="table-header position-sticky">
                  <tr>
                    <th className="px-1">Ingredient</th>
                    <th className="px-1">Sales</th>
                    <th className="px-1">Inventory</th>
                    <th className="px-1">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientData.map((val, key) => {
                    return (
                      <tr
                        key={key}
                        className="table-row border-top border-secondary"
                      >
                        <td>{val.ingredient_name}</td>
                        <td>{val.sales}</td>
                        <td>{val.inventory}</td>
                        <td>{parseFloat(val.percentage).toFixed(2)}%</td>
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

export default ExcessReport;
