import React from "react";
import { User } from "../../utils/types/types";

type Props = {
  user: User;
};
const GroupUsers: React.FC<Props> = ({ user }) => {
  const { username } = user;
  return (
    <>
      <div className="flex  flex-col mb-4 justify-center items-center w-full">
        <div className="bg-buttonBgDark h-10 w-10 rounded-full  "></div>
        <div className="mb-2 font-bold  text-white  p-1 text-xs">
          {username}
        </div>
      </div>
    </>
  );
};

export default GroupUsers;
