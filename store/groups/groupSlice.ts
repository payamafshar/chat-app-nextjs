import { createSelector, createSlice } from "@reduxjs/toolkit";
import { Group } from "../../utils/types/types";
import { createGroupThunk, fetchGroupThunk } from "./thunkGroups";
import { RootState } from "..";

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

    builder.addCase(createGroupThunk.fulfilled, (state, action) => {
      state.groups.unshift(action.payload.data);
    });
  },
});
const selectGroups = (state: RootState) => state.groups.groups;
const selectGroupId = (state: RootState, id: number) => id;
export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const {} = groupSlice.actions;

export default groupSlice.reducer;
