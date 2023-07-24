import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getConversations,
  getConversationById,
} from "../../utils/services/conversationService";

export const fetchConversationThunk = createAsyncThunk(
  "fetch/Conversation",
  async () => {
    return getConversations();
  }
);
