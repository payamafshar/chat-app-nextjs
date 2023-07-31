import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import FormatedMessage from './FormatedMessageContainer'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationMessagesThunk } from "../../store/messages/thunkMessages";
import ContextMenu from "../contextMenu/ContextMenu";
import { toggleContextMenu , setContextMenuLocation } from "../../store/messageContainerSlice";


type Props = {
    messages : MessageType[]
}

export interface Location {
    pointX:number | undefined
    pointY:number | undefined
}




const ConversationMessage  =  () => {

    const [loacation,setLocation] = useState<Location>()
    const {user} = useAuth()
    const router = useRouter()
    const {conversationId} = router.query
    const dispatch = useDispatch<AppDispatch>()
    const { messages , loading:messageLoading} = useSelector((state:RootState) => state.message)

    
    useEffect(()=> {

        const id = Number(conversationId)
        
        dispatch(fetchConversationMessagesThunk(id))
    
      },[ conversationId])

   
   

 const handleShowContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent> , messageId:number) => {

    setLocation({pointX:event.pageX,pointY:event.pageY})
    dispatch(toggleContextMenu(true))
    dispatch(setContextMenuLocation({x:event.pageX , y:event.pageY}))

 }
  const mapMessage = () => {
    const msg = messages.find(cm => cm.conversationId == Number(conversationId))

    return msg?.messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedMessage  setLocation={setLocation}  message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage.author.id) {

            return  <div className=" flex flex-col-reverse   justify-start items-center mb-2 px-12    "> 
              
               <div  onClick={(event) =>  handleShowContextMenu (event,message.id)} className="text-textInner px-10 ml-3">
                {message.content}
                </div>
            
        </div>
        }
        return <FormatedMessage setLocation={setLocation}  message={message} user={user} />
    })
  }

    return <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col-reverse  justify-start items-start px-1 ">
        {mapMessage()}
        
    </div>
        
}


export default ConversationMessage