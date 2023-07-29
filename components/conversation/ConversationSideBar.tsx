import { NextPage } from "next";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import ConversationSideBarItem from "./ConversationSideBarItem";
import TransitionsModal from "../modal/Modal";
import { useEffect, useState } from "react";
import { getConversations } from "../../utils/services/conversationService";
import { Conversation } from "../../utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationThunk } from "../../store/conversations/thunkConversation";
import { AppDispatch, RootState } from "../../store";
import { useRouter } from "next/router";
import { updateConversation } from "../../store/conversations/conversationSlice";





const CoversationSideBar  = () => {
  const dispatch  = useDispatch<AppDispatch>()

  const {loading , conversations} = useSelector((state :RootState) => state.conversation)

  useEffect(()=>{

    dispatch(fetchConversationThunk())

  },[])


    return <aside className={`bg-inputBgDark w-full h-screen overflow-y-scroll scrollbar ` }>


     <div className="flex justify-between  p-6 sticky  bg-blackSmooth  top-0">
       <div className="flex ">

        <p className="text-lg font-bold text-textInner">Coversations</p>
       </div>
        <span className="">
           
            <TransitionsModal />
        </span>
     </div>

     <div className="  h-full flex-1 flex-col justify-start px-6 ">
       
       {
        

        conversations?.map(conversation => { 
          return <ConversationSideBarItem key={conversation.id} conversation={conversation}/> 
          })


       }
     
    

     </div>

    </aside>
}




export default CoversationSideBar