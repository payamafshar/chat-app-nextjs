import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ConversationMessage,
  DeleteMessageResponse,
  MessageEventPayload,
  MessageType,
} from "../../utils/types/types";
import {
  createConversationMessageThunk,
  deleteMessageThunk,
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

    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      const { conversationId, messageId } = action.payload;

      const conversationMessages = state.messages.find(
        (c) => c.conversationId == conversationId
      );

      if (!conversationMessages) return;
      const findedMessageIndex = conversationMessages?.messages.findIndex(
        (m) => m.id == messageId
      );

      conversationMessages.messages.splice(findedMessageIndex, 1);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchConversationMessagesThunk.fulfilled,
      (state, action) => {
        const { conversationId, messages } = action.payload.data;

        console.log({ fff: action.payload.data });
        const index = state.messages.findIndex(
          (cm) => cm.conversationId === conversationId
        );
        const exists = state.messages.find(
          (cm) => cm.conversationId === conversationId
        );
        if (exists) {
          console.log("exists");
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
      }
    );

    builder.addCase(deleteMessageThunk.fulfilled, (state, action) => {
      console.log(action.payload);

      const { conversationId, messageId } = action.payload.data;

      const conversationMessages = state.messages.find(
        (c) => c.conversationId == conversationId
      );

      if (!conversationMessages) return;
      const findedMessageIndex = conversationMessages?.messages.findIndex(
        (m) => m.id == messageId
      );

      conversationMessages.messages.splice(findedMessageIndex, 1);
    });
  },
});

export const { addMessages, deleteMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
