import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 1000 * 10,
});

export const api = axiosInstance;
