import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest){
   let cookie = request.cookies.get('user')
   if (cookie){
      return NextResponse.redirect( new URL('/', request.url) )
   }

}