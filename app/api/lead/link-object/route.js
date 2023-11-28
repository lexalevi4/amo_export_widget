import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function POST(request, response) {

    const formData = await request.formData();
    const res = await sendPostRequest(process.env.API_URL + 'api/link-object-to-lead', { data: JSON.parse(formData.get("data")) })
    console.log(res);


    return NextResponse.json(res);

}