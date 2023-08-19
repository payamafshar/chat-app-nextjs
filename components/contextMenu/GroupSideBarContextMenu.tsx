import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useRouter } from "next/router";
import {
  deleteUserFromGroupThunk,
  transferAdminThunk,
  userLeaveGroupThunk,
} from "../../store/groups/thunkGroups";
import { toggleUserContextMenu } from "../../store/groupParticipentContainerSlice";
import { selectGroupById, updateGroup } from "../../store/groups/groupSlice";
import { useAuth } from "../../utils/hooks/useAuth";

const GroupSideBarContextMenu = () => {
  const router = useRouter();
  const { groupId } = router.query;
  const { user } = useAuth();
  const speceficGroup = useSelector((state: RootState) =>
    selectGroupById(state, Number(groupId))
  );
  const userContextMenuPoints = useSelector(
    (state: RootState) => state.groupParticipent.userPoints
  );
  const selctedUser = useSelector(
    (state: RootState) => state.groupParticipent.selectedUser
  );
  const dispatch = useDispatch<AppDispatch>();

  console.log(speceficGroup?.creator);
  const handleDeleteUserFromGroup = () => {
    const grouId = Number(groupId);
    const data = {
      recipientId: selctedUser?.id!,
      groupId: grouId,
    };
    dispatch(deleteUserFromGroupThunk(data)).then((res) =>
      dispatch(toggleUserContextMenu(false))
    );
  };

  const handleTransferAdmin = () => {
    const grouId = Number(groupId);
    const data = {
      username: selctedUser?.username!,
      groupId: grouId,
    };
    dispatch(transferAdminThunk(data)).then((res) => console.log(res));
    // dispatch(updateGroup(res.payload.data))

    dispatch(toggleUserContextMenu(false));
  };

  const handleUserLeave = () => {
    const grouId = Number(groupId);
    dispatch(userLeaveGroupThunk(grouId));
    dispatch(toggleUserContextMenu(false));
  };
  return (
    <div>
      <div
        style={{
          left: Number(userContextMenuPoints.x) - 180,
          top: userContextMenuPoints.y,
        }}
        className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36  px-4 fixed  cursor-pointer`}
      >
        {speceficGroup?.creator?.id == user?.id ? (
          <ul className="flex flex-col justify-center  items-start py-4">
            <li
              onClick={handleDeleteUserFromGroup}
              className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner"
            >
              Delete
            </li>
            <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
              Profile
            </li>
            <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
              Add User
            </li>
            <li
              onClick={handleTransferAdmin}
              className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner"
            >
              Transfer Owner
            </li>
            <li
              onClick={handleUserLeave}
              className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner"
            >
              Leave
            </li>
          </ul>
        ) : speceficGroup?.owner?.id == user?.id ? (
          <ul className="flex flex-col justify-center  items-start py-4">
            <li
              onClick={handleDeleteUserFromGroup}
              className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner"
            >
              Delete
            </li>
            <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
              Add User
            </li>
            <li
              onClick={handleUserLeave}
              className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner"
            >
              Leave
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col justify-center  items-start py-4">
            <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
              Profile
            </li>
            <li
              onClick={handleUserLeave}
              className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner"
            >
              Leave
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupSideBarContextMenu;
