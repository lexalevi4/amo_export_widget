
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'



export async function GET(req, response) {

    console.log('asdfasfd');

    const { searchParams } = new URL(req.url)
    const session = searchParams.get('session')
    const cookieStore = cookies()
    cookieStore.set('sessionId', session);
    return NextResponse.json([])


}