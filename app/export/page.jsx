

import { Divider, Typography } from "@mui/material";
import { session } from '../heplers/session'
import { getFormData, sendGetRequest } from "../heplers/backendApiHandler";
import "@/app/../dist/style.css"

import dynamic from "next/dynamic";

import AdsSummaryTable from "./components/AdsSummaryTable";
import AdsObjects from "./components/AdsObjects";
import PageComponent from "./components/PageComponent";


async function getData() {
    return sendGetRequest('https://turbobroker.ru/api/get-ads')
}


async function Page({ searchParams }) {


    const current_session = await session.getAll();

    if (!current_session?.account_id) {
        return (<>
            <Typography>
                Сессия устарела. Откройте виджет заново.
            </Typography>
        </>)
    }
    const data = await getData();
    const formData = await getFormData();


    // console.log(data)



    return (<>

        <Typography>Реклама</Typography>
        <PageComponent
            data={data}
            formData={formData}
        />

    </>)
}
// export default dynamic(() => Promise.resolve(Page), { ssr: false })
export default Page