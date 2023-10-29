// import { dadata_geocode_url, dadata_key } from "@/app/params/params";
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
    const res = await getData(process.env.API_URL + 'tg-app-api/map-info', { filter: formData.get("filter") })
    // console.log(res);
    return NextResponse.json(res);

}