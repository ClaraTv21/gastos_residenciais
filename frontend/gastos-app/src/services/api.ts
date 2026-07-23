import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ajuste conforme a porta do seu backend
});

export default api;