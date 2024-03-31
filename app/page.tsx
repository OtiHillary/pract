'use client'

import { useFormState } from "react-dom"
import { login } from "./actions"
import CustomTextInput from "./ui/components/input"
import Link from "next/link"

const initialState = {
  message: ''
}

export default function Home(){
  const [data, formAction] = useFormState(login, initialState)
  
  return(
    <div className="w-1/3 m-auto border-black rounded-md h-12 py-5 flex flex-col justify-center">
      <h1 className="font-black text-black px-5 text-2xl">Login</h1>
      <form className="w-full h-fit flex flex-col justify-between px-5" action={formAction}>
         <p className={`${ data.message == ''? 'visible': 'invisible' }p-3 m-4 text-red-500 border-red-500 bg-red-50 border-l-4`}> { data.message } </p>
         <CustomTextInput id="log_token" placeholder="Login Token"/>
         <button className = "bg-black text-white rounded-md p-3" type="submit"> Submit </button>
      </form>
      <Link href={'/signup'} className="hover:underline text-sm px-5">{`I don't have an account`}</Link>
    </div>
  )
}