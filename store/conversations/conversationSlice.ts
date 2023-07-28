import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import { Conversation } from "../../utils/types/types";
import { fetchConversationThunk } from "./thunkConversation";

// Define a type for the slice state
export interface ConversationsState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ConversationsState = {
  conversations: [],
  loading: false,
  error: null,
};

export const conversationSlice = createSlice({
  name: "conversationsSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log("addConversation");
      state.conversations.unshift(action.payload);
    },

    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log(action.payload);
      const conversation = action.payload;

      const findedConversationIndex = state.conversations.findIndex(
        (c) => c.id === conversation.id
      );

      state.conversations.splice(findedConversationIndex, 1);
      state.conversations.unshift(conversation);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchConversationThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.conversations = action.payload.data;
    });
    builder.addCase(fetchConversationThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchConversationThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = "Oooops something unexpected went wrong";
    });
  },
});

export const { addConversation, updateConversation } =
  conversationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectConversation = (state: RootState) =>
  state.conversation.conversations;

export default conversationSlice.reducer;
