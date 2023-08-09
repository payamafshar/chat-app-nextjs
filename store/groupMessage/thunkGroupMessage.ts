import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllGroupMessages } from "../../utils/services/groupMessageService";
import { CreateGroupMessageParams } from "../../utils/types/types";

export const fetchGroupMessagesThunk = createAsyncThunk(
  "fetch/groupMesasge",
  async (groupId: number) => {
    return getAllGroupMessages(groupId);
  }
);

// export const createGroupMessageThunk = createAsyncThunk(
//   "create/groupMessage",
//   async (data: CreateGroupMessageParams) => {
//     return postCreateGroupMessage(data);
//   }
// );
