import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteUserFromGroup,
  getGroups,
  postAddUserToGroup,
  postcreateGroup,
} from "../../utils/services/groupService";
import {
  AddUserToGroupParams,
  CreateGroupParams,
  DeleteUserFromGroupParams,
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
