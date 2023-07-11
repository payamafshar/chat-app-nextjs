import { NextPage } from "next"
import Link from "next/link"


const Register: NextPage = () => {
    return (
      <div className="h-screen flex justify-center items-center">
      
      <div className="w-2/5  h-2/5 flex flex-col">

        <label htmlFor="email" className="text-textInner text-xs font-semibold ">Email</label>
        <input id="email" name="email" className="w-full text-textInner p-3 bg-inputBgDark  rounded-md outline-none focus:ring-buttonBgDark focus:ring-1 " />
        <div className="flex justify-center items-center gap-x-2 w-full mb-2">
           <div className="flex flex-col w-2/4">
           <label htmlFor="firstname" className="text-textInner text-xs font-semibold">FirstName</label>
            <input id="firstname" name="firstname" className=" p-3 bg-inputBgDark rounded-md outline-none focus:ring-buttonBgDark focus:ring-1"/>
           </div>
           <div className="flex flex-col w-2/4">
           <label htmlFor="lastname" className="text-textInner text-xs font-semibold ">LastName</label>
            <input id="lastname" name="lastname" className=" p-3 bg-inputBgDark rounded-md outline-none focus:ring-buttonBgDark focus:ring-1" />
           </div>
        </div>

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
        
      </div>
    )
  }
  
  export default Register