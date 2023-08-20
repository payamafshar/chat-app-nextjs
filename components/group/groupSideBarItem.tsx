import React, { useEffect } from "react";
import { Group } from "../../utils/types/types";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { userLeaveGroupThunk } from "../../store/groups/thunkGroups";
import {
  setGroupListContextMenuLocation,
  setSelectedGroup,
  toggleGroupListContextMenu,
} from "../../store/groups/groupSlice";
import GroupListContextMenu from "../contextMenu/GroupListContextMenu";

type Props = {
  group: Group;
};

const GroupSideBarItem: React.FC<Props> = ({ group }) => {
  const router = useRouter();

  const { id, title, lastMessageSent } = group;
  const showGroupListContextMenu = useSelector(
    (state: RootState) => state.groups.showGroupListContextMenu
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleClick = () => dispatch(toggleGroupListContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  const handleClick = (id: number) => {
    router.push(`/group/${id}`);
  };

  const handleUserLeave = () => {
    dispatch(userLeaveGroupThunk(id));
    console.log("right clicked");
  };

  const handleGroupListContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch(setGroupListContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(toggleGroupListContextMenu(true));
    dispatch(setSelectedGroup(group));
  };
  return (
    <>
      <div
        onContextMenu={(e) => handleGroupListContextMenu(e)}
        onClick={() => handleClick(id)}
        className="flex mt-4 cursor-pointer "
      >
        <div className="bg-white w-10  h-9 md:w-12 md:h-12 rounded-full"></div>
        <div className="hidden md:flex flex-col ml-3 justify-evenly">
          <span className="font-bold text-sm text-textInner">
            {title && title?.length > 5
              ? title.substring(0, 6) + "..."
              : title || "GROUP"}
          </span>
          <span className="text-xs text-blackSmooth">
            {lastMessageSent?.content && lastMessageSent?.content?.length > 12
              ? lastMessageSent?.content?.substring(0, 11) + "..."
              : lastMessageSent?.content}
          </span>
        </div>
      </div>
      {showGroupListContextMenu && <GroupListContextMenu />}
    </>
  );
};

export default GroupSideBarItem;
