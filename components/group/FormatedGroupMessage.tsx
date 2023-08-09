import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { GroupMessageType, User } from "../../utils/types/types"
import { AppDispatch } from "../../store"

type FormatedProps= {

    user?: User 
    message : GroupMessageType 
}


const  FormatedGroupMessage : React.FC<FormatedProps> = ({user,message  })  =>  {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const {groupId} = router.query


    return (
        <div className=" flex flex-col px-12  justify-end items-center "> 

        <div className="flex justify-center items-center mb-2">
            <div className="h-10 w-10 rounded-full bg-buttonBgDark "></div>
            <div>
           <div className="flex justify-center  items-center p-1 py-2  ">
           <p className={`font-bold text-reg  ml-2   ${user?.id == message.author.id ? "text-buttonBgDark":"text-white"} `}>{message.author.username}</p> 
             <p className="text-xs font-semibold ml-2 flex-1 whitespace-nowrap text-white">{message.createdAt}</p>
           </div>
           <div   className="text-textInner  px-1 ml-2">
           <div  >  {message.content}</div>
                <form>
              <div>
                {/* {
                  isEditingMessage && selectedMessage?.id == message.id && <> <input onChange={(e) => handleChangeSetEditing(e)} className="w-full text-white rounded placeholder:Edit Message... bg-blackSmooth p-2" value={messageBeingEdited?.content} />   <button type="submit" onClick={(e) => handleEditMessageSubmit} className="text-sm text-blackSmooth cursor-pointer font-bold ">Edit </button>
                  <span className="text-sm text-blackSmooth cursor-pointer font-bold ml-8">Cancel </span></>
                } */}
               
              </div>
              </form>
            
        </div>
           </div>
        </div>
    </div>
    )
    }

    export default FormatedGroupMessage