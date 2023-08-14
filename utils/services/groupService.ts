import {
  AddUserToGroupParams,
  AddUserToGroupResponse,
  CreateGroupParams,
  Group,
} from "../types/types";
import http from "./httpService";

export function getGroups() {
  return http.get<Group[]>("/group/getGroups");
}

export function postcreateGroup(data: CreateGroupParams) {
  return http.post<Group>("group/createGroup", data);
}

export function postAddUserToGroup(data: AddUserToGroupParams) {
  return http.post<AddUserToGroupResponse>(
    `groups/${data.groupId}/addRecipient`,
    {
      username: data.username,
    }
  );
}
