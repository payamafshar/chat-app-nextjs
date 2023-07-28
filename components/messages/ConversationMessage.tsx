import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import FormatedMessage from './FormatedMessageContainer'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationMessagesThunk } from "../../store/messages/thunkMessages";


type Props = {
    messages : MessageType[]
}




const ConversationMessage  =  () => {

    const {user} = useAuth()
    const router = useRouter()
    const {conversationId} = router.query
    const dispatch = useDispatch<AppDispatch>()

    useEffect(()=> {

        
        const id = Number(conversationId)
        
        dispatch(fetchConversationMessagesThunk(id))
    
      },[router.query , conversationId])

   
 const { messages , loading:messageLoading} = useSelector((state:RootState) => state.message)

 useEffect(() => {

    console.log({messages})
 },[])
  const mapMessage = () => {
    const msg = messages.find(cm => cm.conversationId == Number(conversationId))

    return msg?.messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedMessage message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage.author.id) {

            return  <div className=" flex flex-col-reverse   justify-end items-center mb-2 px-12    "> 
              
               <div className="text-textInner px-10 ml-3">
                {message.content}
            </div>
            
        </div>
        }
        return <FormatedMessage message={message} user={user} />
    })
  }

    return <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col-reverse  justify-end items-start px-1 ">
        {mapMessage()}
    </div>
        
}


export default ConversationMessage