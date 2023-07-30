import React from "react"
import { Location } from "../messages/ConversationMessage"

type Props = {
    location:Location | undefined
}

const ContextMenu : React.FC<Props> = ({location}) => {

    return <div style={{ left: location?.pointX, top: location?.pointY }} className={`bg-blackSmooth w-36 h-48 p-4 fixed `}>
        <ul>
            <li className="text-white">
                Delete
            </li>
            <li className="text-white">Edit</li>
        </ul>
    </div>
}


export default ContextMenu