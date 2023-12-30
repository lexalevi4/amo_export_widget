// import { dadata_geocode_url, dadata_key } from "@/app/params/params";
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";


export async function GET(request, response) {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lng = searchParams.get('lng')
    const res = await sendGetRequest(process.env.API_URL + 'api/get-metro-and-highways', { lat: lat, lng: lng })
    console.log(res);
    return NextResponse.json(res);

}