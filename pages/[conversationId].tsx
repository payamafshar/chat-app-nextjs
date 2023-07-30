
import { NextPage } from "next";
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useAuth } from "../utils/hooks/useAuth";
import TemporaryDrawer from "../components/drawer/Drawer";
import { useRouter } from "next/router";
import { getConversationById } from "../utils/services/conversationService";
import { Conversation, MessageEventPayload, MessageType, CreateMessageParams } from "../utils/types/types";
import { createMessage, getMessagesFromConversation } from "../utils/services/messageService";
import ConversationMessage from "../components/messages/ConversationMessage";
import CoversationSideBar from "../components/conversation/ConversationSideBar";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createConversationMessageThunk, fetchConversationMessagesThunk } from "../store/messages/thunkMessages";
import { addMessages } from "../store/messages/messageSlice";
import { addConversation, selectConversationById, updateConversation } from "../store/conversations/conversationSlice";
import { fetchConversationThunk } from "../store/conversations/thunkConversation";


const ConversationChanellPage  =() => {
  const {user , loading} = useAuth()
  const [msg,setMsg] = useState<string>('')
  const socket = useContext(SocketContext)
  const router = useRouter()
  const {conversationId} = router.query  
  const dispatch = useDispatch <AppDispatch>()
  
  const speceficConversation = useSelector((state: RootState) =>
  selectConversationById(state, Number(conversationId!))
);
console.log(speceficConversation)

const conversations= useSelector((state:RootState) => state.conversation.conversations)

console.log(conversations)
  useEffect(()=>{

    socket.on('onMessage',(payload: MessageEventPayload) => {

      const {conversation } = payload
      dispatch(addMessages(payload))
      dispatch(updateConversation(conversation))

    })
    // handle recipient create conversation realtime//* creator show conversation handled by redux
    socket.on('onConversationCreate' , (payload:Conversation) => {
        dispatch(addConversation(payload))
    })

    socket.on('connected' , (data)=> {
      console.log('connected')
      console.log(data)
    })
    return () => {
      socket.off('onMessage')
      socket.off('connected')
      socket.off('onConversationCreate')
    }

  },[])

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {

    setMsg(event.target.value)

  }

  const handleSubmitMessage =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const convNumber = Number(conversationId)
    const data = {conversationId:convNumber,content:msg}

     dispatch(createConversationMessageThunk(data))

     setMsg('')

  }

    return <div className="h-screen w-full grid grid-cols-12 grid-rows-full ">

  <div className="col-span-3 row-span-6 flex-col ">
    <CoversationSideBar  />
  </div>

  <div className="bg-blackSmooth col-span-9  flex justify-end p-6 items-center h-[75px]  w-full">
        <p className="text-textInner  text-lg font-bold">
          {
           user?.id == speceficConversation?.creator.username ?  speceficConversation?.recipient.username : speceficConversation?.creator.username 
          }
        </p>
      </div>
       
       
         <div className="col-span-9 row-span-6  flex flex-col justify-start items-start  overflow-y-scroll  scrollbar ">
   

   <div className="bg-inputBgDark w-full  flex-1 flex-col   justify-start items-start px-1 ">


      <ConversationMessage/> 

   </div>

   

 <div className="bg-blackSmooth w-full  col-span-9  p-2  flex justify-start  sticky bottom-0 ">
     <form onSubmit={handleSubmitMessage} className=" w-11/12 ">

     <input value={msg} onChange={handleInputChange} placeholder="Write Message ..." className=" w-full p-5 ml-5 h-[55px] outline-none bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
     </form>
   </div>
         </div>
 
   
   

   </div> 

}


export default ConversationChanellPage