import type { NextPage } from 'next'
import CoversationSideBar from '../components/conversation/ConversationSideBar'
import ConversationContent from '../components/conversation/ConversationContent'
import { useAuth } from '../utils/hooks/useAuth'



const Home: NextPage = () => {

  const {user,loading} = useAuth()

  console.log(user)
  return (
   <>
   
   <div className='grid grid-cols-12 grid-rows-6 w-full h-screen'>

   
    <div className='col-span-12 row-span-6 h-full'>

    <ConversationContent />
    </div>

   </div>
   
  
   
   </>

      

  )
}

export default Home
