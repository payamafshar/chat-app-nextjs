import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroups, postcreateGroup } from "../../utils/services/groupService";
import { CreateGroupParams } from "../../utils/types/types";

export const fetchGroupThunk = createAsyncThunk("fetch/groups", async () => {
  return getGroups();
});

export const createGroupThunk = createAsyncThunk(
  "create/group",
  async (data: CreateGroupParams) => {
    return postcreateGroup(data);
  }
);
