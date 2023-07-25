import { createSlice } from "@reduxjs/toolkit";
import { ConversationMessage } from "../../utils/types/types";
import { fetchConversationMessagesThunk } from "./thunkMessages";
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
    addMessages: (state) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchConversationMessagesThunk.fulfilled,
      (state, action) => {
        console.log("inside reducer");
        console.log(state.messages.length);
        const { conversationId, messages } = action.payload.data;
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
  },
});

export const {} = messagesSlice.actions;

export const selectMessage = (state: RootState) => state.message.messages;

export default messagesSlice.reducer;
