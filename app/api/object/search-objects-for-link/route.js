// import { dadata_geocode_url, dadata_key } from "@/app/params/params";
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import { NextResponse } from "next/server";


// fetch(url, options)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));

export async function GET(request, response) {
    const { searchParams } = new URL(request.url)
    const input = searchParams.get('input')
    const res = await sendGetRequest(process.env.API_URL + 'api/search-objects-for-link', { input: input })
    console.log(res);
    return NextResponse.json(res);

}