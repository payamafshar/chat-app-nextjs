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

  console.log(lastMessageSent);
  return (
    <>
      <div
        onClick={() => handleClick(id)}
        className="flex mt-4 cursor-pointer "
      >
        <div className="bg-textInner w-12 h-12 rounded-full"></div>
        <div className="flex flex-col ml-3 justify-evenly">
          <span className="font-bold text-sm text-textInner">
            {title || "Group"}
          </span>
          <span className="text-xs text-blackSmooth">
            {lastMessageSent?.content}
          </span>
        </div>
      </div>
    </>
  );
};

export default GroupSideBarItem;
