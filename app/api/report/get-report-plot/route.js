
import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    console.log(request)
    const formData = await request.formData();
    // console.log(request)

    const res = await sendPostRequest(process.env.API_URL + 'api/generate-report-plot',
        {
            plot_data: JSON.parse(formData.get("plot_data")),
        })

    return NextResponse.json(res);
}