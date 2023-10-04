import { dadata_suggest_url, } from "@/app/params/params";
import { NextResponse } from "next/server";
// import { Redis } from 'ioredis';
import { getRedisClient } from "@/app/heplers/redis";
import { base64encode } from 'nodejs-base64'
// import base64encode from 'nodejs-base64'



export async function POST(req, response) {
    // const { base64encode, } = require('nodejs-base64');



    const body = await req.json();
    const encoded = (base64encode(body.query))
    var query = {
        query: body.query,
        count: 10,
        locations: [
            { fias_id: '29251dcf-00a1-4e34-98d4-5c47484a36d4' },
            { fias_id: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5' }
        ]
    };
    const client = await getRedisClient();
    try {


        const cached = await client.get(process.env.REDIS_DADATA_SUGGEST_PREFIX + encoded)
        if (cached) {
            try {
                await client.quit();
            } catch (e) {

            }
            // console
            return NextResponse.json(JSON.parse(cached));
        }
    } catch (e) {

    }

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

        try {
            if (!dadata_response.reason) {
                console.log('saving')
                // await client.set(process.env.REDIS_DADATA_SUGGEST_PREFIX + encoded, JSON.stringify(dadata_response))
                // await client.expire(process.env.REDIS_DADATA_SUGGEST_PREFIX + encoded, 86400 * 14)
                try {
                    await client.quit();
                } catch (e) {

                }
            }

        } catch (e) {

        }


        return NextResponse.json(dadata_response);
    } catch (e) {
        return NextResponse.json([]);
    }

}