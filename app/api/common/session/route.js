import { session } from "@/app/heplers/session";
import { NextResponse } from "next/server";

export async function GET(req, response) {

    // const session = current_session;
    const data = await session(req).all();
    console.log(data);
    await session().set('key', 'qq')
    await session().set('key2', 'qq')
    // await session().
    // await session().destroy()
    // await current_session(req).all();
    // current_session.hello = "world";
    // await current_session.commit();

    return NextResponse.json(await session(req).all());

}