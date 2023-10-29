
import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const status = searchParams.get('status');
    const page = searchParams.get('page');
    const res = await sendPostRequest(process.env.API_URL + 'api/get-filtered-objects',
        {
            id: id,
            status: status,
            page: page,
        })
    return NextResponse.json(res);
}