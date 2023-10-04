import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    // console.log(request);


    const formData = await request.formData();
    // formData.get("flat");
    // console.log(formData.get("flat"));

    const res = await sendPostRequest('https://turbobroker.ru/api/get-map-cluster-objects',
        {
            cluster: JSON.parse(formData.get("cluster")),
            search: JSON.parse(formData.get("search"))
        })
    // console.log(res);

    return NextResponse.json(res);

}