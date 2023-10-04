import { sendPostRequest } from "@/app/heplers/backendApiHandler";
// import { NextResponse } from "next/server";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const requestData = {
        z: searchParams.get('z'),
        bbox: searchParams.get('bbox'),
        search: searchParams.get('search'),
        callback: searchParams.get('callback'),
    }

    const result = await sendPostRequest('https://turbobroker.ru/api/get-map-objects', requestData)
    
    return new Response(result.result)
}