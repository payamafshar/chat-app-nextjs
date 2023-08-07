import { Group } from "../types/types";
import http from "./httpService";

export function getGroups() {
  return http.get<Group[]>("/group/getGroups");
}
