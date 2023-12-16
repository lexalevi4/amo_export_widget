import { NextResponse } from "next/server";

const { google } = require("googleapis");
const getfilelist = require("google-drive-getfilelist");
const key = require("./amo-widget-presentation-30592022fa45.json");


export async function GET(request, response) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // const res = await sendGetRequest(process.env.API_URL + 'api/delete-ad', { id: id })
    // console.log(res);
    const res = [];
    return NextResponse.json(res);

}