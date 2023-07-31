import { useEffect } from "react"
import { MessageType, User } from "../../utils/types/types"
import { Location } from "./ConversationMessage"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { setContextMenuLocation, toggleContextMenu } from "../../store/messageContainerSlice"

type FormatedProps= {

    user?: User 
    message : MessageType
    // location:Location | undefined
    setLocation :React.Dispatch<React.SetStateAction<Location | undefined>>
}


const  FormatedMessage : React.FC<FormatedProps> = ({user,message , setLocation})  =>  {
 
    const dispatch = useDispatch<AppDispatch>()

    const handleShowContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent> , messageId:number) => {
        dispatch(toggleContextMenu(true))
        dispatch(setContextMenuLocation({x:event.pageX , y:event.pageY}))
    }

    return (
        <div className=" flex flex-col px-12  justify-end items-center "> 

        <div className="flex justify-center items-center mb-2">
            <div className="h-10 w-10 rounded-full bg-buttonBgDark"></div>
            <div>
           <div className="flex justify-center  items-center p-1 py-2  ">
           <p className={`font-bold text-reg  ml-2   ${user?.id == message.author.id ? "text-buttonBgDark":"text-white"} `}>{message.author.username}</p> 
             <p className="text-xs font-semibold ml-2 flex-1 whitespace-nowrap text-white">{message.createdAt}</p>
           </div>
           <div   onClick={(e) => handleShowContextMenu(e , message.id)} className="text-textInner  px-1 ml-2">
            {message.content}
        </div>
           </div>
        </div>
        
    </div>
    )
    }

    export default FormatedMessage

