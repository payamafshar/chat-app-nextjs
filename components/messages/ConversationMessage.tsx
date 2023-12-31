import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import FormatedMessage from "./FormatedMessageContainer";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  editMessageThunk,
  fetchConversationMessagesThunk,
} from "../../store/messages/thunkMessages";
import {
  toggleContextMenu,
  setContextMenuLocation,
  setSelectedMessage,
  setIsEditing,
  editMessageContent,
} from "../../store/messageContainerSlice";
import ContextMenu from "../contextMenu/ContextMenu";
import FormatedGroupMessage from "../group/FormatedGroupMessage";

const ConversationMessage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { conversationId } = router.query;
  const elemRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const showContextMenu = useSelector(
    (state: RootState) => state.messageContainer.showContextMenu
  );
  const isEditingMessage = useSelector(
    (state: RootState) => state.messageContainer.isEditingMessage
  );
  const selectedMessage = useSelector(
    (state: RootState) => state.messageContainer.selectedMessage
  );
  const messageBeingEdited = useSelector(
    (state: RootState) => state.messageContainer.messageBeingEdited
  );
  const messages = useSelector((state: RootState) => state.message.messages);

  useEffect(() => {
    const id = Number(conversationId);
    setLoading(true);
    dispatch(fetchConversationMessagesThunk(id))
      .then((res) => setLoading(false))
      .catch((err) => setLoading(false));
  }, [conversationId]);

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType
  ) => {
    event.preventDefault();
    dispatch(toggleContextMenu(true));
    dispatch(setContextMenuLocation({ x: event.pageX, y: event.pageY }));
    dispatch(setSelectedMessage(message));
    dispatch(setIsEditing(false));
  };
  const handleChangeSetEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(editMessageContent(e.target.value));
  };

  const handleEditMessageSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    const id = Number(conversationId);
    const param = {
      messageId: selectedMessage?.id!,
      conversationId: id,
      content: messageBeingEdited?.content,
    };

    dispatch(editMessageThunk(param));
    dispatch(setIsEditing(false));
  };
  const mapMessage = () => {
    const msg = messages.find(
      (cm) => cm.conversationId == Number(conversationId)
    );

    return msg?.messages?.map((message, index, arr) => {
      const currentMessage = arr[index];
      const nextMessage = arr[index + 1];

      if (arr.length == index + 1) {
        return (
          <FormatedMessage
            handleEditMessageSubmit={handleEditMessageSubmit}
            message={message}
            user={user}
          />
        );
      }

      if (currentMessage.author.id == nextMessage.author.id) {
        return (
          <div className=" flex flex-col-reverse   justify-start items-center mb-2  md:px-4     ">
            <div className="text-textInner px-10  md:px-12 ml-3">
              <div onContextMenu={(e) => onContextMenu(e, message)}>
                {" "}
                {message.content}
              </div>
              <form onSubmit={handleEditMessageSubmit}>
                <div>
                  {isEditingMessage && selectedMessage?.id == message.id && (
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
        <FormatedMessage
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
      <div ref={elemRef}>
        {showContextMenu && user?.id == selectedMessage?.author.id && (
          <ContextMenu />
        )}
      </div>

      {loading && <div className=" h-screen w-full">loadingg ........</div>}
    </div>
  );
};

export default ConversationMessage;
