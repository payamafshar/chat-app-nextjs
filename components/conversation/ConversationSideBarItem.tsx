import React, { useEffect } from "react"
import { Conversation } from "../../utils/types/types"
import { useRouter } from "next/router"
import Link from "next/link"

type Props = {

    conversation :Conversation
}

const ConversationSideBarItem : React.FC<Props> =( {conversation}) => {

    const router = useRouter()
    
    const { id ,recipient,lastMessageSent} = conversation

    const handleClick = (id:number) => {

        router.push(`/conversation/${id}`)

    }

    return <>
     <div onClick={()=> handleClick(id)} className="flex mt-4 cursor-pointer " >
     <div className="bg-buttonBgDark w-12 h-12 rounded-full"></div>
    <div className="flex flex-col ml-3 justify-evenly">
        <span className="font-bold text-sm text-textInner">{recipient.username}</span>
        <span className="text-xs text-graySmooth">{lastMessageSent?.content}</span>
    </div>
    
    </div>
    </>
}


export default ConversationSideBarItem