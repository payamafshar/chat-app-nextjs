import React, { useEffect, useLayoutEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { setIsEditing, setMessageBeingEdited, toggleContextMenu } from "../../store/messageContainerSlice"
import { deleteMessageThunk, editMessageThunk } from "../../store/messages/thunkMessages"
import { useRouter } from "next/router"






const ContextMenu  = () => {
  const  selectedMessage = useSelector((state:RootState)=> state.messageContainer.selectedMessage)
  const  messageBeingEdited = useSelector((state:RootState)=> state.messageContainer.messageBeingEdited)
  const  points = useSelector((state:RootState)=> state.messageContainer.points)
    const dispatch = useDispatch<AppDispatch>()
    
    const router = useRouter()
    const {conversationId} = router.query
    

   

      const handleDeleteMessage = () => {

        const id = Number(conversationId)
        if(selectedMessage)
        dispatch(deleteMessageThunk({conversationId:id, messageId:selectedMessage.id}))
        dispatch(toggleContextMenu(false))
        
      }
      const handleEditMessage = () => {
        const id = Number(conversationId)
        dispatch(toggleContextMenu(false))
      dispatch(setIsEditing(true))
      dispatch(setMessageBeingEdited(selectedMessage))

      }

    return <div>

     <div  style={{ left: points.x, top:points.y }} className={`bg-blackSmooth z-50 flex flex-col justify-start items-start rounded-md w-36 h-28 px-4 fixed `}>
        <ul className="flex flex-col justify-center  items-start py-4">
            <li onClick={handleDeleteMessage} className="text-white px-1 min-w-full font-semibold py-2  rounded-md hover:text-textInner">
                Delete
            </li>
            <li onClick={handleEditMessage} className="text-white px-1 py-2 font-semibold rounded-md hover:text-textInner">Edit</li>
        </ul>
    </div>
    </div>
}


export default ContextMenu