import { sendPostRequest } from "@/app/heplers/backendApiHandler";
// import { NextResponse } from "next/server";
import { getRedisClient } from "@/app/heplers/redis";
import { base64encode } from 'nodejs-base64'
import { getSessionId } from "@/app/heplers/session";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const requestData = {
        z: searchParams.get('z'),
        bbox: searchParams.get('bbox'),
        search: searchParams.get('search'),
        callback: searchParams.get('callback'),
    }
    const encoded = (base64encode(JSON.stringify({
        z: searchParams.get('z'),
        bbox: searchParams.get('bbox'),
        search: searchParams.get('search'),
    })))
    const session = getSessionId();
    const client = await getRedisClient();
    try {


        const cached = await client.get(process.env.REDIS_MAP_CLUSTER_PREFIX + session + encoded)
        // console.log(cached)
        if (cached) {
            try {
                await client.quit();
            } catch (e) {

            }
            console.log('restore')
            const response_data = searchParams.get('callback') + '(' + cached + ');';
            return new Response(response_data)
            // return NextResponse.json(JSON.parse(cached));
        }
    } catch (e) {
        console.log(e)
    }

    const result = await sendPostRequest('https://turbobroker.ru/api/get-map-objects', requestData)


    try {
        if (result.result) {
            // console.log('saving')
            await client.set(process.env.REDIS_MAP_CLUSTER_PREFIX + session + encoded, result.result)
            await client.expire(process.env.REDIS_MAP_CLUSTER_PREFIX + session + encoded, 120)
            try {
                await client.quit();
            } catch (e) {

            }
        }

    } catch (e) {

    }


    return new Response(searchParams.get('callback') + '(' + result.result + ');')
}