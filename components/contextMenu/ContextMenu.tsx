import React, { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { toggleContextMenu } from "../../store/messageContainerSlice"
import { deleteMessageThunk } from "../../store/messages/thunkMessages"
import { useRouter } from "next/router"





const ContextMenu  = () => {
    const  selectedMessage = useSelector((state:RootState)=> state.messageContainer.selectedMessage)
    const  points = useSelector((state:RootState)=> state.messageContainer.points)
    const dispatch = useDispatch<AppDispatch>()
    
    const router = useRouter()
    const {conversationId} = router.query
    
   

      const handleDeleteMessage = () => {

        const id = Number(conversationId)
        if(selectedMessage)
        dispatch(deleteMessageThunk({conversationId:id, messageId:selectedMessage.id}))
        
      }

    return <div>

     <div  style={{ left: points.x, top:points.y }} className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36 h-28 px-4 fixed `}>
        <ul className="flex flex-col justify-center  items-start py-4">
            <li onClick={handleDeleteMessage} className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner">
                Delete
            </li>
            <li className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">Edit</li>
        </ul>
    </div>
    </div>
}


export default ContextMenu