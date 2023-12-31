import ConversationSideBarItem from "./ConversationSideBarItem";
import TransitionsModal from "../modal/Modal";
import { useEffect, useState } from "react";
import { ConversationType } from "../../utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationThunk } from "../../store/conversations/thunkConversation";
import { AppDispatch, RootState } from "../../store";
import { chatTypes } from "../../utils/constants";
import { updateType } from "../../store/selectedSlice";
import { fetchGroupThunk } from "../../store/groups/thunkGroups";
import { useRouter } from "next/router";
import GroupSideBarItem from "../group/GroupSideBarItem";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import QuitIcon from "@heroicons/react/24/outline/ArrowLeftOnRectangleIcon";
import ChatBubbleBottomCenterIcon from "@heroicons/react/24/outline/ChatBubbleBottomCenterIcon";

const CoversationSideBar = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  const selectedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const groups = useSelector((state: RootState) => state.groups.groups);
  useEffect(() => {
    dispatch(fetchConversationThunk());
    dispatch(fetchGroupThunk());
  }, []);

  const handleConversationType = (type: ConversationType) => {
    dispatch(updateType(type));
    if (type == "private") router.push("/conversation");
    else router.push("/group");
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex w-full border-r-2 border-r-blackSmooth ">
      <div className="w-1/5 flex flex-col h-screen justify-between p-6 items-center">
        <div className="flex flex-col">
          <div className="w-9 h-9 bg-buttonBgDark rounded-full"></div>
          <span className=" mt-8">
            <TransitionsModal />
          </span>
          <span className=" mt-8">
            <UserIcon className="h-7 w-7 text-textInner" />
          </span>
        </div>
        <div className="">
          <QuitIcon className="h-7 w-7 text-textInner" />
        </div>
      </div>
      <aside
        className={`bg-inputBgDark flex flex-col w-4/5 h-screen overflow-y-scroll scrollbar `}
      >
        <div className="flex flex-col md:justify-between justify-center bg-blackSmooth items-center p-2 sticky    top-0">
          <div className=" hidden md:flex mt-2  justify-center items-center ">
            <input
              value={value}
              placeholder="Search..."
              onChange={handleSearchInputChange}
              className=" hidden md:flex w-full outline-none text-textInner font-semibold placeholder:text-sm mt-2 bg-inputBgDark p-2 rounded-md"
            />
          </div>
          <div className="flex-col md:flex md:flex-row-reverse  w-full    justify-center  md:justify-evenly mt-4   items-center ">
            <ChatBubbleBottomCenterIcon
              onClick={() =>
                dispatch(
                  updateType(
                    selectedConversationType == "private" ? "group" : "private"
                  )
                )
              }
              className=" h-6  items-center w-full mt-1 px-0.5 block md:hidden justify-center text-textInner"
            />

            {chatTypes.map((item) => (
              <button
                key={item.label}
                onClick={() => handleConversationType(item.type)}
                className={` ${
                  selectedConversationType == item.type
                    ? "bg-inputBgDark"
                    : "bg-blackSmooth"
                }  text-textInner text-xs font-semibold  py-1.5 px-0.5 md:p-2  mb-2 flex justify-center  items-center rounded-md`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="  h-full flex-1 flex-col justify-start px-2 md:px-6 ">
          {selectedConversationType == "private"
            ? conversations?.map((conversation) => {
                return (
                  <ConversationSideBarItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                );
              })
            : groups?.map((group) => (
                <GroupSideBarItem key={group.id} group={group} />
              ))}
        </div>
      </aside>
    </div>
  );
};

export default CoversationSideBar;
