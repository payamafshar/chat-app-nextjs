import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import FormatedMessage from './FormatedMessageContainer'
import React from "react";


type Props = {
    messages : MessageType[]
}




const ConversationMessage :React.FC<Props> =  ({messages}) => {

    const {user} = useAuth()



 
  const mapMessage = () => {

    return messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedMessage message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage.author.id) {

            return  <div className=" flex flex-col-reverse   justify-end items-center p-2 px-12   "> 
              
               <div className="text-textInner px-12  ml-3">
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