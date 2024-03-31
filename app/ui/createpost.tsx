'use client'

import { useFormState } from "react-dom";
import { createPost } from "../actions";
import CustomTextInput from "./components/input";

const initialState = {
  message: ''
}

export default function CreatePost(){
  const [data, formAction] = useFormState(createPost, initialState);

   return(
      <form className="w-full h-fit flex flex-col justify-between my-auto p-5" action={formAction}>
         <p> { data?.message } </p>
         <CustomTextInput id="title" placeholder="Title"/>
         <CustomTextInput id="content" placeholder="Post Content"/>
         <button className = "bg-black text-white rounded-md p-3" type="submit"> Submit </button>
      </form>
   )
}