import type { NextPage } from 'next'
import CoversationSideBar from '../components/conversation/ConversationSideBar'
import ConversationContent from '../components/conversation/ConversationContent'



const Home: NextPage = () => {


  return (
   <>
   
   <div className='flex justify-center items-center w-full h-screen'>

    <CoversationSideBar />
    <ConversationContent />

   </div>
   
  
   
   </>

      

  )
}

export default Home
