import { useEffect } from "react"
import { MessageType, User } from "../../utils/types/types"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { setContextMenuLocation, setSelectedMessage, toggleContextMenu , } from "../../store/messageContainerSlice"

type FormatedProps= {

    user?: User 
    message : MessageType
}


const  FormatedMessage : React.FC<FormatedProps> = ({user,message })  =>  {
 
    const dispatch = useDispatch<AppDispatch>()
    const onContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent> , message:MessageType) => {
        event.preventDefault()
        dispatch(toggleContextMenu(true))
        dispatch(setContextMenuLocation({x:event.pageX , y:event.pageY}))
        dispatch(setSelectedMessage(message))
    }
  

    return (
        <div className=" flex flex-col px-12  justify-end items-center "> 

        <div className="flex justify-center items-center mb-2">
            <div className="h-10 w-10 rounded-full bg-buttonBgDark "></div>
            <div>
           <div className="flex justify-center  items-center p-1 py-2  ">
           <p className={`font-bold text-reg  ml-2   ${user?.id == message.author.id ? "text-buttonBgDark":"text-white"} `}>{message.author.username}</p> 
             <p className="text-xs font-semibold ml-2 flex-1 whitespace-nowrap text-white">{message.createdAt}</p>
           </div>
           <div   onClick={(e) => onContextMenu(e , message)} className="text-textInner  px-1 ml-2">
            {message.content}
        </div>
           </div>
        </div>
    </div>
    )
    }

    export default FormatedMessage

