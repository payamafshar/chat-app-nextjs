import { LoginUserParams, RegisterUserParams, User } from "../types/types";
import http from "./httpService";

export function postRegisterUser(data: RegisterUserParams) {
  return http.post("http://localhost:3001/api/auth/register", data);
}
export function postLoginUser(data: LoginUserParams) {
  return http.post("http://localhost:3001/api/auth/login", data);
}
export const getAuthUser = () =>
  http.get<User>(`http://localhost:3001/api/auth/status`);
