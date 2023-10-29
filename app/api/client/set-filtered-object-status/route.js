

import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const res = await sendPostRequest(process.env.API_URL + 'api/set-filtered-object-status',
        {
            filterId: searchParams.get('filterId'),
            objectId: searchParams.get('objectId'),
            status: searchParams.get('status'),
        })
    return NextResponse.json(res);
}