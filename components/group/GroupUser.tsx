import React from "react";
import { User } from "../../utils/types/types";

type Props = {
  user: User;
};
const GroupUsers: React.FC<Props> = ({ user }) => {
  const { username } = user;
  return <></>;
};

export default GroupUsers;
