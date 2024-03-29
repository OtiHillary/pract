'use client'

import { useFormState } from "react-dom";
import { createPost } from "./actions";

const initialState = {
  message: ''
}

export default function Home() {
  const [data, formAction] = useFormState(createPost, initialState);

  return (
    <main className="w-full h-full">
      <form className="flex flex-col" action={formAction}>
        <input type="text" name="post" id="post"/>
        <input> { data.message } </input>
        <button type="submit"> Submit </button>
      </form>
    </main>
  );
}
