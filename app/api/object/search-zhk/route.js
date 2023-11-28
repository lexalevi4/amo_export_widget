
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get('input');
    const src = searchParams.get('src');


    const res = await sendGetRequest(process.env.API_URL + 'api/search-zhk?input=' + input + '&src=' + src)

    return NextResponse.json(res);

}