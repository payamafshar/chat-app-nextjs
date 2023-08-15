import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { deleteUserFromGroup } from "../../utils/services/groupService";
import { useRouter } from "next/router";
import { deleteUserFromGroupThunk } from "../../store/groups/thunkGroups";
import { toggleUserContextMenu } from "../../store/groupParticipentContainerSlice";

const GroupSideBarContextMenu = () => {
  const userContextMenuPoints = useSelector(
    (state: RootState) => state.groupParticipent.userPoints
  );
  const selctedUser = useSelector(
    (state: RootState) => state.groupParticipent.selectedUser
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleDeleteUserFromGroup = () => {
    const { groupId } = router.query;
    const data = {
      recipientId: selctedUser?.id!,
      groupId,
    };
    dispatch(deleteUserFromGroupThunk(data)).then((res) =>
      dispatch(toggleUserContextMenu(false))
    );
  };
  return (
    <div>
      <div
        style={{
          left: Number(userContextMenuPoints.x) - 120,
          top: userContextMenuPoints.y,
        }}
        className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36  px-4 fixed  cursor-pointer`}
      >
        <ul className="flex flex-col justify-center  items-start py-4">
          <li
            onClick={handleDeleteUserFromGroup}
            className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner"
          >
            Delete
          </li>
          <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
            Mute
          </li>
          <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
            Block
          </li>
          <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
            Edit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupSideBarContextMenu;
