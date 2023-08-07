import { createAsyncThunk } from "@reduxjs/toolkit";
import { getGroups } from "../../utils/services/groupService";

export const fetchGroupThunk = createAsyncThunk("fetch/groups", async () => {
  return getGroups();
});
