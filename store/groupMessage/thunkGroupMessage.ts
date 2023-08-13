import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteGroupMessage,
  getAllGroupMessages,
  patchEditGroupMessage,
} from "../../utils/services/groupMessageService";
import {
  DeleteGroupMessageParams,
  EditGroupMessageParams,
} from "../../utils/types/types";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "fetch/groupMesasge",
  async (groupId: number) => {
    return getAllGroupMessages(groupId);
  }
);

export const deleteGroupMessageThunk = createAsyncThunk(
  "delete/groupMessage",
  async (data: DeleteGroupMessageParams) => {
    return deleteGroupMessage(data);
  }
);
export const editGroupMessageThunk = createAsyncThunk(
  "edit/groupMessage",
  async (data: EditGroupMessageParams) => {
    return patchEditGroupMessage(data);
  }
);
