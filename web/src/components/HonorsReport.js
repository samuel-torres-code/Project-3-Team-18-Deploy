import { useState } from "react";
import DatePicker from "react-datepicker";
import dateFormat, { masks } from "dateformat";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { getHonorsReport } from "../api/ReportAPI";

const HonorsReport = ({ setAlertText, setShowAlert }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

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
        getHonorsReport(dateFormat(startDate, "yyyy-mm-dd"),dateFormat(endDate, "yyyy-mm-dd")).then((res)=> {
            console.log(res)
        })
          
        
      };

    return (<> 
        <div className="container" >
            <div className="row">
                <div className="col-xs-12 col-md-4">
                <p>This report shows the sales by employee given a certain date range.</p>
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
                    onClick={() => handleGenerateReport()}
                  >
                    Generate
                  </button>
                  </div>
                </div>
                <div className="col-xs-12 col-md-8">
                    
                </div>
            </div>
        </div>
    </>)
}

export default HonorsReport;