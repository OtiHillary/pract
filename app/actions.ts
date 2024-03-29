'use server'

import { z } from 'zod'

export async function createPost( prevState: any, formdata: FormData ){
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