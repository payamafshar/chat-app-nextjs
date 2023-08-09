import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  GroupMessage,
  GroupMessageEventPayload,
} from "../../utils/types/types";
import { fetchGroupMessagesThunk } from "./thunkGroupMessage";

//GroupMessageType -> groupId & message
interface GroupMessageState {
  messages: GroupMessage[];
}

const initialState: GroupMessageState = {
  messages: [],
};

const groupMessageSlice = createSlice({
  name: "groupMessageSlice",
  initialState,

  reducers: {
    addGroupMessage: (
      state,
      action: PayloadAction<GroupMessageEventPayload>
    ) => {
      const { group, message } = action.payload;
      const findedGroupMessage = state.messages.find(
        (gm) => gm.groupId == group.id
      );

      findedGroupMessage?.messages.unshift(action.payload.message);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
      const { groupId } = action.payload.data;

      const checkExistGroupMessage = state.messages.find(
        (gm) => gm.groupId == groupId
      );

      const findedGroupMessageIndex = state.messages.findIndex(
        (gm) => gm.groupId == groupId
      );

      checkExistGroupMessage
        ? (state.messages[findedGroupMessageIndex] = action.payload.data)
        : state.messages.unshift(action.payload.data);
    });
  },
});

export const { addGroupMessage } = groupMessageSlice.actions;

export default groupMessageSlice.reducer;
