import axios from "axios";
import mockitup from "./mockitup";
const API_URL = "http://api.linkyun.co/";
let apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


if(process.env.NODE_ENV === 'development'){
    apiClient = mockitup(apiClient);
}

export default apiClient;