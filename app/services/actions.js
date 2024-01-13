'use server'

import { sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler"

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