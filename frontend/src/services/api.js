import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

export const fetchMetrics = () =>
  API.get("/metrics");

export const fetchAutomationRanking =
  () =>
    API.get(
      "/automation-ranking"
    );

export const fetchAnomalies = () =>
  API.get("/anomalies");

export const fetchEmployees = () =>
  API.get("/employees");

export const fetchJoinedData = () =>
  API.get("/joined-data");

export default API;