'use server'

import { base64encode } from "nodejs-base64";
import { sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler"
import { getRedisClient } from "../heplers/redis";
import { dadata_suggest_url } from "../params/params";

export async function sendApiRequest(type, url, data) {

    try {
        if (type === 'get') {
            const res = await sendGetRequest(process.env.API_URL + url, data);
            // const result = await res.json();
            // console.log(res);
            return res;
        }
        if (type === 'post') {
            const res = await sendPostRequest(process.env.API_URL + url, data);
            // const result = await res.json();
            return res;
        }
    } catch (e) {
        console.log(e);
        return { status: 'error' };
    }
    return { status: 'error' };

}

export async function addressSuggest(q, locations = []) {



    let result = [];

    var query = {
        query: q,
        division: "municipal",
        count: 10,
        // locations: locations
    };


    if (locations.length > 0) {
        query.locations = locations.map(item => {
            return { 'fias_id': item }
        })
    }

    console.log(query);
    const encoded = (base64encode(JSON.stringify(query)))
    const client = await getRedisClient();
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
        console.log(
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Token " + process.env.DADATA_TOKEN
                },
                body: JSON.stringify(query)
            }
        )
        const dadata_response = await dadata.json()
        // result = dadata_response;
        result = dadata_response.suggestions.map(item => {
            return { 'label': item.value, 'value': item?.data?.fias_id || null }
        })
        // const dadata_response = []
        console.log(dadata_response);


        try {
            if (!dadata_response.reason) {
                console.log('saving')
                await client.set(process.env.REDIS_DADATA_SUGGEST_PREFIX + encoded, JSON.stringify(dadata_response))
                await client.expire(process.env.REDIS_DADATA_SUGGEST_PREFIX + encoded, 86400 * 14)
                try {
                    await client.quit();
                } catch (e) {
                    console.log(e)
                }
            }

        } catch (e) {
            console.log(e)

        }


        return result;
    } catch (e) {
        console.log(e)
        return [];
    }

}