import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import {
  AddUserToGroupResponse,
  DeleteUserFromGroupResponse,
  Group,
} from "../../utils/types/types";
import {
  addUserToGroupThunk,
  createGroupThunk,
  deleteUserFromGroupThunk,
  fetchGroupThunk,
} from "./thunkGroups";
import { RootState } from "..";
import { group } from "console";

interface GroupState {
  groups: Group[];
}

const initialState: GroupState = {
  groups: [],
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState,

  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.unshift(action.payload);
    },

    updateGroup: (state, action: PayloadAction<Group>) => {
      const group = action.payload;

      const findedConversationIndex = state.groups.findIndex(
        (c) => c.id === group.id
      );

      state.groups.splice(findedConversationIndex, 1);
      state.groups.unshift(group);
    },

    addUserToGroup: (state, action: PayloadAction<AddUserToGroupResponse>) => {
      const {
        recipientId,
        group: { id: groupId, users: addedUsersArray },
      } = action.payload;

      const findedGroup = state.groups.find((g) => g.id == groupId);
      if (!findedGroup) return;
      findedGroup.users = addedUsersArray;
    },
    deleteUserFromGroupReducer: (
      state,
      action: PayloadAction<DeleteUserFromGroupResponse>
    ) => {
      const {
        recipientId,
        group: { id: groupId },
      } = action.payload;
      const findedGroup = state.groups.find((g) => g.id == groupId);
      if (!findedGroup) return;
      const findUserIndex = findedGroup.users.findIndex(
        (u) => u.id == recipientId
      );

      findedGroup.users.splice(findUserIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupThunk.fulfilled, (state, action) => {
      state.groups = action.payload.data;
    });
    builder.addCase(addUserToGroupThunk.fulfilled, (state, action) => {
      const {
        recipientId,
        group: { id: groupId, users: addedUsersArray },
      } = action.payload.data;

      const findedGroup = state.groups.find((g) => g.id == groupId);
      if (!findedGroup) return;
      findedGroup.users = addedUsersArray;
    });
    builder.addCase(deleteUserFromGroupThunk.fulfilled, (state, action) => {
      const {
        recipientId,
        group: { id: groupId },
      } = action.payload.data;
      console.log("inside delete reducer");

      const findedGroup = state.groups.find((g) => g.id == groupId);
      if (!findedGroup) return;
      const findUserIndex = findedGroup.users.findIndex(
        (u) => u.id == recipientId
      );

      findedGroup.users.splice(findUserIndex, 1);
    });
  },
});
const selectGroups = (state: RootState) => state.groups.groups;
const selectGroupId = (state: RootState, id: number) => id;
export const selectGroupById = createSelector(
  [selectGroups, selectGroupId],
  (groups, groupId) => groups.find((g) => g.id === groupId)
);

export const {
  addGroup,
  updateGroup,
  addUserToGroup,
  deleteUserFromGroupReducer,
} = groupSlice.actions;

export default groupSlice.reducer;
