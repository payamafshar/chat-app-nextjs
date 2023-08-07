import { createSlice } from "@reduxjs/toolkit";
import { Group } from "../../utils/types/types";
import { fetchGroupThunk } from "./thunkGroups";

interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGroupThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });
  },
});

export const {} = groupSlice.actions;

export default groupSlice.reducer;
