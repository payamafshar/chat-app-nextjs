import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import FormatedMessage from './FormatedMessageContainer'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchConversationMessagesThunk } from "../../store/messages/thunkMessages";
import ContextMenu from "../contextMenu/ContextMenu";


type Props = {
    messages : MessageType[]
}

export interface Location {
    pointX:number | undefined
    pointY:number | undefined
}




const ConversationMessage  =  () => {

    const [showContextMenu , setShowContextMenu] = useState(false)
    const [loacation,setLocation] = useState<Location>()
    const {user} = useAuth()
    const router = useRouter()
    const {conversationId} = router.query
    const dispatch = useDispatch<AppDispatch>()
    const refElem = React.useRef(null)

    useEffect(()=> {

        const id = Number(conversationId)
        
        dispatch(fetchConversationMessagesThunk(id))
    
      },[ conversationId])

   
 const { messages , loading:messageLoading} = useSelector((state:RootState) => state.message)


 useEffect(() => {

    console.log({messages})
 },[])

 const handleShowContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    setShowContextMenu(true)
    setLocation({pointX:event.pageX,pointY:event.pageY})

 }
  const mapMessage = () => {
    const msg = messages.find(cm => cm.conversationId == Number(conversationId))

    return msg?.messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedMessage setShowContextMenu={setShowContextMenu} setLocation={setLocation}  message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage.author.id) {

            return  <div className=" flex flex-col-reverse   justify-start items-center mb-2 px-12    "> 
              
               <div ref={refElem} onClick={(event) =>  handleShowContextMenu (event)} className="text-textInner px-10 ml-3">
                {message.content}
                </div>
            
        </div>
        }
        return <FormatedMessage setShowContextMenu={setShowContextMenu} setLocation={setLocation}  message={message} user={user} />
    })
  }

    return <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col-reverse  justify-start items-start px-1 ">
        {mapMessage()}{showContextMenu && <ContextMenu location={loacation} />}
    </div>
        
}


export default ConversationMessage