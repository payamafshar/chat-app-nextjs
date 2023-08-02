import type { NextPage } from 'next'
import CoversationSideBar from '../components/conversation/ConversationSideBar'
import { useAuth } from '../utils/hooks/useAuth'



const Home: NextPage = () => {

  const {user,loading} = useAuth()

  return (
   <>
   
   <div className='grid grid-cols-12 grid-rows-6 w-full h-screen'>

   
    <div className='col-span-12 row-span-6 h-full'>

    helllo world
    </div>

   </div>
   
  
   
   </>

      

  )
}

export default Home
