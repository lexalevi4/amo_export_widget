import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    // console.log(request);


    const formData = await request.formData();
    // formData.get("flat");
    // console.log(formData.get("flat"));

    const result = await sendPostRequest('https://turbobroker.ru/api/update-user', { user: JSON.parse(formData.get("user")) })




    // const dadata = await fetch(dadata_geocode_url, {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         "Authorization": "Token " + process.env.DADATA_TOKEN
    //     },
    //     body: JSON.stringify(query)
    // });
    // const result = await res.json()

    return NextResponse.json(result);

}