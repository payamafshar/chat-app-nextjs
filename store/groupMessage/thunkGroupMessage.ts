import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteGroupMessage,
  getAllGroupMessages,
} from "../../utils/services/groupMessageService";
import { DeleteGroupMessageParams } from "../../utils/types/types";

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
