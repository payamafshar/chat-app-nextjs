import { NextPage } from "next"
import Link from "next/link"
import { FormEvent, FormEventHandler } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { RegisterUserParams } from "../utils/types/types"
import { useRouter } from "next/router"
import { postRegisterUser } from "../utils/services/authService"




const Register: NextPage = () => {
  const router = useRouter()
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserParams>()
  const onSubmit =async (params:RegisterUserParams) => {
    
   

       await postRegisterUser(params).then(res => {
        console.log(res.data)
        router.push('/')
      }).catch(err => console.log(err))

      
    

   
 
  }
    return (
      <form className="h-screen flex justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
      
      <div className="w-2/5  h-2/5 flex flex-col">

        <label htmlFor="username" className="text-white text-xs font-semibold ">Username</label>
        <input id="username"  {...register('username',{required:'username is required'})} className="w-full  text-textInner p-3 bg-inputBgDark  rounded-md outline-none font-semibold " />
        <div className="flex justify-center items-center gap-x-2 w-full ">
           <div className="flex flex-col w-2/4">
           <label htmlFor="firstname" className="text-white text-xs font-semibold">FirstName</label>
            <input id="firstname"  {...register('firstName',{required:'firstname is required'})} className=" p-3 bg-inputBgDark text-textInner rounded-md outline-none font-semibold"/>
           </div>
           <div className="flex flex-col w-2/4">
           <label htmlFor="lastname" className="text-white text-xs font-semibold ">LastName</label>
            <input id="lastname"  {...register('lastName',{required:'lastname is required'})} className=" p-3 bg-inputBgDark text-textInner rounded-md outline-none font-semibold" />
           </div>
        </div>
        <label htmlFor="password" className="text-white text-xs font-semibold ">Password</label>
        <input id="password" type="password"  {...register('password',{required:'password is required'})} className="w-full text-textInner p-3 bg-inputBgDark mb-2 rounded-md outline-none font-semibold " />

        <button className="w-full bg-buttonBgDark text-textInner font-bold  p-3 rounded-md">Create My Account</button>
        <div className="flex items-start">
            <p className="text-textInner font-semibold text-sm">Already have acocount?</p>
            <span className="text-buttonBgDark font-semibold text-sm">
                <Link href={'/login'}>
                    Login
                </Link>
            </span>
        </div>
      </div>
        
      </form>
    )
  }
  
  export default Register