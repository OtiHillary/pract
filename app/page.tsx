import { useFormState } from "react-dom";
import DisplayPosts from "./ui/posts";
import CreatePost from "./ui/createpost";

export default function Home() {

  return (
    <main className="w-full h-full flex flex-col justify-center">
      <div className="w-1/3 m-auto">
        <CreatePost />
        <DisplayPosts />
      </div>
    </main>
  );
}
