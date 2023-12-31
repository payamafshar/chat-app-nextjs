import React from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { GroupMessageType, User } from "../../utils/types/types";
import { AppDispatch, RootState } from "../../store";
import {
  editMessageContent,
  setContextMenuLocation,
  setIsEditing,
  setSelectedGroupMessage,
  setSelectedMessage,
  toggleContextMenu,
} from "../../store/messageContainerSlice";
import ContextMenu from "../contextMenu/ContextMenu";

type FormatedProps = {
  user?: User;
  message: GroupMessageType;
  handleEditMessageSubmit: React.FormEventHandler<HTMLFormElement> | any;
};

const FormatedGroupMessage: React.FC<FormatedProps> = ({
  user,
  message,
  handleEditMessageSubmit,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { groupId } = router.query;
  React.useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const selectedGroupMessage = useSelector(
    (state: RootState) => state.messageContainer.selectedGroupMessage
  );
  const isEditingMessage = useSelector(
    (state: RootState) => state.messageContainer.isEditingMessage
  );
  const messageBeingEdited = useSelector(
    (state: RootState) => state.messageContainer.messageBeingEdited
  );

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: GroupMessageType
  ) => {
    event.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedGroupMessage(message));
    dispatch(setIsEditing(false));
  };

  const handleChangeSetEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editMessageContent(e.target.value));
  };

  return (
    <div className=" flex flex-col md:px-4  justify-end items-start ">
      <div className="flex justify-center items-center mb-2">
        <div className="h-10 w-10 rounded-full bg-buttonBgDark "></div>
        <div>
          <div className="flex justify-center  items-center p-1 py-2  ">
            <p
              className={`font-bold text-reg  ml-2   ${
                user?.id == message.author.id
                  ? "text-buttonBgDark"
                  : "text-white"
              } `}
            >
              {message.author.username}
            </p>
            <p className="text-xs font-semibold ml-2 flex-1 whitespace-nowrap text-white">
              {message.createdAt.substring(0, 18)}
            </p>
          </div>
          <div className="text-textInner cursor-pointer  px-1 ml-2">
            <div onContextMenu={(e) => onContextMenu(e, message)}>
              {message.content}
            </div>
            <form onSubmit={(e) => handleEditMessageSubmit(e)}>
              <div>
                {isEditingMessage && selectedGroupMessage?.id == message.id && (
                  <>
                    {" "}
                    <input
                      onChange={(e) => handleChangeSetEditing(e)}
                      className="w-full text-white rounded placeholder:Edit Message... bg-blackSmooth p-2"
                      value={messageBeingEdited?.content}
                    />{" "}
                    <span
                      onClick={(e) => handleEditMessageSubmit(e)}
                      className="text-sm text-blackSmooth cursor-pointer font-bold "
                    >
                      Edit{" "}
                    </span>
                    <span
                      onClick={() => dispatch(setIsEditing(false))}
                      className="text-sm text-blackSmooth cursor-pointer font-bold ml-8"
                    >
                      Cancel{" "}
                    </span>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatedGroupMessage;
