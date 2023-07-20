import { NextPage } from "next"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { LoginUserParams } from "../utils/types/types"
import { useRouter } from "next/router"
import { postLoginUser } from "../utils/services/authService"


const Login: NextPage = () => {
  const router = useRouter()
  const {register,handleSubmit,formState:{errors}} = useForm<LoginUserParams>()
  const onSubmit =async (params:LoginUserParams) => {
try {

  await postLoginUser(params).then((res) => {

    console.log(res.data)
    router.push('/')
  }).catch(err => console.log(err))

} catch (error) {
  console.log(error)
}
  }
    return (

      <form onSubmit={handleSubmit(onSubmit)} className="h-screen flex justify-center items-center">
      
      <div className="w-2/5  h-2/5 flex flex-col border  ">

        <label htmlFor="username" className="text-white text-xs font-semibold ">Username</label>
        <input  id="username" {...register('username',{required:true})} className="w-full  text-textInner outline-none font-semibold p-3 bg-inputBgDark  rounded-md " />
        <label  htmlFor="password" className="text-white text-xs font-semibold">Password</label>
        <input id="password" {...register('password',{required:true})} className="  text-textInner outline-none  font-semibold w-full mb-2 p-3 bg-inputBgDark  rounded-md  " />
          

        <button className="w-full bg-buttonBgDark text-textInner p-3 font-bold rounded-md">Login to account  </button>
        <div className="flex items-start ">
            <p className="text-white font-semibold text-sm">Dont have acocount?</p>
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