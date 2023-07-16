import axios, { AxiosInstance } from "axios";

const app = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});
console.log(process.env.API_URL);
const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  patch: app.patch,
};

export default http;
