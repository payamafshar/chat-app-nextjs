import { MessageType, User } from "../../utils/types/types"

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

    export default FormatedMessage

