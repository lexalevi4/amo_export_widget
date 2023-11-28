// import { dadata_geocode_url, dadata_key } from "@/app/params/params";
import { sendPostRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";


// fetch(url, options)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));

export async function POST(request, response) {
    // console.log(request);


    const formData = await request.formData();
    // formData.get("flat");
    // console.log(formData.get("flat"));

    const res = await sendPostRequest(process.env.API_URL + 'api/save-ad', { data: JSON.parse(formData.get("data")) })
    console.log(res);

    return NextResponse.json(res);

}