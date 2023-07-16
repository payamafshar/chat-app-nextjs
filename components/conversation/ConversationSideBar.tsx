import { NextPage } from "next";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import ConversationSideBarItem from "./ConversationSideBarItem";
import { conversationData } from "../../seed/convarsatioonData";




const CoversationSideBar  = () => {



    return <aside className="bg-inputBgDark w-1/4 h-full overflow-y-scroll ">


     <div className="flex justify-between  p-6 sticky  bg-blackSmooth  top-0">
        <p className="text-lg font-bold text-textInner">Coversations</p>
        <span className="">
            <PencilSquareIcon className="h-7 w-7 text-textInner font-bold text-lg" />
        </span>
     </div>

     <div className=" flex h-full flex-col justify-start px-6 ">
       
       {


       conversationData.map(item => <ConversationSideBarItem  conversation={item}/>)


       }
    

     </div>

    </aside>
}




export default CoversationSideBar