import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  editGroupMessageThunk,
  fetchGroupMessagesThunk,
} from "../../store/groupMessage/thunkGroupMessage";
import FormatedGroupMessage from "./FormatedGroupMessage";
import {
  editMessageContent,
  setContextMenuLocation,
  setIsEditing,
  setSelectedGroupMessage,
  setSelectedMessage,
  toggleContextMenu,
} from "../../store/messageContainerSlice";
import { GroupMessageType, MessageType } from "../../utils/types/types";
import ContextMenu from "../contextMenu/ContextMenu";
import { updateType } from "../../store/selectedSlice";

const GroupMessage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { groupId } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const id = Number(groupId);

    dispatch(fetchGroupMessagesThunk(id));

    dispatch(updateType("group"));
  }, [groupId]);
  const messages = useSelector(
    (state: RootState) => state.groupMessage.messages
  );
  const showContextMenu = useSelector(
    (state: RootState) => state.messageContainer.showContextMenu
  );
  const isEditingMessage = useSelector(
    (state: RootState) => state.messageContainer.isEditingMessage
  );

  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );

  const selectedGroupMessage = useSelector(
    (state: RootState) => state.messageContainer.selectedGroupMessage
  );
  const messageBeingEdited = useSelector(
    (state: RootState) => state.messageContainer.messageBeingEdited
  );

  const handleChangeSetEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editMessageContent(e.target.value));
  };

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

  const handleEditMessageSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = Number(groupId);
    const param = {
      messageId: selectedGroupMessage?.id!,
      groupId: id,
      content: messageBeingEdited?.content,
    };

    dispatch(editGroupMessageThunk(param));
    dispatch(setIsEditing(false));
  };

  const mapMessage = () => {
    const msg = messages.find((gm) => gm.groupId == Number(groupId));
    return msg?.messages?.map((message, index, arr) => {
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];

      if (arr.length == index + 1) {
        return (
          <FormatedGroupMessage
            handleEditMessageSubmit={handleEditMessageSubmit}
            message={message}
            user={user}
          />
        );
      }

      if (currentMessage.author.id == nextMessage.author.id) {
        return (
          <div className=" flex flex-col-reverse   justify-start items-center mb-2 px-12    ">
            <div className="text-textInner  px-10 ml-3">
              <div onClick={(e) => onContextMenu(e, message)}>
                {" "}
                {message.content}
              </div>
              <form onSubmit={handleEditMessageSubmit}>
                <div>
                  {isEditingMessage &&
                    selectedGroupMessage?.id == message.id && (
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
        );
      }
      return (
        <FormatedGroupMessage
          handleEditMessageSubmit={handleEditMessageSubmit}
          message={message}
          user={user}
        />
      );
    });
  };

  return (
    <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col-reverse  justify-start items-start px-1 ">
      {mapMessage()}
      {showContextMenu && user?.id == selectedGroupMessage?.author.id && (
        <ContextMenu />
      )}
    </div>
  );
};

export default GroupMessage;
