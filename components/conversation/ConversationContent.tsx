
import { NextPage } from "next";
import { ReactNode } from 'react';
import TemporaryDrawer from "../drawer/Drawer";
import { useAuth } from "../../utils/hooks/useAuth";



interface Props {
   children?: ReactNode;
}




const CoversationContenet  =() => {

  const {user , loading} = useAuth()


    return <aside className="w-full h-full bg-white flex flex-col">
      {/* Conversation Header */}
      <div className="bg-blackSmooth p-5 fixed w-full flex justify-between items-center top-0">
        <TemporaryDrawer />
        <p className="text-textInner text-lg font-bold">
          {
            user?.username
          }
        </p>
      </div>

  {/* Conversation Body */}
      <div className="bg-buttonBgDark w-full h-full">
      </div>

{/* Conversation input */}
      <div className="bg-blackSmooth w-full h-[100px]  p-2  relative bottom-0 ">
        <div className="fixed w-11/12 h-[100px]">

       <input placeholder="Write Message ..." className=" w-full p-5 ml-5  bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
        </div>
      </div>

    </aside>
}


export default CoversationContenet