import axios, { AxiosInstance } from "axios";

const app = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  patch: app.patch,
};

export default http;
