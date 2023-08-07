import ConversationSideBarItem from "./ConversationSideBarItem";
import TransitionsModal from "../modal/Modal";
import { useEffect} from "react";
import { ConversationType } from "../../utils/types/types";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationThunk } from "../../store/conversations/thunkConversation";
import { AppDispatch, RootState } from "../../store";
import { chatTypes } from "../../utils/constants";
import { updateType } from "../../store/selectedSlice";
import GroupSideBarItem from "../group/groupSideBarItem";
import { fetchGroupThunk } from "../../store/groups/thunkGroups";
import { useRouter } from "next/router";





const CoversationSideBar  = () => {
  const router = useRouter()
  const dispatch  = useDispatch<AppDispatch>()
  const  conversations = useSelector((state :RootState) => state.conversation.conversations)
  const  selectedType = useSelector((state :RootState) => state.selectedConversationType.type)
  const groups = useSelector((state:RootState) => state.groups.groups )
  useEffect(()=>{

    dispatch(fetchConversationThunk())
    dispatch(fetchGroupThunk())

  },[])


  const handleConversationType = (type:ConversationType) => {

    dispatch(updateType(type))
    router.push('/groups')

  }
 



    return <aside className={`bg-inputBgDark w-full h-screen overflow-y-scroll scrollbar ` }>


     <div className="flex justify-between  p-6 sticky  bg-blackSmooth  top-0">
       <div className="flex ">

        <p className="text-lg font-bold text-textInner">Coversations</p>
       </div>
        <span className="">
           
            <TransitionsModal />
        </span>
     </div>

      <div className="flex justify-evenly mt-6   items-center">
          {
            chatTypes.map( (item ) =>  <button  key={item.label} onClick={ () =>  handleConversationType(item.type)} className="p-1.5 text-textInner text-sm font-semibold px-4 py-2 mb-2 hover:bg-blackSmooth   border border-white rounded-lg">{item.label}</button> )
          }
     </div>
     <div className="  h-full flex-1 flex-col justify-start px-6 ">
       
       {
        
        selectedType == 'private' ? 
         conversations?.map(conversation => { 
          return <ConversationSideBarItem key={conversation.id} conversation={conversation}/> 
          })

          : groups?.map(group => <GroupSideBarItem key={group.id} group={group} />)
       }
     
    

     </div>

    </aside>
}




export default CoversationSideBar