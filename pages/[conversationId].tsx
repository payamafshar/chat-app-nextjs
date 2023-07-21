
import { NextPage } from "next";
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from "../utils/hooks/useAuth";
import TemporaryDrawer from "../components/drawer/Drawer";
import { useRouter } from "next/router";
import { getConversationById } from "../utils/services/conversationService";
import { Conversation, MessageType } from "../utils/types/types";
import { getMessagesFromConversation } from "../utils/services/messageService";
import ConversationMessage from "../components/messages/ConversationMessage";


const ConversationChanellPage  =() => {
  const {user , loading} = useAuth()
  const [messages,setMessages] = useState<MessageType[]>([])
  const router = useRouter()
  const {conversationId} = router.query  

  
  useEffect(()=> {
    const id = Number(conversationId)
    getMessagesFromConversation(id).then(({data}) => setMessages(data)).catch(err => console.log(err))



  },[conversationId,router.query])


    return <div className="h-full flex flex-col w-full ">
     <div className="bg-blackSmooth h-[70px]  p-5 sticky w-full flex justify-between items-center   top-0">
        <TemporaryDrawer />
        <p className="text-textInner text-lg font-bold">
          {
            user?.username
          }
        </p>
      </div>
       
       
         
    <aside className="w-full   bg-white  h-full   ">
   

      <div className="bg-blackSmooth w-full h-full flex flex-col flex-1s    justify-end items-start px-1  ">


         <ConversationMessage  messages={messages} /> 
 
      </div>

      

    </aside>
   
   
    <div className="bg-blackSmooth w-full h-[70px] overflow-hidden  p-2 flex justify-start  sticky bottom-0 ">
     <div className=" w-11/12 ">

     <input placeholder="Write Message ..." className=" w-full p-5 ml-5 h-[55px] bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
     </div>
   </div>
   </div> 

}


export default ConversationChanellPage