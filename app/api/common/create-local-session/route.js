import { set, get, getAll, destroy, setAll, getSessionId, getSessionIdAndCreateIfMissing } from "@/app/heplers/session";
import { NextResponse } from "next/server";
import { cookies, headers } from 'next/headers'
import NextCors from "nextjs-cors";
var crypto = require('crypto');


// const getUser = async () => {


// }

const check_token = async (token, acc_id) => {

    const request = await fetch(process.env.API_URL + '/token/check-token', {
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
    const account = 26530375;
    // const area = formData.get('system[area]')
    // const card_id = formData.get('page[code]')
    // console.log(area)
    // console.log(card_id)
    // const { searchParams } = new URL(req.url)
    // console.log(searchParams);
    // const session = searchParams.get('session')

    // const token = headers().get('x-auth-token');
    // console.log(token);

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvNzk3MDk5My5hbW9jcm0ucnUiLCJhdWQiOiJodHRwczpcL1wvdHVyYm9icm9rZXIucnUiLCJqdGkiOiIwZDA0NTRiMS1mMGVhLTQwZWUtOTcxOC02MDczMDg4MjIzZGYiLCJpYXQiOjE3MDExNjQyNjEsIm5iZiI6MTcwMTE2NDI2MSwiZXhwIjoxNzAxMTY2MDYxLCJhY2NvdW50X2lkIjoyNjUzMDM3NSwic3ViZG9tYWluIjoiNzk3MDk5MyIsImNsaWVudF91dWlkIjoiY2Y1OWMzZGYtZjU0Ny00MmI0LWI0MWMtMmJmNjY2NjNmNjY2IiwidXNlcl9pZCI6MzQyMTcwMiwiaXNfYWRtaW4iOnRydWV9.FK9JbdwoQdWYpWUx4CAtae-9t3aiS65LqY3YL69aOL4';
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