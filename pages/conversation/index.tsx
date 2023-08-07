import CoversationSideBar from "../../components/conversation/ConversationSideBar"
import { useAuth } from "../../utils/hooks/useAuth"
import {UserIcon} from '@heroicons/react/24/outline'



 const Conversation = () => {

    const {user} = useAuth()

    return <div  className="h-screen w-full grid grid-cols-12 grid-rows-full ">

    <div className="col-span-3 row-span-6 flex-col ">
      <CoversationSideBar  />
    </div>
  
    <div className="bg-blackSmooth col-span-9  flex justify-end p-6 items-center h-[75px]  w-full">
          <div className="text-textInner flex  items-center justify-start h-full text-lg font-bold">
          <p className='text-base h-2/4 '>
           {
            user?.username
            }
          </p>
          <div className="h-3/4 ml-4"><UserIcon  className=" h-8 w-8  "/></div>
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