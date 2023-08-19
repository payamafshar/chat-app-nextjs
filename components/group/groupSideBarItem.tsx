import React from "react";
import { Group } from "../../utils/types/types";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { userLeaveGroupThunk } from "../../store/groups/thunkGroups";

type Props = {
  group: Group;
};

const GroupSideBarItem: React.FC<Props> = ({ group }) => {
  const router = useRouter();

  const { id, title, lastMessageSent } = group;
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = (id: number) => {
    router.push(`/group/${id}`);
  };

  const handleUserLeave = () => {
    dispatch(userLeaveGroupThunk(id));
    console.log("right clicked");
  };
  return (
    <>
      <div
        onContextMenu={handleUserLeave}
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
    </>
  );
};

export default GroupSideBarItem;
