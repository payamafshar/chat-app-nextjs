import {
  AddUserToGroupParams,
  AddUserToGroupResponse,
  CreateGroupParams,
  DeleteUserFromGroupParams,
  DeleteUserFromGroupResponse,
  Group,
  TransferAdminParams,
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
export function deleteUserFromGroup(data: DeleteUserFromGroupParams) {
  return http.delete<DeleteUserFromGroupResponse>(
    `groups/${data.groupId}/deleteRecipient/${data.recipientId}`
  );
}
export function fetchGroupByIdGuard(groupId: number) {
  return http.get<Group>(`group/find/${groupId}`);
}
export function patchTransferAdmin(data: TransferAdminParams) {
  return http.patch<Group>(`group/owner/${data.groupId}`, {
    username: data.username,
  });
}

export function postUserLeaveGroup(groupId: number) {
  return http.post(`group/${groupId}/leave`);
}
