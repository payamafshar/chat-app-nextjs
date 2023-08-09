
import React, {  useContext, useEffect,  useState } from 'react';
import { useAuth } from "../../utils/hooks/useAuth";
import { useRouter } from "next/router";
import { Conversation, MessageEventPayload, DeleteMessageResponse, MessageType, Group, GroupSingleMessageType, GroupMessageEventPayload } from "../../utils/types/types";
import ConversationMessage from "../../components/messages/ConversationMessage";
import CoversationSideBar from "../../components/conversation/ConversationSideBar";
import { SocketContext } from "../../utils/context/SocketContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { createConversationMessageThunk } from "../../store/messages/thunkMessages";
import { addMessages, deleteMessage, editMessage } from "../../store/messages/messageSlice";
import { addConversation, selectConversationById, updateConversation } from "../../store/conversations/conversationSlice";
import { updateType } from '../../store/selectedSlice';
import { addGroup, selectGroupById } from '../../store/groups/groupSlice';
import { addGroupMessage } from '../../store/groupMessage/groupMessageSlice';
import GroupMessage from '../../components/group/GroupMessage';


const GroupChanelPage  =() => {
  const {user , loading} = useAuth()
  const [msg,setMsg] = useState<string>('')
  const [typing,setTyping] = useState(false)
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()
  const [recipientTyping , setRecipientTyping] = useState(false)
  const socket = useContext(SocketContext)
  const router = useRouter()
  const {groupId} = router.query  
  const dispatch = useDispatch <AppDispatch>()

  // for selecting specefig group with page  params and use Redux Selector
  const speceficGroup = useSelector((state:RootState) => selectGroupById(state,Number(groupId)))



  useEffect(()=>{

    dispatch(updateType('group'))

    socket.emit('onGroupJoin' , {groupId})

    socket.on('onGroupCreate' , (payload:Group) => {

      dispatch(addGroup(payload))
    })

    socket.on('onGroupMessageCreate' , (payload:GroupMessageEventPayload) => {

      dispatch(addGroupMessage(payload))
    })
   
    return () => {
      socket.emit('onGroupLeave' , {groupId})
      socket.off('onGroupJoin')
      socket.off('onGroupCreate')
      socket.off('onGroupMessageCreate')
    }
  },[groupId ])

  const handleUserTyping = () => {
  

  }


    return <div  className="h-screen w-full grid grid-cols-12 grid-rows-full ">

  <div className="col-span-3 row-span-6 flex-col ">
    <CoversationSideBar  />
  </div>

  <div className="bg-blackSmooth col-span-9  flex justify-center p-6 items-center h-[75px]  w-full">
        <div className="text-textInner flex flex-col items-center justify-between h-full text-lg font-bold">
        <p className='text-base h-2/4 '>
        {
            speceficGroup?.title
        }
        </p>
        {
        recipientTyping && <div className='text-textInner text-xs h-2/4 p-3'> typing... </div>
        }
        </div>
       
      </div>
       
       
         <div className="col-span-9 row-span-6  flex flex-col justify-start items-start  overflow-y-scroll  scrollbar ">
   

   <div className="bg-inputBgDark w-full  flex-1 flex-col   justify-start items-start px-1 ">


      <GroupMessage />

   </div>

   

 <div className="bg-blackSmooth w-full  col-span-9  p-2  flex justify-start  sticky bottom-0 ">
     <form  className=" w-11/12 ">

     <input onKeyDown={handleUserTyping} value={msg}  placeholder="Write Message ..." className=" w-full p-5 ml-5 h-[55px] outline-none bg-inputBgDark text-textInner font-semibold text-md  px-6 rounded-md placeholder: " />
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


export default GroupChanelPage