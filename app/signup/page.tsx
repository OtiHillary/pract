'use client'

import { useFormState } from "react-dom"
import { signup } from "../actions"
import CustomTextInput from "../ui/components/input"
import Link from "next/link"

const initialState = {
  message: ''
}

export default function Home(){
  const [data, formAction] = useFormState(signup, initialState)
  
  return(
    <div className="w-1/3 m-auto border-black rounded-md h-12 flex flex-col justify-center">
      <h1 className="font-black text-black text-2xl px-5">Sign up</h1>
      <form className="w-full h-fit flex flex-col justify-between my-auto px-5" action={formAction}>
         <p className={`${ data.message == ''? 'visible': 'invisible' }p-3 m-4 text-red-500 border-red-500 bg-red-50 border-l-4`}> { data.message } </p>
         <CustomTextInput id="email" placeholder="Input email"/>
         <button className = "bg-black text-white rounded-md p-3" type="submit"> Submit </button>
      </form>
      <Link href={'/'} className="hover:underline text-sm px-5">{`I have an account`}</Link>
    </div>
  )
}