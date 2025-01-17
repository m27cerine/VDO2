import axios from "axios";
const BASE_URL = 'http://localhost:8000/api/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json"
  }
});
