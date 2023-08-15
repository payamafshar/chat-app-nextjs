import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Points, User } from "../utils/types/types";

export interface GroupRecipientSidebarState {
  showUserContextMenu: boolean;
  selectedUser?: User;
  userPoints: Points;
}

const initialState: GroupRecipientSidebarState = {
  showUserContextMenu: false,
  userPoints: { x: 0, y: 0 },
};

export const groupRecipientSidebarSlice = createSlice({
  name: "groupRecipientSidebarSlice",
  initialState,
  reducers: {
    toggleUserContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showUserContextMenu = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setUserContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.userPoints = action.payload;
    },
  },
});

export const {
  setUserContextMenuLocation,
  setSelectedUser,
  toggleUserContextMenu,
} = groupRecipientSidebarSlice.actions;

export default groupRecipientSidebarSlice.reducer;
