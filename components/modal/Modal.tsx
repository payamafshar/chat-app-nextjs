import * as React from 'react';
import Modal from '@mui/material/Modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { createConversationThunk } from '../../store/conversations/thunkConversation';
import { CreateConversationParams } from '../../utils/types/types';
import { useRouter } from 'next/router';



export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>()
  const { register , handleSubmit , formState:{errors} } = useForm<CreateConversationParams>()
  const router = useRouter()
  const onSubmit =async (params:CreateConversationParams) => {

    console.log(params)
    dispatch(createConversationThunk(params)).then((res:any) => {
      console.log(res.payload.data)
      const conversationId:number =  res.payload.data.id
      setOpen(false)
      router.push(`/${conversationId}`)

    }).catch(err => console.log(err))
 
  }
  const refElem = React.useRef(null)

  const handleClick = (event:React.MouseEvent<HTMLDivElement>) => {

    if(event.target == refElem.current) {
        setOpen(false)
    }
  }
  return (
    <div>
    <PencilSquareIcon onClick={handleOpen} className="h-7 w-7 text-textInner cursor-pointer font-bold text-lg" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
    
      
      >
        <div ref={refElem} onClick={(e) => handleClick(e)} className='flex justify-center items-center w-full h-full '>
          <div className=' bg-blackSmooth w-[500px] h-[300px] transition-transform rouneded border-2 rounded opacity-100'>
            
            <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full justify-center items-center w-full'>
        <p className='text-textInner text-lg mb-2 text-center font-bold  '>Create ConverSation</p>

                <label  htmlFor='recipient' className='text-textInner text-sm items-start w-3/4 font-semibold'>Recipient</label>
                <input  id='username' {...register('username',{required:true})} className='w-3/4 p-3 bg-inputBgDark placeholder:Recipient rounded-md mb-2 text-white outline-none font-semibold' />
                <label htmlFor='message' className='text-textInner text-sm w-3/4 font-semibold'>Message</label>
                <input id='message' {...register('message',{required:true})} className='w-3/4 p-3 bg-inputBgDark placeholder:Message(Optional) mb-2 rounded-md text-white font-semibold outline-none' />
                <button className='w-3/4 p-3 bg-buttonBgDark mt-3 rounded-md text-textInner font-semibold'>Create Conversation</button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}