import React from "react";
import { Group } from "../../utils/types/types";
import { useRouter } from "next/router";

type Props = {
  group: Group;
};

const GroupSideBarItem: React.FC<Props> = ({ group }) => {
  const router = useRouter();

  const { id, title, lastMessageSent } = group;

  const handleClick = (id: number) => {
    router.push(`/group/${id}`);
  };

  return (
    <>
      <div
        onClick={() => handleClick(id)}
        className="flex mt-4 cursor-pointer "
      >
        <div className="bg-textInner w-12 h-12 rounded-full"></div>
        <div className="flex flex-col ml-3 justify-evenly">
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
