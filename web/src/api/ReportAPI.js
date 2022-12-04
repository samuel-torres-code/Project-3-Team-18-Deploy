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