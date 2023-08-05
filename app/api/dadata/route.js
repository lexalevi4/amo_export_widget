import { NextResponse } from "next/server";

const key = '7dac0f6c00c9702374916448ed7da1134336a44c';
const secret = '44712250761aff8705effdb5451c16ca6dc8e3ac';
const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";



// fetch(url, options)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log("error", error));

export async function GET(request, response) {

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    const options = {

    }

    const dadata = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + key
        },
        body: JSON.stringify({ query: query })
    });
    const dadata_response = await dadata.json()
    console.log(dadata_response);
    return NextResponse.json(dadata_response);

}