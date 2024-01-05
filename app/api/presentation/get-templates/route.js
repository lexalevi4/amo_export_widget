// import { dadata_geocode_url, dadata_key } from "@/app/params/params";
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";


// fetch(url, options)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));

export async function GET(request, response) {

    const res = await sendGetRequest(process.env.API_URL + 'api/get-presentation-templates')
    // console.log(res);
    return NextResponse.json(res);

}