
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const res = await sendGetRequest(process.env.API_URL + 'api/delete-filter?id=' + id)
    return NextResponse.json(res);
}