import DisplayPosts from "../ui/posts";
import CreatePost from "../ui/createpost";

export default async function Home() {
   return (
      <div className="w-1/3 m-auto border-black rounded-md h-full">
        <CreatePost />
        <DisplayPosts/>
      </div>
  );
}
