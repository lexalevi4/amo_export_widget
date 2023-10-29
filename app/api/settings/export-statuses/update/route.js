import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function POST(request, response) {

    const formData = await request.formData();
    const result = await sendPostRequest(process.env.API_URL + 'api/update-export-statuses', JSON.parse(formData.get("statuses")))

    return NextResponse.json(result);

}