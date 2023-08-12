import React, { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setIsEditing,
  setMessageBeingEdited,
  toggleContextMenu,
} from "../../store/messageContainerSlice";
import {
  deleteMessageThunk,
  editMessageThunk,
} from "../../store/messages/thunkMessages";
import { useRouter } from "next/router";
import { deleteGroupMessageThunk } from "../../store/groupMessage/thunkGroupMessage";

const ContextMenu = () => {
  const selectedMessage = useSelector(
    (state: RootState) => state.messageContainer.selectedMessage
  );

  const selectedGroupMessage = useSelector(
    (state: RootState) => state.messageContainer.selectedGroupMessage
  );

  const messageBeingEdited = useSelector(
    (state: RootState) => state.messageContainer.messageBeingEdited
  );

  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const points = useSelector(
    (state: RootState) => state.messageContainer.points
  );
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const { conversationId, groupId } = router.query;

  const handleDeleteMessage = () => {
    const convId = Number(conversationId);
    const grouId = Number(groupId);

    if (selectedMessage || selectedGroupMessage)
      selectedConversationType == "private"
        ? dispatch(
            deleteMessageThunk({
              conversationId: convId,
              messageId: selectedMessage?.id!,
            })
          )
        : dispatch(
            deleteGroupMessageThunk({
              groupId: grouId,
              messageId: selectedGroupMessage?.id!,
            })
          );
    dispatch(toggleContextMenu(false));
  };
  const handleEditMessage = () => {
    dispatch(toggleContextMenu(false));
    dispatch(setIsEditing(true));
    dispatch(setMessageBeingEdited(selectedMessage));
  };

  return (
    <div>
      <div
        style={{ left: points.x, top: points.y }}
        className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36 h-28 px-4 fixed `}
      >
        <ul className="flex flex-col justify-center  items-start py-4">
          <li
            onClick={handleDeleteMessage}
            className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner"
          >
            Delete
          </li>
          <li
            onClick={handleEditMessage}
            className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner"
          >
            Edit
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContextMenu;
