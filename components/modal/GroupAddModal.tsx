import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import { useRef, useState } from "react";
import React from "react";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { User } from "../../utils/types/types";
import { searchUsers } from "../../utils/services/authService";
import { addUserToGroupThunk } from "../../store/groups/thunkGroups";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useRouter } from "next/router";

export const GroupModal = () => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searching, setSearching] = React.useState(false);
  const [help, setHelp] = useState(false);
  const [userResults, setUserResults] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { groupId } = router.query;
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const refElem = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          setUserResults((prev) => data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target == refElem.current) {
      setOpen(false);
    }
  };
  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHelp(true);
    setQuery(e.target.value);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setQuery((prev) => user.username);
    setHelp(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const numGroupId = Number(groupId);
    e.preventDefault();
    const params = {
      groupId: numGroupId,
      username: query,
    };
    dispatch(addUserToGroupThunk(params))
      .then((res) => setOpen(false))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div>
        <UserPlusIcon onClick={handleOpen} className="text-textInner w-7 h-7" />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div
            className="flex justify-center items-center w-full h-full rounded-sm"
            ref={refElem}
            onClick={(e) => handleClick(e)}
          >
            <div className=" bg-blackSmooth w-[500px] min-h-[250px] flex justify-center items-center rouneded border-2 rounded opacity-100">
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="flex flex-col h-full justify-center items-center w-full relative"
              >
                <p className="text-textInner text-lg mb-2 text-center font-bold  ">
                  Add Participent
                </p>
                {userResults.length > 0 && query && help && (
                  <div className="flex  flex-col justify-start py-4 absolute w-5/6 top-[48%] flex-1 scrollbar overflow-y-scroll h-[200px] items-center">
                    {userResults?.map((user) => (
                      <div
                        className="bg-blackSmooth w-5/6 p-2  flex justify-between  opacity-95   "
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
                )}
                <div className="w-full items-center relative  flex flex-col">
                  <label
                    htmlFor="recipient"
                    className="text-textInner text-sm items-start w-3/4 font-semibold"
                  ></label>
                </div>

                <input
                  onChange={(e) => handleRecipientChange(e)}
                  value={query}
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
    </>
  );
};

export default GroupModal;
