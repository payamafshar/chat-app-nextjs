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
import { useRouter } from "next/router";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { TagsInput } from "react-tag-input-component";
import { searchUsers } from "../../utils/services/authService";
import { updateType } from "../../store/selectedSlice";
import { setUncaughtExceptionCaptureCallback } from "process";
import { createGroupThunk } from "../../store/groups/thunkGroups";

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
  const [finalSelect, setFinalSelect] = React.useState<User[]>([]);
  const debouncedQuery = useDebounce(query, 1000);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const selctedConversationType = useSelector(
    (state: RootState) => state.selectedConversationType.type
  );
  const router = useRouter();

  React.useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
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
    } else {
      const usernameArray = finalSelect.map((user) => user.username);

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

  const handleRemoveUserFromGroup = (user: User) => {
    setFinalSelect((prev) => prev.filter((u) => u.id !== user.id));

    console.log(finalSelect);
  };
  React.useEffect(() => {
    if (finalSelect.length < 1) setLock(false);
  }, [toggle]);

  const handleFinalDelete = (user: User) => {
    setToggle(!toggle);
    setFinalSelect((prev) => prev.filter((u) => u.id !== user.id));
  };

  const handleSelectUserFroGroup = (user: User) => {
    const selectedUser = userResults.find((u) => u.id == user.id);
    if (finalSelect.includes(selectedUser!)) return;
    setFinalSelect((prev) => [...finalSelect, selectedUser!]);

    console.log(finalSelect);
  };
  return (
    <div>
      <PencilSquareIcon
        onClick={handleOpen}
        className="h-7 w-7 text-textInner cursor-pointer font-bold text-lg"
      />
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
          <div className=" bg-blackSmooth w-[500px] min-h-[330px] transition-transform rouneded border-2 rounded opacity-100">
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
                  value={"group"}
                  type="radio"
                />
                <label className="text-textInner text-sm font-semibold py-1 px-2">
                  Private
                </label>
                <input
                  onChange={(e) => handleRadioButton(e)}
                  name="yek"
                  value={"private"}
                  type="radio"
                />
              </div>
              <div className="w-full items-center relative  flex flex-col">
                <label
                  htmlFor="recipient"
                  className="text-textInner text-sm items-start w-3/4 font-semibold"
                >
                  Recipient
                </label>

                {lock && selctedConversationType == "group" ? (
                  <div className="w-3/4 h-auto p-3 gap-2 flex bg-inputBgDark rounded-md">
                    {finalSelect.map((user) => (
                      <div className="text-textInner border p-1 rounded font-semibold text-xs flex ">
                        <div> {user.username}</div>
                        <div>
                          <XCircleIcon
                            onClick={() => handleFinalDelete(user)}
                            className="h-5 w-5"
                          />
                        </div>
                      </div>
                    ))}{" "}
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
                      <div className="flex  flex-col justify-start py-4 absolute w-full top-[98%] flex-1 overflow-y-scroll h-[200px] items-center">
                        {userResults?.map((user) => (
                          <div
                            className="bg-blackSmooth w-3/4 p-2  flex-1  opacity-95   "
                            key={user.id}
                          >
                            <div
                              onClick={() => handleSelectUser(user)}
                              className="flex  p-2 justify-start px-4 items-center text-textInner font-semibold"
                            >
                              {user.username}
                            </div>{" "}
                          </div>
                        ))}
                      </div>
                    )
                  : userResults.length > 0 &&
                    query &&
                    help && (
                      <div className="flex  flex-col justify-start py-4 absolute w-full top-[98%] flex-1 overflow-y-scroll h-[200px] items-center ">
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
                                  onClick={() => handleSelectUserFroGroup(user)}
                                >
                                  {finalSelect.includes(user) ? (
                                    <CheckCircleIcon className="h-6 w-6" />
                                  ) : (
                                    "Pick"
                                  )}
                                </div>{" "}
                                <div
                                  onClick={() =>
                                    handleRemoveUserFromGroup(user)
                                  }
                                >
                                  <TrashIcon className="w-6 h-6 text-textInner" />
                                </div>
                              </div>
                            </div>{" "}
                          </div>
                        ))}{" "}
                        <div className="flex justify-center items-center mt-0.5">
                          <div
                            onClick={() => {
                              setFinalSelect([]);
                              setHelp(false);
                              setQuery("");
                            }}
                            className="p-1 border w-24 rounded-md text-sm  outline-none font-semibold bg-blackSmooth text-textInner "
                          >
                            cancel
                          </div>
                          <div
                            onClick={() => {
                              setFinalSelect((prev) => prev);
                              setHelp(false);
                              setQuery("");
                              setLock(true);
                              console.log(finalSelect);
                            }}
                            className="p-1 border w-24 ml-4 rounded-md text-sm outline-none font-semibold bg-blackSmooth text-textInner "
                          >
                            save
                          </div>
                        </div>
                      </div>
                    )}
              </div>
              <label
                htmlFor="message"
                className="text-textInner text-sm w-3/4 font-semibold"
              >
                {selctedConversationType == "private" ? "Message" : "Title"}
              </label>
              <input
                onChange={(e) => {
                  selctedConversationType == "private"
                    ? setMessage(e.target.value)
                    : setTitle(e.target.value);
                }}
                className="w-3/4 p-3 bg-inputBgDark placeholder:Message(Optional) mb-2 rounded-md text-white font-semibold outline-none"
              />
              <button className="w-3/4 p-3 bg-buttonBgDark mt-3 rounded-md text-textInner font-semibold">
                Create Conversation
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
