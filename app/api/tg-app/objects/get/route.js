import { NextResponse } from "next/server";


const getData = async (url, data = []) => {
      const req = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            // 'auth': getSessionId() + ':' + sign.sign + ':' + salt + ':' + sign.timestamp
        },
        body: JSON.stringify(data)
    });

    return await req.json();
}

export async function POST(request, response) {

    const formData = await request.formData();

    const res = await getData(process.env.API_URL + 'tg-app-api/refresh-objects', { filter: formData.get("filter"), page: formData.get('page') })
    // console.log(res);

    return NextResponse.json(res);

}