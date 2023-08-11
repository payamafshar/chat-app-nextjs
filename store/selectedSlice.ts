import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";
import { ConversationType, User } from "../utils/types/types";
import { access } from "fs";

export interface SelectedTypeState {
  type: ConversationType;
  finalSelect: User[];
}

const initialState: SelectedTypeState = {
  type: "private",
  finalSelect: [],
};

export const selectedTypeSlice = createSlice({
  name: "selectedType",
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<ConversationType>) => {
      state.type = action.payload;
    },
    addSelect: (state, action: PayloadAction<User>) => {
      state.finalSelect.unshift(action.payload);
    },
    deleteSelect: (state, action: PayloadAction<User>) => {
      state.finalSelect = state.finalSelect.filter(
        (user) => user.id !== action.payload.id
      );

      console.log(action.payload);
    },
    resetSelect: (state) => {
      state.finalSelect = [];
    },
  },
});

export const selectType = (state: RootState) =>
  state.selectedConversationType.type;

export const { updateType, deleteSelect, addSelect, resetSelect } =
  selectedTypeSlice.actions;

export default selectedTypeSlice.reducer;
