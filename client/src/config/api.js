import axios from "axios";
// Base URL
export const API = axios.create({
  baseURL: "http://192.168.1.5:5000/api/todo/",
});
