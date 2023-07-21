import { MessageType, User } from "../../utils/types/types";
import React from "react";


type Props = {
    conversationMessage:MessageType

}

const  ConversationMessage :React.FC<Props> =  ({conversationMessage}) => {

    const { author,createdAt,id,content} = conversationMessage


    return <div className="flex flex-col px-12"> 

        <div className="flex justify-center items-center">
            <div className="h-12 w-12 rounded-full bg-buttonBgDark"></div>
            <div>
           <div className="flex justify-center items-center p-1 py-2">
           <p className="font-bold text-lg text-textInner ml-2 mb-1 ">{author.username}</p> 
             <p className="text-xs font-semibold ml-2 text-white">{createdAt}</p>
           </div>
           <div className="text-textInner px-1 ml-2">
            {content}
        </div>
           </div>
        </div>
        
    </div>

}


export default ConversationMessage