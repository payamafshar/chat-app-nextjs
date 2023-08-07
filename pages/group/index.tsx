import { UserIcon } from "@heroicons/react/24/outline"
import { useAuth } from "../../utils/hooks/useAuth"
import CoversationSideBar from "../../components/conversation/ConversationSideBar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store"
import { updateType } from "../../store/selectedSlice"

const GroupPage = () => {

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {

    dispatch(updateType('group'))
  })
    const { user } = useAuth()

    return  <div  className="h-screen w-full grid grid-cols-12 grid-rows-full ">

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



export default GroupPage