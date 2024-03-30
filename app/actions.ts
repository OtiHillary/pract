'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import jwt, { Secret } from 'jsonwebtoken';
import { encrypt, Payload } from './lib'

async function createPost( prevState: any, formdata: FormData ){
   const schema = z.object({ 
      author: z.string({ required_error: 'Tis field is required' }),
      title: z.string({ required_error: 'Tis field is required' }),
      content: z.string({ required_error: 'Tis field is required' }) 
   })

   const token: string | undefined = cookies().get('user')?.toString();
   const { loginToken }= jwt.verify(token, process.env.JWT_SECRET) as unknown as Payload;
   const { user } = await sql`select from users where token = "${ loginToken }"`
   
   const data = {
      title: formdata.get('title')?.toString(),
      content: formdata.get('content')?.toString(),
   } 

   const isValidated = schema.safeParse(data)

   if (!isValidated) {
      return {
         message: 'Could not post successfully'
      }
   }

   await sql`
      insert into posts (author_id, title, content, likes, reposts) 
      values (${ user.id } , ${ data.title }, ${ data.content }, ${0}, ${0})
   `
   
   return {
      message: 'Post successful'
   }
}

async function getPosts(){
   const { posts } =   await sql`
      SELECT u.name AS author_name, p.title, p.content, p.likes, p.reposts
      FROM posts AS p
      INNER JOIN users AS u ON p.author_id = u.id;
   `
   return posts
}

async function login( prevState:any, formdata: FormData ) {
   const schema = z.object({
      login_token: z.string({ required_error: 'field is required' }),
   })

   const data = {
      loginToken: formdata.get('log_token'),
   }
   console.log(data)
   const isValidated = schema.safeParse(data)

   const { user } = await sql`select from users where token = "${ data.loginToken }"`

   if (!isValidated) return { message: 'Login failure'} 
   else if (!user)   return { message: 'User Token does not exists' }

   let payload = encrypt(data)
   cookies().set('user', payload)

   redirect('/home')
}

async function signup( prevState:any, formdata: FormData ) {
   const schema = z.object({
      email: z.string({ required_error: 'field is required' }).email({ message: 'Invalid email' }),
      passsword: z.string({ required_error: 'Field is required' })
   })
   const data = {
      email: formdata.get('email'),
      password: formdata.get('password')
   }
   const isValidated = schema.safeParse(data)

   if (!isValidated) {
      return { message: 'Login failure'} 
   }

   redirect('/home')
}

export {
   login,
   signup,
   createPost,
   getPosts
}