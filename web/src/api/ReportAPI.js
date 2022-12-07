import axios from "axios";
import { API_URL } from "../API";

const client = axios.create({
  baseURL: API_URL,
});

/**
 * Calls api to get the data for the excess report given the start date
 * @param {string} start_date "YYYY-MM-DD" date string
 * @returns a list objects describing ingredients and their associated data
 */
export const getExcessReport = (start_date) => {
  return client
    .post("/api/reports/excess", {
      start_time: start_date,
    })
    .then((res) => {
      return res.data;
    });
};

/**
 * Calls api to get the data for the honors report given the start date and end date
 * @param {string} start_date "YYYY-MM-DD" date string
 * @param {string} end_date "YYYY-MM-DD" date string
 * @returns a list objects describing employees and their sales
 */
  export const getHonorsReport = (start_date,end_date) => {
    return client.post("/api/reports/honors", {
        start_time: start_date,
        end_time: end_date,
    }).then((res) => {
      return res.data
    });
};

/**
 * Calls api to get the data for the sales report given the start date and end date
 * @param {string} start_date "YYYY-MM-DD" date string
 * @param {string} end_date "YYYY-MM-DD" date string
 * @returns a list objects describing ingredients and their sales
 */
export const getSalesReport = (start_date, end_date) => {
  return client
    .post("/api/reports/sales", {
      start_time: start_date,
      end_time: end_date,
    })
    .then((res) => {
      return res.data;
    });
};

/**
 * Calls api to get the data for the restock report
 * @returns a list objects describing ingredients and their inventories
 */
export const getRestockReport = () => {
  return client.get("/api/reports/restock", {}).then((res) => {
    return res.data;
  });
};
