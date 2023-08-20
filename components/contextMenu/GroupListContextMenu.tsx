import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { postUserLeaveGroup } from "../../utils/services/groupService";
import { userLeaveGroupThunk } from "../../store/groups/thunkGroups";
import { toggleGroupListContextMenu } from "../../store/groups/groupSlice";

const GroupListContextMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const groupListContextMenuLocation = useSelector(
    (state: RootState) => state.groups.groupPoints
  );
  const seectedGroup = useSelector(
    (state: RootState) => state.groups.selectedGroup
  );

  const handleUserLeaveFromGroup = () => {
    dispatch(userLeaveGroupThunk(seectedGroup?.id!));
    dispatch(toggleGroupListContextMenu(false));
  };
  return (
    <div>
      <div
        style={{
          left: groupListContextMenuLocation.x,
          top: groupListContextMenuLocation.y,
        }}
        className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36 h-28 px-4 fixed `}
      >
        <ul className="flex flex-col justify-center  items-start py-4">
          <li
            onClick={handleUserLeaveFromGroup}
            className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner"
          >
            Leave
          </li>
          <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">
            Active Group
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GroupListContextMenu;
