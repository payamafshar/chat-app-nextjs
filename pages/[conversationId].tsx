
import React, {  useContext, useEffect,  useState } from 'react';
import { useAuth } from "../utils/hooks/useAuth";
import { useRouter } from "next/router";
import { Conversation, MessageEventPayload, DeleteMessageResponse } from "../utils/types/types";
import ConversationMessage from "../components/messages/ConversationMessage";
import CoversationSideBar from "../components/conversation/ConversationSideBar";
import { SocketContext } from "../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { createConversationMessageThunk } from "../store/messages/thunkMessages";
import { addMessages, deleteMessage } from "../store/messages/messageSlice";
import { addConversation, selectConversationById, updateConversation } from "../store/conversations/conversationSlice";


const ConversationChanellPage  =() => {
  const {user , loading} = useAuth()
  const [msg,setMsg] = useState<string>('')
  const [typing,setTyping] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()
  const [recipientTyping , setRecipientTyping] = useState(false)
  const socket = useContext(SocketContext)
  const router = useRouter()
  const {conversationId} = router.query  
  const dispatch = useDispatch <AppDispatch>()
  const speceficConversation = useSelector((state: RootState) =>
  selectConversationById(state, Number(conversationId!))
);



  useEffect(()=>{

    socket.emit('onConversationJoin' ,  {conversationId})


    socket.on('userJoin' , () => {
      console.log('user Joined Conversation')
    })
    socket.on('userLeave' , () => {
      console.log('user Leaved Conversation')
    })


    socket.on('userStartTyping' , () => {

      console.log('user is typeing')
      setRecipientTyping(true)
      
    })


    socket.on('userStopTyping' , () => {

      console.log('user is stop typeing')
      setRecipientTyping(false)

    })


    socket.on('onMessage',(payload: MessageEventPayload) => {

      const {conversation } = payload
      dispatch(addMessages(payload))
      dispatch(updateConversation(conversation))
    })
    // handle recipient create conversation realtime//* creator show conversation handled by redux
    socket.on('onConversationCreate' , (payload:Conversation) => {
        dispatch(addConversation(payload))
    })

 
    socket.on('onDeleteMessage' , (payload:DeleteMessageResponse) => {
      dispatch(deleteMessage(payload))
    } )


    return () => {
      socket.emit('onConversationLeave' , {conversationId})
      socket.off('connected')
      socket.off('onConversationCreate')
      socket.off('onDeleteMessage')
      socket.off('userJoin')
      socket.off('userLeave')
      socket.off('userStopTyping')
      socket.off('userStartTyping')
    }

  },[conversationId])

  const handleUserTyping = () => {
    // fireing subscribe message Event On BackEnd and that event sendUser status typing
    //on another event(userStartTyping, userStopTyping) and we listen that events to get recipient status
    // on above useEffect beacuse on backEnd rooms emit event for connected user expet himself
    if(typing) {
      clearTimeout(timer)
      setTimer(setTimeout(()=> {

        console.log('user is stop ')
        socket.emit('onTypingStop' , {conversationId})
        setTyping(false)
      },2000))

    }else {
      setTyping(true)
      socket.emit('onTypingStart',{conversationId})
      console.log('user is typing')

    }

  


  }

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

    return <div  className="h-screen w-full grid grid-cols-12 grid-rows-full ">

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

     <input onKeyDown={handleUserTyping} value={msg} onChange={handleInputChange} placeholder="Write Message ..." className=" w-full p-5 ml-5 h-[55px] outline-none bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
     </form>
     {
      recipientTyping && <div> typing... </div>
     }
   </div>
         </div>
        <div  >
        </div>
   

   </div> 

}


export default ConversationChanellPage