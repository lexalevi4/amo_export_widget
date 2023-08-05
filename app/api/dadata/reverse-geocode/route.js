import { dadata_geocode_url, dadata_key } from "@/app/params/params";
import { NextResponse } from "next/server";


// fetch(url, options)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));

export async function GET(request, response) {

    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    var query = { lat: lat, lon: lng, count: 1 };

    const dadata = await fetch(dadata_geocode_url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + dadata_key
        },
        body: JSON.stringify(query)
    });
    const dadata_response = await dadata.json()
    console.log(dadata_response);
    return NextResponse.json(dadata_response);

}