import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMessagesFromConversation,
  createMessage,
} from "../../utils/services/messageService";
import { CreateMessageParams } from "../../utils/types/types";

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
