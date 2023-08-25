import { set, get, getAll, destroy, setAll, getSessionId, getSign } from "@/app/heplers/session";
// import { NextResponse } from "next/server";
import { headers } from 'next/headers'
// var crypto = require('crypto');


const serialize = function (obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    var result = str.join("&")
    return result.replace(/&&+/gi, '&')
}

const getSalt = async () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export const sendGetRequest = async (url, data = []) => {

   
    // console.log(sign);
    try {
        const salt = await getSalt();
        const sign = await getSign(salt);
        const req = await fetch(url + '?' + serialize(data),
            {
                method: 'GET',
                headers: {
                    'auth': getSessionId() + ':' + sign.sign + ':' + salt + ':' + sign.timestamp
                },
                next: {
                    revalidate: 0
                }
            }
        )
        return await req.json();
    } catch (e) {
        console.log(e);
        return { status: 'error'  };
    }

}

export const sendPostRequest = async (url, data = []) => {

    // console.log(headers().getAll())
    const salt = await getSalt();
    const sign = await getSign(salt);
    // console.log(data);


    const req = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'auth': getSessionId() + ':' + sign.sign + ':' + salt + ':' + sign.timestamp
        },
        body: JSON.stringify(data)
    });
   
    return await req.json();


}