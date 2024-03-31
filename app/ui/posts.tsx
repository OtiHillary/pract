import { getPosts } from "../actions";

type postData = {
   author_name: string;
   title: string;
   content: string;
   likes: string;
   reposts: string;
}

export default async function DisplayPosts() {
   const dataPost = await getPosts()
   console.log('post is ', dataPost)

   return (
      <div className="flex flex-col border border-gray-200 rounded-md p-2">
         <h1 className="font-black bg-black text-white rounded-md m-2 p-2">Posts</h1>
         { 
            dataPost.map((post, key) => (
               <div key={key} className="border rounded-md m-2 p-3">
                  <div className="flex mb-2">
                     <div className="bg-gray-200 h-6 w-6 rounded-full me-2"></div>
                     <h4 className="font-bold text-xs rounded-md my-auto">{post.author_name}</h4> 
                  </div>
                  <h2 className="font-semibold text-sm">{post.title.toLocaleUpperCase()}</h2>
                  <p className="text-sm text-gray-500">{post.content}</p>
               </div>
            ))
         }
      </div>
   )
}