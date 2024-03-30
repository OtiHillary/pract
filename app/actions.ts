'use server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

async function createPost( prevState: any, formdata: FormData ){
   const schema = z.string({ 
      required_error: 'this field is required',
      invalid_type_error: 'invalid type inputed' 
   })

   const isValidated = schema.safeParse( formdata.get('post') )

   if (!isValidated) {
      return {
         message: 'Could not post successfully'
      }
   }
   return {
      message: 'Post successful'
   }
}

async function login( prevState:any, formdata: FormData ) {
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
   createPost
}