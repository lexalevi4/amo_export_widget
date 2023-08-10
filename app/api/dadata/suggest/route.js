import { dadata_suggest_url, } from "@/app/params/params";
import { NextResponse } from "next/server";



export async function POST(req, response) {

    const body = await req.json();
    var query = { query: body.query, count: 10 };

    try {
        const dadata = await fetch(dadata_suggest_url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + process.env.DADATA_TOKEN
            },
            body: JSON.stringify(query)
        });
        const dadata_response = await dadata.json()
        // const dadata_response = []
        console.log(dadata_response);
        return NextResponse.json(dadata_response);
    } catch (e) {
        return NextResponse.json([]);
    }

}