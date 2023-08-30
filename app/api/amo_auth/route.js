
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'


// const getUser = async () => {


// }

// export async function OPTIONS(req, res) {
//     return new Response('', {
//         status: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': '*',
//         },
//     })
// }

export async function GET(req, response) {

    console.log('asdfasfd');

    const { searchParams } = new URL(req.url)
    const session = searchParams.get('session')
    const cookieStore = cookies()
    cookieStore.set('sessionId', session);
    return NextResponse.json([])


}