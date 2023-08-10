import { useContext, useEffect } from "react"
import CoversationSideBar from "../../components/conversation/ConversationSideBar"
import { useAuth } from "../../utils/hooks/useAuth"
import {UserIcon} from '@heroicons/react/24/outline'
import { addMessages } from "../../store/messages/messageSlice"
import { updateConversation } from "../../store/conversations/conversationSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { MessageEventPayload } from "../../utils/types/types"
import { SocketContext } from "../../utils/context/SocketContext"



 const Conversation = () => {

    const {user} = useAuth()

    const dispatch = useDispatch<AppDispatch>()

    const socket = useContext(SocketContext)
    useEffect(() => {
      socket.on('onMessage',(payload: MessageEventPayload) => {

        const {conversation } = payload
        dispatch(addMessages(payload))
        dispatch(updateConversation(conversation))
        console.log('dispatch happpen onMessage')
      })
    })

    return <div  className="h-screen w-full grid grid-cols-12 grid-rows-full ">

    <div className="col-span-3 row-span-6 flex-col ">
      <CoversationSideBar  />
    </div>
  
    <div className="bg-blackSmooth col-span-9  flex justify-end p-6 items-center h-[75px]  w-full">
          <div className="text-textInner flex  items-center justify-start h-full text-lg font-bold">
          <p className='text-base h-4/4 '>
           {
            user?.username
            }
          </p>
          <div className="h-4/4 ml-4"><UserIcon  className=" h-8 w-8  "/></div>
          </div>
         
        </div>
         
         
           <div className="col-span-9 row-span-6  flex flex-col justify-start items-start  overflow-y-scroll  scrollbar ">
     
  
     <div className="bg-inputBgDark w-full  flex-1 flex-col   justify-start items-start px-1 ">
  
  
  
     </div>
  
     
  
  
           </div>
          <div  >
          </div>
     
  
     </div> 
}



export default Conversation