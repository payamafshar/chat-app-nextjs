import { useAuth } from "../../utils/hooks/useAuth";
import { MessageType, User } from "../../utils/types/types";
import React from "react";


type Props = {
    messages : MessageType[]
}

type FormatedProps= {

    user?: User 
    message : MessageType
}

const  FormatedMessage : React.FC<FormatedProps> = ({user,message})  =>  {

    return (
        <div className=" flex flex-col px-12  justify-end items-center "> 

        <div className="flex justify-center items-center">
            <div className="h-12 w-12 rounded-full bg-buttonBgDark"></div>
            <div>
           <div className="flex justify-center  items-center p-1 ">
           <p className={`font-bold text-lg  ml-2  mb-1 ${user?.id == message.author.id ? "text-buttonBgDark":"text-white"} `}>{message.author.username}</p> 
             <p className="text-xs font-semibold ml-2 flex-1 whitespace-nowrap text-white">{message.createdAt}</p>
           </div>
           <div className="text-textInner px-1 ml-2">
            {message.content}
        </div>
           </div>
        </div>
        
    </div>
    )


}

const ConversationMessage :React.FC<Props> =  ({messages}) => {

    const {user} = useAuth()

    console.log(messages)


 
  const mapMessage = () => {

    return messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedMessage message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage?.author.id) {

            return  <div className=" flex flex-col   justify-end items-center p-2 px-12   "> 
              
               <div className="text-textInner px-12  ml-3">
                {message.content}
            </div>
            
        </div>
        }
        return <FormatedMessage message={message} user={user} />
    })
  }

    return <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col  justify-end items-start px-1 ">
        {mapMessage()}
    </div>
        
}


export default ConversationMessage