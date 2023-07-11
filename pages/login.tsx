import { NextPage } from "next"
import Link from "next/link"
import { useForm } from "react-hook-form"


const Login: NextPage = () => {

  const {register,handleSubmit,formState:{errors}} = useForm()

  console.log(errors)
  const onSubmit =() => {

  }
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="h-screen flex justify-center items-center">
      
      <div className="w-2/5  h-2/5 flex flex-col ">

        <label htmlFor="email" className="text-textInner text-xs font-semibold">Email</label>
        <input  id="email" {...register('email',{required:true})} className="w-full text-textInner outline-none focus:ring-buttonBgDark focus:ring-1 p-3 bg-inputBgDark  rounded-md " />
        <label  htmlFor="password" className="text-textInner text-xs font-semibold">Password</label>
        <input id="password" {...register('password',{required:true})} className=" text-textInner outline-none focus:ring-buttonBgDark focus:ring-1 w-full mb-2 p-3 bg-inputBgDark  rounded-md  " />
          

        <button className="w-full bg-buttonBgDark text-textInner p-3 font-bold rounded-md">Login to account  </button>
        <div className="flex items-start ">
            <p className="text-textInner font-semibold text-sm">Dont have acocount?</p>
            <span className="text-buttonBgDark text-sm font-semibold">
                <Link href={'/register'}>
                    Register
                </Link>
            </span>
        </div>
      </div>
        
      </form>
    )
  }
  
  export default Login