import React, { useEffect } from "react";
import { Conversation } from "../../utils/types/types";
import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";

type Props = {
  conversation: Conversation;
};

const ConversationSideBarItem: React.FC<Props> = ({ conversation }) => {
  const router = useRouter();
  const { user } = useAuth();

  const { id, recipient, lastMessageSent, creator } = conversation;

  const recipientConversation = creator.id == user?.id ? recipient : creator;
  const handleClick = (id: number) => {
    router.push(`/conversation/${id}`);
  };

  console.log({ lastMessageSent });
  return (
    <>
      <div
        onClick={() => handleClick(id)}
        className=" flex mt-4 cursor-pointer "
      >
        <div className="bg-buttonBgDark w-10  h-9 md:w-12 md:h-12 rounded-full"></div>
        <div className="hidden md:flex flex-col ml-3 justify-evenly">
          <span className="font-bold text-sm text-textInner">
            {recipientConversation.username}
          </span>
          <span className="text-xs text-graySmooth">
            {lastMessageSent?.content}
          </span>
        </div>
      </div>
    </>
  );
};

export default ConversationSideBarItem;
