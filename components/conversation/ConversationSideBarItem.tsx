import React from "react"
import { Conversation } from "../../seed/convarsatioonData"

type Props = {

    conversation :Conversation
}

const ConversationSideBarItem : React.FC<Props> =( {conversation}) => {

    const { id , name} = conversation
    return <div className="flex mt-4 ">
     <div className="bg-buttonBgDark w-12 h-12 rounded-full"></div>
    <div className="flex flex-col ml-3 justify-evenly">
        <span className="font-bold text-sm text-textInner">{name}</span>
        <span className="text-xs text-graySmooth">hello how are u ?</span>
    </div>
    
    </div>
}


export default ConversationSideBarItem