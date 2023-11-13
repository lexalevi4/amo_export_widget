

import { Autocomplete, Button, Divider, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { session } from '../heplers/session'
import { getFormData, sendGetRequest } from "../heplers/backendApiHandler";
import "@/app/../dist/style.css"
import ObjectsTable from "../components/objects/objectsTable/ObjectsTable";
import LinkObject from "./components/LinkObject";
import LeadCardObject from "./components/LeadCardObject";

async function getLeadData(id) {
    return sendGetRequest('https://turbobroker.ru/api/get-lead-card?lead_id=' + id)
}


async function Page({ searchParams }) {
    const current_session = await session.getAll();



    const leadId = Number(searchParams?.lead_id) || 0;
    if (leadId === 0) {
        return <>
            <Typography>
                Тут ничего нет.
            </Typography>
        </>
    }
    const data = await getLeadData(leadId);
    console.log(data);
    if (!current_session?.account_id) {
        return (<>
            <Typography>
                Сессия устарела. Откройте виджет заново.
            </Typography>
        </>)
    }
    const formData = await getFormData();


    console.log(data.all_objects)
    // const allObjects = [];
    // data.all_objects.map(item => {
    //     // let option = {
    //     //     category:
    //     // };

    //     // allObjects.push()

    // })


    return (<>

        {/* <Typography
            variant="h6"
        >
            acc_id:{current_session.account_id}
        </Typography>
        <Typography
            variant="h6"
        >
            user_id:{current_session.user_id}
        </Typography>
        <Typography
            variant="h3"
        >
            Данные сделки
        </Typography> */}

        <Divider
            className="mb-10"

        />

        <LinkObject
            objects={data.all_objects}
        />

        <Divider
            className="my-10"

        />





        <Typography
            variant="h5"
        >Объекты:
        </Typography>

        {
            data.objects.map((object, index) => {
                return (
                    <LeadCardObject
                        key={'card_object_' + index}
                        formData={formData}
                        object={object}
                    />


                )
            })
        }


        <Link
            href={'/objects/create?lead_id=' + leadId}
        >
            <Button>Добавить объект</Button>
        </Link>
        <Typography
            variant="h5"
        >Заявки:
        </Typography>
        {data.clients.map((client) => {
            return (<Typography
                key={'client' + client.id}
            >
                {client.id}
            </Typography>)
        })}
        <Button>Добавить заявку</Button>

    </>)
}

export default Page