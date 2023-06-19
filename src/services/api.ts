import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44359/api",
});

export default api;