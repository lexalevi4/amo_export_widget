
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // console.log(request.nextUrl.pathname);
  const res = NextResponse.next()
  if (request.nextUrl.pathname === '/') {
    const { searchParams } = new URL(request.url)
    const session = searchParams.get('session')
    const page = searchParams.get('page')
    // const cookieStore = cookies()
    res.cookies.set({
      name: 'session_id',
      value: session,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      expires: ((Date.now() / 1000) + 86400) * 1000,
      // domain:""
    }
    );
    // return NextResponse.redirect(new URL(page, request.url))
    // redirect(page)
  }
  if (request.nextUrl.pathname === '/api/common/session') {
    // retrieve the current response


    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT, OPTIONS')
    res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-auth-token'
    )
  }


  return res
}

// specify the path regex to apply the middleware to
export const config = {
  // matcher: '/api/:path*',
  matcher: ['/api/common/session', '/',
    // '/((?!|_next/static|_next/image|favicon.ico).*)',
  ],
}