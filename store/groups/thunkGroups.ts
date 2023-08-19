import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUserFromGroup,
  fetchGroupByIdGuard,
  getGroups,
  patchTransferAdmin,
  postAddUserToGroup,
  postUserLeaveGroup,
  postcreateGroup,
} from "../../utils/services/groupService";
import {
  AddUserToGroupParams,
  CreateGroupParams,
  DeleteUserFromGroupParams,
  TransferAdminParams,
} from "../../utils/types/types";

export const fetchGroupThunk = createAsyncThunk("fetch/groups", async () => {
  return getGroups();
});

export const createGroupThunk = createAsyncThunk(
  "create/group",
  async (data: CreateGroupParams) => {
    return postcreateGroup(data);
  }
);

export const addUserToGroupThunk = createAsyncThunk(
  "addUser/group",
  async (data: AddUserToGroupParams) => {
    return postAddUserToGroup(data);
  }
);

export const deleteUserFromGroupThunk = createAsyncThunk(
  "deleteUser/group",
  async (data: DeleteUserFromGroupParams) => {
    return deleteUserFromGroup(data);
  }
);
export const fetchGroupByIdThunk = createAsyncThunk(
  "fetchById/group",
  async (groupId: number) => {
    return fetchGroupByIdGuard(groupId);
  }
);
export const transferAdminThunk = createAsyncThunk(
  "fetchById/group",
  async (data: TransferAdminParams) => {
    return patchTransferAdmin(data);
  }
);

export const userLeaveGroupThunk = createAsyncThunk(
  "user/leave",
  async (groupId: number) => {
    return postUserLeaveGroup(groupId);
  }
);
