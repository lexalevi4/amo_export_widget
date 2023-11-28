
import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    // const { base64encode, } = require('nodejs-base64');


    const formData = await request.formData();
    // formData.get("flat");
    // console.log(formData.get("flat"));

    const res = await sendPostRequest(process.env.API_URL + 'api/save-filter',
        {
            name: formData.get("name"),
            search: formData.get("search"),
            leadId: formData.get("leadId"),
            filterId: formData.get("filterId"),
        })
    // console.log(res);

    return NextResponse.json(res);


    // return NextResponse.json([]);
}