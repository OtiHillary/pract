'use client'

import { useFormState } from "react-dom";
import { createPost } from "../actions";

const initialState = {
  message: ''
}

export default function CreatePost(){
  const [data, formAction] = useFormState(createPost, initialState);

   return(
      <form className="w-full h-12 bg-gray-300 flex flex-col justify-between m-auto" action={formAction}>
         <input className="border-black outline-black" type="text" name="post" id="post"/>
         <p> { data.message } </p>
         <button className = "bg-black text-white rounded-md p-3" type="submit"> Submit </button>
      </form>
   )
}