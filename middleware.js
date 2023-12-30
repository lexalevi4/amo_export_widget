
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function middleware(request) {
  // console.log(request.nextUrl.pathname);
  const res = NextResponse.next()
  // const  cookieStore = cookies();
  // console.log('middleware')
  // console.log(cookieStore.getAll);
  // console.log('middleware_headers')
  // console.log(request.url)
  // request.headers.getAll()
  // const requestHeaders = new Headers(request.headers);
  // console.log(requestHeaders);
  // console.log('middleware_end')
  // res.headers.append('Location', 'http://localhost:3000/' + request.url)
  res.headers.append('P3P', 'CP="ALL DSP COR CUR ADM PSA CONi OUR SAM OTR UNR LEG"');
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT, OPTIONS')
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-auth-token, P3p'
  )

  // try {
  //   console.log(request.cookies)
  // } catch (e) {
  //   console.log(e)
  // }


  // if (request.nextUrl.pathname === '/') {

  const { searchParams } = new URL(request.url)
  const session = searchParams.get('session')
  const page = searchParams.get('page')
  // searchParams.g
  // const cookieStore = cookies()
  // if (request.nextUrl.pathname === '/') {
  // localStorage.set()
  if (session && session !== '' && session !== null) {
    // console.log('-------------')
    // console.log(session)
    // console.log('-------------')
    res.cookies.set({
      name: 'session_id',
      value: session,
      sameSite: 'none',

      // sameSite: 'lax',
      secure: true,
      httpOnly: true,
      expires: ((Date.now() / 1000) + 86400) * 1000,
      // domain:""
    }

    );


    // cookieStore.set(
    //   {
    //     name: 'session_id__',
    //     value: session,
    //     sameSite: 'none',
    //     // sameSite: 'lax',
    //     secure: true,
    //     httpOnly: true,
    //     expires: ((Date.now() / 1000) + 86400) * 1000,
    //   }
    // )
    // console.log(res.cookies.getAll);
    // return NextResponse.redirect(new URL(page, request.url))
    // redirect(page)
    // return NextResponse.rewrite(new URL(request.url, request.url))
  }
  // }
  // NextResponse.rewrite(request.url+'&asdfasdf')

  if (request.nextUrl.pathname === '/api/common/session') {
    // retrieve the current response


    // add the CORS headers to the response
    // res.headers.append('Access-Control-Allow-Credentials', "true")
    // res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    // res.headers.append('Access-Control-Allow-Methods', 'GET, DELETE, PATCH, POST, PUT, OPTIONS')
    // res.headers.append(
    //   'Access-Control-Allow-Headers',
    //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-auth-token'
    // )
  }

  // res.re

  return res
}

// specify the path regex to apply the middleware to
export const config = {
  //   // matcher: '/api/:path*',
  matcher: ['/api/common/session', '/', '/:path*',
    '/objects',
    '/lead-card',
    '/export',
    '/clients',
    '/settings',

    // '/((?!|_next/static|_next/image|favicon.ico).*)',
  ],
}