
import { sendGetRequest, sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function GET(request, response) {
    // const { base64encode, } = require('nodejs-base64');
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');

    // const formData = await request.formData();
    // formData.get("flat");
    // console.log(formData.get("flat"));
    const res = await sendGetRequest(process.env.API_URL + 'api/get-lead-card?lead_id=' + leadId)
    // const res = await sendGetRequest(process.env.API_URL + 'api/get-filters-by-lead',
    //     {
    //         leadId: formData.get("leadId"),
    //     })
    // console.log(res);

    return NextResponse.json(res);


    // return NextResponse.json([]);
}