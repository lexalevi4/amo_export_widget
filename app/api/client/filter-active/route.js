
import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const res = await sendPostRequest(process.env.API_URL + 'api/set-filter-active',
        {
            id: id,
        })
    return NextResponse.json(res);
}