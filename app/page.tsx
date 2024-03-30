'use client'

import { useFormState } from "react-dom"
import { login } from "./actions"
import CustomTextInput from "./ui/components/input"

const initialState = {
  message: ''
}

export default function Home(){
  const [data, formAction] = useFormState(login, initialState)
  
  return(
    <div className="w-1/3 m-auto border-black rounded-md h-12">
      <form className="w-full h-fit flex flex-col justify-between my-auto p-5" action={formAction}>
         <p className="p-3 m-4 text-red-500 border-red-500 bg-red-50 border-l-4"> { data.message } </p>
         <CustomTextInput id="log_token" placeholder="Login Token"/>
         <button className = "bg-black text-white rounded-md p-3" type="submit"> Submit </button>
      </form>
    </div>
  )
}