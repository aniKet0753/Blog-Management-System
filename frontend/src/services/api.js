import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-management-system-x7wu.onrender.com/api",
});

export default api;
