import { LoginUserParams, RegisterUserParams } from "../types/types";
import http from "./httpService";

export function registerUser(data: RegisterUserParams) {
  return http
    .post("http://localhost:3001/api/auth/register", data)
    .then((data) => data);
}
export function loginUser(data: LoginUserParams) {
  return http
    .post("http://localhost:3001/api/auth/login", data)
    .then((data) => data);
}
