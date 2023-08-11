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
    <div className="flex w-full ">
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
        <div className="flex flex-col justify-between  p-6 sticky  bg-blackSmooth  top-0">
          <div className=" ">
            <input
              value={value}
              placeholder="Search..."
              onChange={handleSearchInputChange}
              className=" w-full outline-none text-textInner font-semibold placeholder:text-sm  bg-inputBgDark p-2 rounded-md"
            />
          </div>
          <div className="flex justify-evenly mt-6   items-center">
            {chatTypes.map((item) => (
              <button
                key={item.label}
                onClick={() => handleConversationType(item.type)}
                className={` ${
                  selectedConversationType == item.type
                    ? "bg-inputBgDark"
                    : "bg-blackSmooth"
                } p-1.5 text-textInner text-sm font-semibold px-4 py-2 mb-2   rounded-lg`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="  h-full flex-1 flex-col justify-start px-6 ">
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
