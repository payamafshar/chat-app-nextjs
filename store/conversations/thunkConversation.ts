import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getConversations,
  getConversationById,
  postCreateConversation,
} from "../../utils/services/conversationService";
import { CreateConversationParams } from "../../utils/types/types";

export const fetchConversationThunk = createAsyncThunk(
  "fetch/Conversation",
  async () => {
    return getConversations();
  }
);

export const createConversationThunk = createAsyncThunk(
  "create/conversation",
  async (data: CreateConversationParams) => {
    return postCreateConversation(data);
  }
);
