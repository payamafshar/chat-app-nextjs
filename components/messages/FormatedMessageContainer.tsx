import { MessageType, User } from "../../utils/types/types"
import { Location } from "./ConversationMessage"

type FormatedProps= {

    user?: User 
    message : MessageType
    // location:Location | undefined
    setShowContextMenu : React.Dispatch<React.SetStateAction<boolean>>
    setLocation :React.Dispatch<React.SetStateAction<Location | undefined>>
}


const  FormatedMessage : React.FC<FormatedProps> = ({user,message , setShowContextMenu ,setLocation})  =>  {

    const handleShowContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setShowContextMenu(true)
         setLocation({pointX:event.pageX,pointY:event.pageY})
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
           <div  onClick={(e) => handleShowContextMenu(e)} className="text-textInner  px-1 ml-2">
            {message.content}
        </div>
           </div>
        </div>
        
    </div>
    )
    }

    export default FormatedMessage
