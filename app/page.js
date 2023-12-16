// 'use client'
import { redirect } from "next/navigation";
// import { useEffect } from "react";

export default async function Home({ searchParams }) {
  // const page = searchParams?.page || '/error';
  // const session = searchParams.session;
  // const res = await fetch('https://amo-widget.turbobroker.ru/api/amo_auth?session=dukp2ukqagf66vprjc19j8uaa4fbjqc3ml44cz54a3szh4ejxrp6u', {
  // method: "GET",
  // body: data
  // }).then(
  redirect(searchParams?.page || '/error')
  // )
  // console.log(res);

  // useEffect(() => {
    // document.TheForm.submit()
  // }, [])


  return (
    <>
      {/* <form name="TheForm" id='first_form' action={searchParams?.page || '/error'}
        method="get"
      >
        <input type="hidden" name="lead_id" value={searchParams?.lead_id || ''} />
        <input type="hidden" name="session" value={searchParams?.session || ''} />

      </form> */}
    </>
  )
}
