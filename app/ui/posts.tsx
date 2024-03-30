import { getPosts } from "../actions";

type postData = {
   author_name: string;
   title: string;
   content: string;
   likes: string;
   reposts: string;
}

export default async function DisplayPosts() {
   const dataPost: postData[] = await getPosts()

   return (
      <div className="flex flex-col border border-gray-200 rounded-md p-2">
         { 
            dataPost.map((post, key) => (
               <div key={key}>
                  <h4>{post.author_name}</h4> 
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
               </div>
            ))
         }
      </div>
   )
}