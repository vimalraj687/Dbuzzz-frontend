import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // backend base url
  withCredentials: true, // cookie support
});

export default api;
