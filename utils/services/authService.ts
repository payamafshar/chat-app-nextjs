import { LoginUserParams, RegisterUserParams, User } from "../types/types";
import http from "./httpService";

export function postRegisterUser(data: RegisterUserParams) {
  return http.post("/auth/register", data);
}
export function postLoginUser(data: LoginUserParams) {
  return http.post("/auth/login", data);
}
export const getAuthUser = () => http.get<User>(`/auth/status`);

export function searchUsers(query: string) {
  return http.get<User[]>(`/users/search?query=${query}`);
}
