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
  toggleContextMenu,
} from "../../store/messageContainerSlice";
import { GroupMessageType, User } from "../../utils/types/types";
import ContextMenu from "../contextMenu/ContextMenu";
import { updateType } from "../../store/selectedSlice";
import { selectGroupById } from "../../store/groups/groupSlice";
import GroupSideBarContextMenu from "../contextMenu/GroupSideBarContextMenu";
import {
  setSelectedUser,
  setUserContextMenuLocation,
  toggleUserContextMenu,
} from "../../store/groupParticipentContainerSlice";
import { createConversationThunk } from "../../store/conversations/thunkConversation";

type Props = {
  online: User[];
};

const GroupMessage: React.FC<Props> = ({ online }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { groupId } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const onlineUsersId = online.map((u) => u.id);
  useEffect(() => {
    const id = Number(groupId);

    dispatch(fetchGroupMessagesThunk(id));
    dispatch(updateType("group"));
  }, [groupId]);

  useEffect(() => {
    const handleClick = () => dispatch(toggleUserContextMenu(false));
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);
  const messages = useSelector(
    (state: RootState) => state.groupMessage.messages
  );
  const showContextMenu = useSelector(
    (state: RootState) => state.messageContainer.showContextMenu
  );
  const speceficGroup = useSelector((state: RootState) =>
    selectGroupById(state, Number(groupId!))
  );

  const showUserContextMenu = useSelector(
    (state: RootState) => state.groupParticipent.showUserContextMenu
  );
  const isEditingMessage = useSelector(
    (state: RootState) => state.messageContainer.isEditingMessage
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
  // const handleCreateConversationWithUser = (user: User) => {
  //   dispatch(createConversationThunk({ username: user.username }))
  //     .then((res) => {
  //       const conversationId: number = res?.payload.data.id;
  //       router.push(`/conversation/${conversationId}`);
  //     })
  //     .catch((err) => console.log(err));
  // };

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

  const handleUserSideBarClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    user: User
  ) => {
    e.preventDefault();
    dispatch(toggleUserContextMenu(true));
    dispatch(setUserContextMenuLocation({ x: e.pageX, y: e.pageY }));
    dispatch(setSelectedUser(user));
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
          <div className=" flex flex-col-reverse   justify-start items-center mb-2 px-10 md:px-4    ">
            <div className="text-textInner cursor-pointer  md:px-10 ml-3">
              <div onContextMenu={(e) => onContextMenu(e, message)}>
                {" "}
                {message.content}
              </div>
              <form onSubmit={(e) => handleEditMessageSubmit(e)}>
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
    <div className="flex flex-row-reverse  h-full ">
      <div className="bg-blackSmooth p-5 flex flex-col   overflow-y-scroll justify-start items-center   scrollbar w-[59px] md:w-[78px] fixed h-[calc(100vh_-_140px)] right-0 ">
        {speceficGroup?.users.map((user) => (
          <div
            onContextMenu={(e) => handleUserSideBarClick(e, user)}
            // onClick={() => handleCreateConversationWithUser(user)}
            className="flex relative  flex-col cursor-pointer mb-4 justify-center items-center w-full "
          >
            <div className="bg-buttonBgDark h-10 w-10 rounded-full  "></div>
            <div className="mb-2 font-bold  text-white  p-1 text-xs">
              {user.username.length >= 5
                ? user.username.substring(0, 5) + "..."
                : user.username}
            </div>
            <div
              className={` absolute ${
                onlineUsersId.includes(user.id) ? "bg-green" : "bg-white"
              } -button-1 right-1 h-3 w-3 rounded-full `}
            ></div>
          </div>
        ))}
      </div>
      <div className="py-6  bg-inputBgDark w-full flex h-full  flex-col-reverse   justify-start items-start px-1 ">
        {mapMessage()}
        {showContextMenu && user?.id == selectedGroupMessage?.author.id && (
          <ContextMenu />
        )}
        <div>{showUserContextMenu && <GroupSideBarContextMenu />}</div>
      </div>
    </div>
  );
};

export default GroupMessage;
