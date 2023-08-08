import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversations/conversationSlice";
import messageReducer from "./messages/messageSlice";
import messageContainerReducer from "./messageContainerSlice";
import selectedTypeReducer from "./selectedSlice";
import groupReducer from "./groups/groupSlice";
import groupMessageReducer from "./groupMessage/groupMessageSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    message: messageReducer,
    messageContainer: messageContainerReducer,
    selectedConversationType: selectedTypeReducer,
    groups: groupReducer,
    groupMessage: groupMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
