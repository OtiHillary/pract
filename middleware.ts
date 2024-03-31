import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest){
   let user = request.cookies.get('user')
   let pathname = new URL(request.url).pathname

   if(user){
      return NextResponse.redirect(new URL('/home', request.url))
   }
   return NextResponse.next()
}

export const config = {
   matcher: ['/login', '/signup' ]
}