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

    const res = sendPostRequest('https://turbobroker.ru/api/save-object', { flat: formData.get("user") })


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
    // const dadata_response = await dadata.json()

    return NextResponse.json([]);

}