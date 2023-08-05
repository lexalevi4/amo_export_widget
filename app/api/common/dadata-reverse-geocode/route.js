import { NextResponse } from "next/server";

export async function GET(request, response) {

    const form_data = await fetch('');
    return NextResponse.json(form_data);

}