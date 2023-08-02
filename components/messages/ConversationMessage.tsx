import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import FormatedMessage from './FormatedMessageContainer'
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationMessagesThunk } from "../../store/messages/thunkMessages";
import { toggleContextMenu , setContextMenuLocation, setSelectedMessage } from "../../store/messageContainerSlice";
import ContextMenu from "../contextMenu/ContextMenu";


const ConversationMessage  =  () => {

    const {user} = useAuth()
    const router = useRouter()
    const {conversationId} = router.query
    const elemRef = useRef<HTMLDivElement>(null)
    const dispatch = useDispatch<AppDispatch>()
    const showContextMenu = useSelector((state:RootState) => state.messageContainer.showContextMenu)
    const messages = useSelector((state:RootState) => state.message.messages)

  
  

 


    useEffect(()=> {

        const id = Number(conversationId)
        
        dispatch(fetchConversationMessagesThunk(id))
    
      },[ conversationId])

      useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            event.preventDefault()
          if (elemRef.current && elemRef.current.contains(event.target as Node)) {
            dispatch(toggleContextMenu(false));
          }
        };
        document.addEventListener("click", handleClick);
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);

 

 const onContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent> , message:MessageType) => {
    event.preventDefault()
    dispatch(toggleContextMenu(true))
    dispatch(setContextMenuLocation({x:event.pageX , y:event.pageY}))
    dispatch(setSelectedMessage(message))

 }
  const mapMessage = () => {
    const msg = messages.find(cm => cm.conversationId == Number(conversationId))

    return msg?.messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedMessage    message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage.author.id) {

            return  <div  onClick={(event) =>  onContextMenu (event,message)}  className=" flex flex-col-reverse   justify-start items-center mb-2 px-12    "> 
              
               <div className="text-textInner  px-10 ml-3">
                {message.content}
                </div>
            
        </div>
        }
        return <FormatedMessage  message={message} user={user} />
    })
  }

    return <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col-reverse  justify-start items-start px-1 ">
        {mapMessage()}
        <div  ref={elemRef}>
        {showContextMenu && <ContextMenu  />}

        </div>
    </div>
        
}


export default ConversationMessage