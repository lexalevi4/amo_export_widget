// 'use client'
import { redirect } from "next/navigation";

export default async function Home({ searchParams }) {
  // const page = searchParams?.page || '/error';
  // const session = searchParams.session;
  // const res = await fetch('https://amo-widget.turbobroker.ru/api/amo_auth?session=dukp2ukqagf66vprjc19j8uaa4fbjqc3ml44cz54a3szh4ejxrp6u', {
  // method: "GET",
  // body: data
  // }).then(
  redirect(searchParams?.page || '/error')
  // )
  console.log(res);


  return (
    <></>
  )
}
