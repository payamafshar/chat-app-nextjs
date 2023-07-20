
import { NextPage } from "next";
import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from "../utils/hooks/useAuth";
import TemporaryDrawer from "../components/drawer/Drawer";
import { useRouter } from "next/router";
import { getConversationById } from "../utils/services/conversationService";
import { Conversation, MessageType } from "../utils/types/types";
import { getMessagesFromConversation } from "../utils/services/messageService";


const ConversationChanellPage  =() => {
  const {user , loading} = useAuth()
  const [messages,setMessages] = useState<MessageType[]>([])
  const router = useRouter()
  const {conversationId} = router.query  

  
  useEffect(()=> {
    const id = Number(conversationId)
    getMessagesFromConversation(id).then(({data}) => setMessages(data)).catch(err => console.log(err))



  },[conversationId,router.query])


    return <div className="grid grid-cols-12 grid-rows-6 w-full h-screen">
         <div className='col-span-12 row-span-6 h-full'>

    <aside className="w-full h-full bg-white flex flex-col">
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
      <div className="bg-buttonBgDark w-full h-full flex justify-center items-center">

          {
            messages?.map(item => <div className="bg-white  flex justify-center items-center text-blackSmooth">{item.content}</div>)
          }

      </div>

{/* Conversation input */}
      <div className="bg-blackSmooth w-full h-[100px]  p-2  relative bottom-0 ">
        <div className="fixed w-11/12 h-[100px]">

       <input placeholder="Write Message ..." className=" w-full p-5 ml-5  bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
        </div>
      </div>

    </aside>
    </div>
    </div>

}


export default ConversationChanellPage