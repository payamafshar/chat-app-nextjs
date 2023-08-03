import React, { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { MessageType, User } from "../../utils/types/types"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { editMessageContent, setContextMenuLocation, setIsEditing, setSelectedMessage, toggleContextMenu , } from "../../store/messageContainerSlice"
import { editMessageThunk } from "../../store/messages/thunkMessages"
import { useRouter } from "next/router"

type FormatedProps= {

    user?: User 
    message : MessageType
    handleEditMessageSubmit:React.FormEventHandler<HTMLFormElement> 
}


const  FormatedMessage : React.FC<FormatedProps> = ({user,message , handleEditMessageSubmit })  =>  {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const isEditingMessage = useSelector((state:RootState) => state.messageContainer.isEditingMessage)
    const selectedMessage = useSelector((state:RootState) => state.messageContainer.selectedMessage)
    const messageBeingEdited = useSelector((state:RootState) => state.messageContainer.messageBeingEdited)
    const {conversationId} = router.query
    const onContextMenu = (event:React.MouseEvent<HTMLDivElement, MouseEvent> , message:MessageType) => {
        event.preventDefault()
        dispatch(toggleContextMenu(true))
        dispatch(setContextMenuLocation({x:event.pageX , y:event.pageY}))
        dispatch(setSelectedMessage(message))
        dispatch(setIsEditing(false))
    }
  
   const handleChangeSetEditing = (e:ChangeEvent<HTMLInputElement>) => {

        dispatch(editMessageContent(e.target.value))

     }

    //  const handleEditMessageSubmit = (e :React.FormEvent<HTMLFormElement>) => {

    //     e.preventDefault()
    //     const id = Number(conversationId)
    //     const param = {
    //         messageId : selectedMessage?.id!,
    //         conversationId:id,
    //         content : messageBeingEdited?.content
    //       }
    
    // //fetching api 
    //   dispatch(editMessageThunk(param))

    //  }

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
           <div  className="bg-buttonBgDark" onClick={(e) => onContextMenu(e , message)}>  {message.content}</div>
                <form onSubmit={   handleEditMessageSubmit}>
              <div>
                {
                  isEditingMessage && selectedMessage?.id == message.id && <> <input onChange={(e) => handleChangeSetEditing(e)} className="w-full text-white rounded placeholder:Edit Message... bg-blackSmooth p-2" value={messageBeingEdited?.content} />   <button type="submit" onClick={(e) => handleEditMessageSubmit} className="text-sm text-blackSmooth cursor-pointer font-bold ">Edit </button>
                  <span className="text-sm text-blackSmooth cursor-pointer font-bold ml-8">Cancel </span></>
                }
               
              </div>
              </form>
            
        </div>
           </div>
        </div>
    </div>
    )
    }

    export default FormatedMessage

