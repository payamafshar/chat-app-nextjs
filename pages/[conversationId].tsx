
import { NextPage } from "next";
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from "../utils/hooks/useAuth";
import TemporaryDrawer from "../components/drawer/Drawer";
import { useRouter } from "next/router";
import { getConversationById } from "../utils/services/conversationService";
import { Conversation, MessageType } from "../utils/types/types";
import { getMessagesFromConversation } from "../utils/services/messageService";
import ConversationMessage from "../components/messages/ConversationMessage";
import CoversationSideBar from "../components/conversation/ConversationSideBar";


const ConversationChanellPage  =() => {
  const {user , loading} = useAuth()
  const [messages,setMessages] = useState<MessageType[]>([])
  const router = useRouter()
  const {conversationId} = router.query  

  
  useEffect(()=> {
    const id = Number(conversationId)
    getMessagesFromConversation(id).then(({data}) => setMessages(data)).catch(err => console.log(err))



  },[conversationId,router.query])


    return <div className="h-screen w-full grid grid-cols-12 grid-rows-full ">

  <div className=" col-span-3 row-span-6 flex-col     ">
    <CoversationSideBar />
  </div>

  <div className="bg-blackSmooth col-span-9  flex justify-end p-6 items-center h-[75px]  w-full">
        <p className="text-textInner text-lg font-bold">
          {
            user?.username
          }
        </p>
      </div>
       
       
         <div className="col-span-9 row-span-6  flex flex-col justify-start items-start bg-buttonBgDark overflow-y-scroll  ">
         <aside className=" w-full    bg-blackSmooth    ">
   

   <div className="bg-blackSmooth w-full  flex flex-col    justify-start items-start px-1  ">


      <ConversationMessage  messages={messages} /> 

   </div>

   

 </aside> 
 <div className="bg-blackSmooth w-full  col-span-9  p-2  flex justify-start  sticky bottom-0 ">
     <div className=" w-11/12 ">

     <input placeholder="Write Message ..." className=" w-full p-5 ml-5 h-[55px] bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
     </div>
   </div>
         </div>
 
   
   

   </div> 

}


export default ConversationChanellPage