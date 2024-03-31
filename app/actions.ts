'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import { encrypt, decrypt, Payload, generate } from './lib'
import { revalidatePath } from 'next/cache'

async function createPost( prevState: any, formdata: FormData ){
   const schema = z.object({ 
      author: z.string({ required_error: 'This field is required' }),
      title: z.string({ required_error: 'This field is required' }),
      content: z.string({ required_error: 'This field is required' }) 
   })
   const token = cookies().get('user')?.value;

   if(token){
      const login = decrypt(token);
      const { rows } = await sql`SELECT * FROM users WHERE token = ${ login?.toString() };`
      console.log(`DECRYPTING ${token} TO ${login}`)
      console.log(rows)
      
      const data = {
         title: formdata.get('title')?.toString(),
         content: formdata.get('content')?.toString(),
      } 

      const isValidated = schema.safeParse(data)

      if (!isValidated) return { message: 'Could not post successfully' }

      await sql`
         insert into posts (author_id, title, content, likes, reposts) 
         values (${ rows[0].id } , ${ data.title }, ${ data.content }, ${0}, ${0})
      `
      revalidatePath('/home')
      return {
         message: 'Post successful'
      }      
   }


}

async function getPosts(){
   const { rows } =   await sql`
      SELECT u.name AS author_name, p.title, p.content, p.likes, p.reposts
      FROM posts AS p
      INNER JOIN users AS u ON p.author_id = u.id;
   `
   return rows
}

async function login( prevState:any, formdata: FormData ) {
   const schema = z.object({
      login_token: z.string({ required_error: 'field is required' }),
   })

   const data = {
      loginToken: formdata.get('log_token')?.toString(),
   }
   const isValidated = schema.safeParse(data)

   const user = await sql` SELECT * FROM users WHERE token = ${ data.loginToken };`

   if (!isValidated) return { message: 'Login failure'} 
   else if (!user)   return { message: 'User Token does not exists' }

   let payload = encrypt(data)
   cookies().set('user', payload)

   redirect('/home')
}

async function logout(prevState:any) {
   cookies().delete('user')
}

async function signup( prevState:any, formdata: FormData ) {
   const schema = z.object({
      email: z.string({ required_error: 'field is required' }).email({ message: 'Invalid email' }),
   })
   const data = {
      email: formdata.get('email'),
   }

   const isValidated = schema.safeParse(data)

   if (!isValidated) {
      return { message: 'Login failure'} 
   }

   let token = generate(data.email?.toString())

   const cookieData = {
      loginToken: token
   }
   let payload = encrypt(cookieData)
   cookies().set('user', payload)

   redirect('/home')
}

export {
   login,
   signup,
   createPost,
   getPosts
}