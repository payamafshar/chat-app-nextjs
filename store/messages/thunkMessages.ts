import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMessagesFromConversation,
  createMessage,
  deleteMessageApi,
} from "../../utils/services/messageService";
import {
  CreateMessageParams,
  DeleteMessageParams,
} from "../../utils/types/types";

export const fetchConversationMessagesThunk = createAsyncThunk(
  "fetch/conversationMessage",
  async (conversationId: number) => {
    return getMessagesFromConversation(conversationId);
  }
);
export const createConversationMessageThunk = createAsyncThunk(
  "create/conversationMessage",
  async (data: CreateMessageParams) => {
    return createMessage(data);
  }
);
export const deleteMessageThunk = createAsyncThunk(
  "delete/message",
  async (params: DeleteMessageParams) => {
    return deleteMessageApi(params);
  }
);
