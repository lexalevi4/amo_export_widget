import { set, get, getAll, destroy, setAll, getSessionId } from "@/app/heplers/session";
import { NextResponse } from "next/server";
import { headers } from 'next/headers'
var crypto = require('crypto');

const check_token = async (token, acc_id) => {

    const request = await fetch('https://turbobroker.ru/token/check-token', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ token: token, acc_id: acc_id })
    });
    const result = await request.json();
    return result;
}

export async function GET(req, response) {
    destroy();
    const acc_id = 31165334;
    // const token = headers().get('x-auth-token');
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmVhbHR5d2lkZ2V0LmFtb2NybS5ydSIsImF1ZCI6Imh0dHBzOlwvXC90dXJib2Jyb2tlci5ydSIsImp0aSI6ImNjYTUxODk3LTY1YmMtNGI5YS05ZTc1LTU5ZmYwNGRjNjA2ZSIsImlhdCI6MTY5Mjc5MzAxNCwibmJmIjoxNjkyNzkzMDE0LCJleHAiOjE2OTI3OTQ4MTQsImFjY291bnRfaWQiOjMxMTY1MzM0LCJzdWJkb21haW4iOiJyZWFsdHl3aWRnZXQiLCJjbGllbnRfdXVpZCI6IjE2MzBlMTcyLTg3ZDAtNGRlOS1iY2M5LWY0NjBiMjY1NjM2MSIsInVzZXJfaWQiOjE0MzM4MDAsImlzX2FkbWluIjp0cnVlfQ.0rWLUl8-HzCejiTx3VVPfMdB6Fkmn4M8j15taO2gGBs';
    let result = [];
    // if (headers().has('x-auth-token')) {
    //     console.log(headers().get('x-auth-token'));
    try {
        result = await check_token(token, acc_id);
        if (result?.data.account_id === acc_id) {
            await setAll(result.data);
            // result.data.sign = crypto.createHash('sha-256').update(result.data.account_id + '' + result.data.user_id + getSessionId() + process.env.SESSION_SECRET).digest('hex');
            result.data.updated = Date.now();
            await setAll(result.data);
            // SESSION_SECRET
        } else {
            destroy();
        }

    } catch (e) {
        destroy();
    }

    // } else {
    //     destroy();
    // }
    return NextResponse.json(result);

}