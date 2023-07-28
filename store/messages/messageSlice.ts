import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ConversationMessage,
  MessageEventPayload,
  MessageType,
} from "../../utils/types/types";
import {
  createConversationMessageThunk,
  fetchConversationMessagesThunk,
} from "./thunkMessages";
import { RootState } from "../index";

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],

  loading: false,
};

export const messagesSlice = createSlice({
  name: "messagesSlice",
  initialState,

  reducers: {
    addMessages: (state, action: PayloadAction<MessageEventPayload>) => {
      console.log(action.payload);
      const { conversation, message } = action.payload;

      const findedLocalConversation = state.messages.find(
        (cm) => cm.conversationId == conversation.id
      );

      findedLocalConversation?.messages.unshift(message);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchConversationMessagesThunk.fulfilled,
      (state, action) => {
        const { conversationId, messages } = action.payload.data;
        const index = state.messages.findIndex(
          (cm) => cm.conversationId === conversationId
        );
        const exists = state.messages.find(
          (cm) => cm.conversationId === conversationId
        );
        if (exists) {
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
      }
    );
  },
});

export const { addMessages } = messagesSlice.actions;

export const selectMessage = (state: RootState) => state.message.messages;

export default messagesSlice.reducer;
