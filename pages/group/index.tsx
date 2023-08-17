import { UserIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../utils/hooks/useAuth";
import CoversationSideBar from "../../components/conversation/ConversationSideBar";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateType } from "../../store/selectedSlice";
import {
  addGroup,
  addUserToGroup,
  removeGroup,
  updateGroup,
} from "../../store/groups/groupSlice";
import {
  AddUserToGroupResponse,
  DeleteUserFromGroupResponse,
  Group,
  GroupMessageEventPayload,
} from "../../utils/types/types";
import { SocketContext } from "../../utils/context/SocketContext";
import { addGroupMessage } from "../../store/groupMessage/groupMessageSlice";

const GroupPage = () => {
  const { user } = useAuth();

  const dispatch = useDispatch<AppDispatch>();
  const socket = useContext(SocketContext);
  useEffect(() => {
    dispatch(updateType("group"));
    socket.on("onGroup", (payload: GroupMessageEventPayload) => {
      const { group } = payload;
      dispatch(updateGroup({ group }));
      dispatch(addGroupMessage(payload));
      console.log("group");
    });
    socket.on("onGroupCreate", (payload: Group) => {
      dispatch(addGroup(payload));
    });

    socket.on(
      "onGroupRemovedRecipient",
      (payload: DeleteUserFromGroupResponse) => {
        const { group, recipientId } = payload;

        dispatch(removeGroup(group));
      }
    );

    socket.on("recipientAddedGroup", (payload: Group) => {
      console.log(payload);
      dispatch(addGroup(payload));
    });

    return () => {
      socket.off("onGroup");
      socket.off("onGroupCreate");
      socket.off("onGroupRemovedRecipient");
      socket.off("recipientAddedGroup");
    };
  }, []);

  return (
    <div className="h-screen w-full grid grid-cols-12 grid-rows-full ">
      <div className="col-span-3 row-span-6 flex-col ">
        <CoversationSideBar />
      </div>

      <div className="bg-blackSmooth col-span-9  flex justify-end p-6 items-center h-[75px]  w-full">
        <div className="text-textInner flex  items-center justify-start h-full text-lg font-bold">
          <p className="text-base h-4/4 ">{user?.username}</p>
          <div className="h-4/4 ml-4">
            <UserIcon className=" h-8 w-8  " />
          </div>
        </div>
      </div>

      <div className="col-span-9 row-span-6  flex flex-col justify-start items-start  overflow-y-scroll  scrollbar ">
        <div className="bg-inputBgDark w-full  flex-1 flex-col   justify-start items-start px-1 "></div>
      </div>
      <div></div>
    </div>
  );
};

export default GroupPage;
