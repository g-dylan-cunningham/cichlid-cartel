import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
// // This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   return NextResponse.redirect(new URL('/home', request.url))
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: '/about/:path*',
// }

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log("startsWith('/admin')")
    const cookieStore = cookies();
    const cartelCookie = cookieStore.get('cartel-jwt');
    const isValidToken = cartelCookie?.value === 'token';
    if (!isValidToken) { // cookies().get('cartel-jwt') !== 'token'
      console.log("invalid TOKEN")
      return NextResponse.rewrite(new URL('/', request.url)) // shows '/' but keeps current url
    }
    return NextResponse.next();
  }
}