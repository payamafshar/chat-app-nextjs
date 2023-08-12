import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DeleteGroupMessageEventPayload,
  GroupMessage,
  GroupMessageEventPayload,
} from "../../utils/types/types";
import {
  deleteGroupMessageThunk,
  fetchGroupMessagesThunk,
} from "./thunkGroupMessage";

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

    deleteGroupMessageReducer: (
      state,
      action: PayloadAction<DeleteGroupMessageEventPayload>
    ) => {
      const { groupId, messageId } = action.payload;

      console.log("inside asdasd reducer");
      console.log(action.payload);
      //find groupMessage with structure of local state --> {groupId,messages[]}
      const groupMessage = state.messages.find((gm) => gm.groupId === groupId);

      console.log(groupMessage);
      if (!groupMessage) return;
      const messageIndex = groupMessage?.messages.findIndex(
        (message) => message.id === messageId
      );

      groupMessage?.messages.splice(messageIndex, 1);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
      const { groupId } = action.payload.data;
      console.log("inside groupMessage");

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

    builder.addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
      const { groupId, messageId } = action.payload.data;

      console.log({ groupId, messageId });
      console.log("inside delete groupMessage");
      //find groupMessage with structure of local state --> {groupId,messages[]}
      const findedGroupMessageInLocalState = state.messages.find(
        (gm) => gm.groupId == groupId
      );
      if (!findedGroupMessageInLocalState) return;

      const messageIndex = findedGroupMessageInLocalState?.messages.findIndex(
        (message) => message.id == messageId
      );

      findedGroupMessageInLocalState?.messages.splice(messageIndex, 1);
    });
  },
});

export const { addGroupMessage, deleteGroupMessageReducer } =
  groupMessageSlice.actions;

export default groupMessageSlice.reducer;
