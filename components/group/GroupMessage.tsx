import { useRouter } from "next/router";
import { useAuth } from "../../utils/hooks/useAuth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchGroupMessagesThunk } from "../../store/groupMessage/thunkGroupMessage";
import FormatedGroupMessage from "./FormatedGroupMessage";


const GroupMessage  =  () => {

    const {user} = useAuth()
    const router = useRouter()
    const {groupId} = router.query
    const dispatch = useDispatch<AppDispatch>()
    const messages = useSelector((state:RootState) => state.groupMessage.messages)

  
    useEffect(()=> {

        const id = Number(groupId)
        
        dispatch(fetchGroupMessagesThunk(id))
    
      },[groupId])


  

  const mapMessage = () => {
    const msg = messages.find(gm => gm.groupId == Number(groupId))
    console.log(messages)
    return msg?.messages?.map((message,index,arr)=> {

        const currentMessage = arr[index]
        const nextMessage = arr[index+1]

        if(arr.length == index + 1 ) {
            return <FormatedGroupMessage    message={message} user={user}/> 
        }

        if(currentMessage.author.id == nextMessage.author.id) {

            return  <div  className=" flex flex-col-reverse   justify-start items-center mb-2 px-12    "> 
              
               <div  className="text-textInner  px-10 ml-3">
              <div >   {message.content}</div>
              {/* <form onSubmit={handleEditMessageSubmit}>
                <div>

                {
                  isEditingMessage && selectedMessage?.id == message.id && <> <input onChange={(e) => handleChangeSetEditing(e)} className="w-full text-white rounded placeholder:Edit Message... bg-blackSmooth p-2" value={messageBeingEdited?.content} />   <span onClick={(e) => handleEditMessageSubmit(e)} className="text-sm text-blackSmooth cursor-pointer font-bold ">Edit </span>
                  <span onClick={() => dispatch(setIsEditing(false))} className="text-sm text-blackSmooth cursor-pointer font-bold ml-8">Cancel </span></>
                }
               
              </div>
             </form> */}

                </div>
            
        </div>
        }
        return <FormatedGroupMessage    message={message} user={user} />
    })
  }

    return <div className="py-6 h-full bg-inputBgDark w-full flex  flex-col-reverse  justify-start items-start px-1 ">
        {mapMessage()}
      
    </div>
        
}


export default GroupMessage