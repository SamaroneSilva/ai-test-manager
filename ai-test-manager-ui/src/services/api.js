import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL do seu backend Express
});

export default api;
