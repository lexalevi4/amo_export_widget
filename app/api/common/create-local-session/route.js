import { set, get, getAll, destroy, setAll, getSessionId, getSessionIdAndCreateIfMissing } from "@/app/heplers/session";
import { NextResponse } from "next/server";
import { cookies, headers } from 'next/headers'
import NextCors from "nextjs-cors";
var crypto = require('crypto');


// const getUser = async () => {


// }

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
export async function OPTIONS(req, res) {
    return new Response('', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
    })
}

export async function GET(req, response) {
    // await response.headers.set(
    //     {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //         'Content-type': 'application/json',
    //         'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Authorisation, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,x-auth-token'
    //     }
    // );
    const session_id = getSessionIdAndCreateIfMissing();
    let cookieStore = cookies();
    // console.log('_______________')
    // console.log(cookieStore.getAll());
    // console.log('_______________')
    // console.log(session_id);

    // const formData = await req.formData()
    // console.log(formData);
    // const account = formData.get('account')
    const account = 31165334;
    // const area = formData.get('system[area]')
    // const card_id = formData.get('page[code]')
    // console.log(area)
    // console.log(card_id)
    // const { searchParams } = new URL(req.url)
    // console.log(searchParams);
    // const session = searchParams.get('session')

    // const token = headers().get('x-auth-token');
    // console.log(token);

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcmVhbHR5d2lkZ2V0LmFtb2NybS5ydSIsImF1ZCI6Imh0dHBzOlwvXC90dXJib2Jyb2tlci5ydSIsImp0aSI6ImNjYThlM2IyLTY3YjgtNDViNy1hODdjLTRlNDEwYjQ5OTUxNiIsImlhdCI6MTY5NTYzOTA1NCwibmJmIjoxNjk1NjM5MDU0LCJleHAiOjE2OTU2NDA4NTQsImFjY291bnRfaWQiOjMxMTY1MzM0LCJzdWJkb21haW4iOiJyZWFsdHl3aWRnZXQiLCJjbGllbnRfdXVpZCI6IjE2MzBlMTcyLTg3ZDAtNGRlOS1iY2M5LWY0NjBiMjY1NjM2MSIsInVzZXJfaWQiOjE0MzM4MDAsImlzX2FkbWluIjp0cnVlfQ.M-BSPCN9Ty7jmKVfQHHYQfJOUzpC79bhOf1IrsfYvp4';
    let result = [];
    let page = '/error';

    try {
        result = await check_token(token, account);
        console.log(result)
        if (Number(result?.data?.account_id) === Number(account)) {
            await setAll(result.data);
            // result = data;
            // console.log(searchParams.get('page'));

            // if (searchParams.get('page') === 'card') {
            //     console.log(searchParams.get('card_id'));
            //     page = '/lead-card?lead_id=' + searchParams.get('card_id')

            // }
            // if (searchParams.get('page') === 'settings') {
            //     page = '/settings'
            // }
            // if (searchParams.get('page') === 'left') {
            //     console.log(searchParams.get('subitem'));
            //     if (searchParams.get('subitem') === 'sub_item_code_1') {
            //         page = '/objects'

            //     }
            //     if (searchParams.get('subitem') === 'sub_item_code_2') {
            //         page = '/clients'

            //     }
            //     if (searchParams.get('subitem') === 'sub_item_code_3') {
            //         page = '/ad'

            //     }

            // }

        } else {
            // console.log('destroy else')
            destroy();
        }

    } catch (e) {
        // console.log('destroy catch')
        console.log(e);
        destroy();
    }

    // const response_data = { data: result?.data, html: '<html><body><script>window.location="https://amo-widget.turbobroker.ru/?session=' + session_id + '&page=' + encodeURIComponent(page) + '"</script></body></html>' }
    
    // } else {
    //     destroy();
    // }
    return NextResponse.json(result)
    // .headers(
    //     {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //         'Content-type': 'application/json',
    //         'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Authorisation, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,x-auth-token'
    //     }
    // )
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    //         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    //         'Content-type': 'application/json',
    //         'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Authorisation, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,x-auth-token'
    //     }
    // });


    // });

}