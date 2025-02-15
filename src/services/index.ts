import axios from "axios";
import { API_URL } from "./const";

let apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;