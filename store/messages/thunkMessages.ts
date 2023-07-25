import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessagesFromConversation } from "../../utils/services/messageService";

export const fetchConversationMessagesThunk = createAsyncThunk(
  "fetch/conversationMessage",
  async (conversationId: number) => {
    return getMessagesFromConversation(conversationId);
  }
);
