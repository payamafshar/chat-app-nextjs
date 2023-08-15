import * as React from "react";
import Modal from "@mui/material/Modal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { createConversationThunk } from "../../store/conversations/thunkConversation";
import {
  ConversationType,
  CreateConversationParams,
  User,
} from "../../utils/types/types";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import { useRouter } from "next/router";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { TagsInput } from "react-tag-input-component";
import { searchUsers } from "../../utils/services/authService";
import {
  addSelect,
  deleteSelect,
  resetSelect,
  updateType,
} from "../../store/selectedSlice";
import { createGroupThunk } from "../../store/groups/thunkGroups";
import { selectGroupById } from "../../store/groups/groupSlice";
import { useAuth } from "../../utils/hooks/useAuth";

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [title, setTitle] = React.useState<string>("");
  const [message, setMessage] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [toggle, setToggle] = React.useState<boolean>(false);
  const [lock, setLock] = React.useState(false);
  const [help, setHelp] = React.useState(false);
  const [userResults, setUserResults] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const debouncedQuery = useDebounce(query, 1000);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { groupId } = router.query;
  const { user } = useAuth();
  const selctedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const selectedGroupArray = useSelector(
    (state: RootState) => state.selectedConversationType.finalSelect
  );
  const speceficGroup = useSelector((state: RootState) =>
    selectGroupById(state, Number(groupId))
  );
  const groupUsernameArray = selectedGroupArray.map((user) => user.username);

  React.useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      console.log(selectedGroupArray);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          setUserResults((prev) => data);
        })
        .catch((err) => console.log(err));
    }
  }, [debouncedQuery]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selctedConversationType == "private") {
      dispatch(
        createConversationThunk({ username: selectedUser?.username!, message })
      )
        .then((res: any) => {
          const conversationId: number = res.payload.data.id;
          setOpen(false);
          router.push(`/conversation/${conversationId}`);
        })
        .catch((err) => console.log(err));
    }
    if (selectedGroupArray.length > 0 && selctedConversationType == "group") {
      const usernameArray = selectedGroupArray.map((user) => user.username);

      dispatch(createGroupThunk({ users: usernameArray, title }))
        .then((res: any) => {
          const groupId = res.payload.data.id;
          setOpen(false);
          router.push(`/group/${groupId}`);
        })
        .catch((err) => console.log(err));
    }
  };
  const refElem = React.useRef(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target == refElem.current) {
      setOpen(false);
    }
  };

  const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateType(e.target.value as ConversationType));
  };

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setHelp(true);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setQuery((prev) => user.username);
    setHelp(false);
  };

  const handleSetTitleOrMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selctedConversationType == "private") {
      setMessage(e.target.value);
      return;
    }
    if (selctedConversationType == "group") {
      setTitle(e.target.value);
      return;
    }
  };

  const handleRemoveUserFromGroup = (user: User) => {
    // setFinalSelect((prev) => prev.filter((u) => u.id !== user.id));
    dispatch(deleteSelect(user));
  };
  React.useEffect(() => {
    if (selectedGroupArray.length < 1) setLock(false);
  }, [toggle]);

  const handleFinalDelete = (user: User) => {
    setToggle(!toggle);
    // setFinalSelect((prev) => prev.filter((u) => u.id !== user.id));
    dispatch(deleteSelect(user));
  };

  const handleSelectUserFroGroup = (user: User) => {
    // const selectedUser = userResults.find((u) => u.id == user.id);

    if (selectedGroupArray.includes(user)) return;
    // setFinalSelect((prev) => [...finalSelect, selectedUser!]);
    dispatch(addSelect(user));
  };

  return (
    <div>
      {speceficGroup?.creator.id == user?.id && (
        <PencilSquareIcon
          onClick={handleOpen}
          className="h-7 w-7 text-textInner cursor-pointer font-bold text-lg"
        />
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div
          ref={refElem}
          onClick={(e) => handleClick(e)}
          className="flex justify-center items-center w-full h-full "
        >
          <div className=" bg-blackSmooth w-[500px] min-h-[360px] transition-transform rouneded border-2 rounded opacity-100">
            <form
              onSubmit={(e) => onSubmit(e)}
              className="flex flex-col h-full justify-center items-center w-full"
            >
              <p className="text-textInner text-lg mb-2 text-center font-bold  ">
                Create ConverSation
              </p>
              <div className="flex  ">
                <label className="text-textInner text-sm font-semibold py-1 px-2">
                  Group
                </label>
                <input
                  onChange={(e) => handleRadioButton(e)}
                  name="yek"
                  value="group"
                  type="radio"
                  checked={selctedConversationType == "group" ? true : false}
                />
                <label className="text-textInner text-sm font-semibold py-1 px-2">
                  Private
                </label>
                <input
                  onChange={(e) => handleRadioButton(e)}
                  name="yek"
                  value="private"
                  type="radio"
                  checked={selctedConversationType == "private" ? true : false}
                />
              </div>
              <div className="w-full items-center relative  flex flex-col">
                <label
                  htmlFor="recipient"
                  className="text-textInner text-sm items-start w-3/4 font-semibold"
                >
                  {selctedConversationType == "private"
                    ? "Recipient"
                    : "Invited Users"}
                </label>

                {lock && selctedConversationType == "group" ? (
                  <div className="w-3/4 relative h-auto p-3 gap-2 flex flex-wrap bg-inputBgDark rounded-md">
                    {selectedGroupArray.map((user) => (
                      <div className="text-textInner bg-blackSmooth p-1 outline-none rounded font-semibold text-xs flex ">
                        <div> {user.username}</div>
                        <div>
                          <XCircleIcon
                            onClick={() => handleFinalDelete(user)}
                            className="h-5 w-5"
                          />
                        </div>
                      </div>
                    ))}{" "}
                    <div
                      onClick={() => {
                        setLock(false);
                        setHelp(true);
                      }}
                      className="absolute right-4 bottom-2 bg-blackSmooth p-1 rounded font-semibold text-textInner"
                    >
                      <PlusCircleIcon className="h-6 w-6 cursor-pointer " />
                    </div>
                  </div>
                ) : (
                  <input
                    onChange={(e) => handleRecipientChange(e)}
                    value={query}
                    className="w-3/4 p-3  bg-inputBgDark placeholder:Recipient rounded-md mb-2 text-white outline-none font-semibold"
                  />
                )}

                {selctedConversationType == "private"
                  ? userResults.length > 0 &&
                    query &&
                    help && (
                      <div className="flex  flex-col justify-start py-4 absolute w-full top-[89%] flex-1 overflow-y-scroll h-[200px] items-center">
                        {userResults?.map((user) => (
                          <div
                            className="bg-blackSmooth w-3/4 p-2  flex justify-between  opacity-95   "
                            key={user.id}
                          >
                            <div
                              onClick={() => handleSelectUser(user)}
                              className="flex  p-2 justify-start px-4 items-center cursor-pointer text-textInner font-semibold"
                            >
                              {user.username}
                            </div>{" "}
                            <div
                              onClick={() => handleSelectUser(user)}
                              className="text-textInner p-2 font-semibold cursor-pointer"
                            >
                              Pick
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  : userResults.length > 0 &&
                    query &&
                    help && (
                      <div className="flex  flex-col justify-start py-4 absolute w-full top-[89%] flex-1 overflow-y-scroll scrollbar h-[200px] items-center ">
                        {" "}
                        {userResults?.map((user) => (
                          <div
                            className="bg-blackSmooth w-3/4 p-2  flex-1  opacity-95  "
                            key={user.id}
                          >
                            {" "}
                            <div className="flex  p-2 justify-between px-4 items-center text-textInner font-semibold">
                              <div className=" text-textInner">
                                {user.username}
                              </div>{" "}
                              <div className="flex gap-x-4">
                                <div
                                  onClick={() => {
                                    handleSelectUserFroGroup(user);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {groupUsernameArray.includes(
                                    user.username
                                  ) ? (
                                    <CheckCircleIcon className="h-6 w-6" />
                                  ) : (
                                    "Pick"
                                  )}
                                </div>{" "}
                                <div
                                  onClick={() =>
                                    handleRemoveUserFromGroup(user)
                                  }
                                  className="cursor-pointer"
                                >
                                  {groupUsernameArray.includes(
                                    user.username
                                  ) ? (
                                    <TrashIcon className="w-6 h-6 text-textInner" />
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </div>{" "}
                          </div>
                        ))}{" "}
                        <div className="flex justify-center items-center mt-0.5">
                          <div
                            onClick={() => {
                              dispatch(resetSelect());
                              setHelp(false);
                              setQuery("");
                            }}
                            className="p-1  w-16 rounded-md text-sm cursor-pointer  font-semibold bg-inputBgDark outline-none text-center text-textInner "
                          >
                            cancel
                          </div>
                          <div
                            onClick={() => {
                              setHelp(false);
                              setLock(true);
                            }}
                            className="p-1 cursor-pointer w-16 ml-4 rounded-md text-center text-sm  font-semibold outline-none bg-inputBgDark text-textInner "
                          >
                            save
                          </div>
                        </div>
                      </div>
                    )}
              </div>
              <label
                htmlFor="message"
                className="text-textInner text-sm w-3/4 font-semibold mt-2"
              >
                {selctedConversationType == "private" ? "Message" : "Title"}
              </label>
              <input
                onChange={(e) => handleSetTitleOrMessage(e)}
                className="w-3/4 p-3 bg-inputBgDark placeholder:Message(Optional) mb-2 rounded-md text-white font-semibold outline-none"
              />
              <button className="w-3/4 p-3 mb-6 bg-buttonBgDark mt-3 rounded-md text-textInner font-semibold">
                Create Conversation
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
