import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllGroupMessages,
  postCreateGroupMessage,
} from "../../utils/services/groupMessageService";
import { CreateGroupMessageParams } from "../../utils/types/types";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "fetch/groupMesasge",
  async (groupId: number) => {
    return getAllGroupMessages(groupId);
  }
);
