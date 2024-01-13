

import { Divider, Typography } from "@mui/material";
import { session } from '../heplers/session'
import { getFormData, sendGetRequest } from "../heplers/backendApiHandler";
import "@/app/../dist/style.css"
import LinkObject from "./components/LinkObject";
import dynamic from "next/dynamic";
import CardTabs from "./components/CardTabs";

async function getLeadData(id) {
    return sendGetRequest('https://turbobroker.ru/api/get-lead-card?lead_id=' + id)
}


async function Page({ searchParams }) {


    const current_session = await session.getAll();
    // console.log('lead_card ' + id)

    if (!current_session?.account_id) {
        return (<>
            <Typography>
                Сессия устарела. Откройте виджет заново.
            </Typography>
        </>)
    }

    const leadId = Number(searchParams?.lead_id) || 0;

    console.log('lead_card ' + leadId)
    if (leadId === 0) {
        return <>
            <Typography>
                Тут ничего нет.
            </Typography>
        </>
    }
    const data = await getLeadData(leadId);
    // console.log(data);

    const formData = await getFormData();


    // console.log(data.all_objects)


    return (<>


        <Divider
            className="mb-10"

        />

        <LinkObject
            leadId={leadId}
            value={data.current_object}
            objects={data.all_objects}
        />

        <Divider
            className="my-10"

        />
        <CardTabs
            feeds={data.feeds}
            objects={data.objects}
            clients={data.clients}
            leads={data.leads}
            leadId={leadId}
            formData={formData}
            activities={data.activities}
            reportData={data.reportData}
        />



    </>)
}
export default dynamic(() => Promise.resolve(Page), { ssr: false })
// export default Page