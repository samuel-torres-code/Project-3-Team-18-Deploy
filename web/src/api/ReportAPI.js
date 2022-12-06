import axios from "axios";
import { API_URL } from "../API";

const client = axios.create({
  baseURL: API_URL,
});

export const getExcessReport = (start_date) => {
    return client.get("/api/reports/excess", {
        start_time: start_date
    }).then((res) => {
      return res.data
    });
  };

  export const getHonorsReport = (start_date,end_date) => {
    return client.get("/api/reports/honors", {
        start_time: start_date,
        end_time: end_date,
    }).then((res) => {
      return res.data
    });
  };