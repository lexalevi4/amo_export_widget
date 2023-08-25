// import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
// import { session } from './app/heplers/session'
// import { Redis } from 'ioredis';
// import nextAppSession from 'next-app-session/dist/session';
// import nextAppSession from 'node_modiles/'
// import nextAppSession from 'next-app-session/dist/session';
// import type { NextRequest } from 'next/server'

export async function middleware(request) {
    // console.log(request.connection);
    // NextRequest().ip
    //    console.log(request.ip)
    const response = NextResponse.next()
    // const cookieStore = await cookies();
    // response.cookies.set('ip', request.ip)
    // cookieStore.set('ip', request.ip)
    return response
}

export const config = {

    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}