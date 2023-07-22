import { NextPage } from "next";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import ConversationSideBarItem from "./ConversationSideBarItem";
import TransitionsModal from "../modal/Modal";
import { useEffect, useState } from "react";
import { getConversations } from "../../utils/services/conversationService";
import { Conversation } from "../../utils/types/types";




const CoversationSideBar  = () => {

  const [show,setShow] = useState(false)
  const [conversationData,setConversationData] = useState<Conversation[]>([])
  //change when add redux
  useEffect(()=>{

    try {
        getConversations().then(res =>setConversationData(res.data) ).catch(err => console.log(err))
    } catch (error) {
      
    }

  },[])
 

    return <aside className={`bg-inputBgDark w-full h-screen overflow-y-scroll ` }>


     <div className="flex justify-between  p-6 sticky  bg-blackSmooth  top-0">
       <div className="flex ">

        <p className="text-lg font-bold text-textInner">Coversations</p>
       </div>
        <span className="">
           
            <TransitionsModal />
        </span>
     </div>

     <div className="  h-full flex-1 flex-col justify-start px-6 ">
       
       {


       conversationData?.map(item => <ConversationSideBarItem  conversation={item}/>)


       }
     
    

     </div>

    </aside>
}




export default CoversationSideBar