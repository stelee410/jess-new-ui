import axios from "axios";
const API_URL = "http://api.linkyun.co/";
let apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export default apiClient;