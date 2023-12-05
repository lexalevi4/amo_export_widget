import {  destroy, setAll,  getSessionIdAndCreateIfMissing } from "@/app/heplers/session";
import { NextResponse } from "next/server";
import {  headers } from 'next/headers'


const check_token = async (token, acc_id) => {

    const request = await fetch(process.env.API_URL + 'token/check-token', {
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

export async function POST(req, response) {
    const session_id = getSessionIdAndCreateIfMissing();
    const formData = await req.formData()
    const account = formData.get('account')
    const { searchParams } = new URL(req.url)
    console.log(searchParams);
    const token = headers().get('x-auth-token');
   
    let result = [];
    let page = '/error';

    try {
        result = await check_token(token, account);
        console.log(result)
        if (Number(result?.data?.account_id) === Number(account)) {
            await setAll(result.data);
            console.log(searchParams.get('page'));

            if (searchParams.get('page') === 'card') {
                console.log(searchParams.get('card_id'));
                page = '/lead-card?lead_id=' + searchParams.get('card_id')

            }
            if (searchParams.get('page') === 'settings') {
                page = '/settings'
            }
            if (searchParams.get('page') === 'left') {
                console.log(searchParams.get('subitem'));
                if (searchParams.get('subitem') === 'sub_item_code_1') {
                    page = '/objects'

                }
                if (searchParams.get('subitem') === 'sub_item_code_2') {
                    page = '/clients'

                }
                if (searchParams.get('subitem') === 'sub_item_code_3') {
                    page = '/ad'

                }

            }

        } else {
            destroy();
        }

    } catch (e) {
        console.log(e);
        destroy();
    }

    const response_data = { data: result?.data, html: '<html><body><script>window.location="https://amo-widget.turbobroker.ru/?session=' + session_id + '&page=' + encodeURIComponent(page) + '"</script></body></html>' }


    return NextResponse.json(response_data)
   

}