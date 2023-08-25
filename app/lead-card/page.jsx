

import { Button, Typography } from "@mui/material";
import Link from "next/link";
// import { checkSession } from "../heplers/heplers";
// import { cookies } from 'next/headers'
import { session } from '../heplers/session'
import { sendGetRequest } from "../heplers/backendApiHandler";

async function getLeadData(id) {
    return sendGetRequest('https://turbobroker.ru/api/get-lead-card', { lead_id: id })

    // const res = await fetch('https://turbobroker.ru/api/get-lead-card?lead=' + id)
    // const data = await res.json();
    // return data;
}
// export async function getServerSideProps({ req, res }) {
//     console.log(req);
//     // const session = await getSession(req, res);
//     // session.views = session.views ? session.views + 1 : 1;
//     // // Also available under req.session:
//     // // req.session.views = req.session.views ? req.session.views + 1 : 1;
//     // return {
//     //   props: {
//     //     views: session.views,
//     //   },
//     // };
// }

async function Page({ searchParams }) {
    const current_session = await session.getAll();
    // console.log(current_session);
    // console.log(cookies());
    // const request = new Request();

    // console.log(context);
    // console.log(request);

    // const session_checked = await checkSession(searchParams);
    // console.log(session_checked);

    const leadId = Number(searchParams?.lead_id) || 0;
    if (leadId === 0) {
        return <>
            <Typography>
                Тут ничего нет.
            </Typography>
        </>
    }
    const data = await getLeadData(leadId);
    if (!current_session?.account_id) {
        return (<>
            <Typography>
                Сессия устарела. Откройте виджет заново.
            </Typography>
        </>)
    }




    return (<>

        <Typography
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
        </Typography>
        <Typography
            variant="h5"
        >Объекты:
        </Typography>
        {data.objects.map((object, index) => {
            return (<Typography
                key={'objects' + object.id}
            >
                {object.id}
            </Typography>)
        })}
        <Link
            href={'/objects/create?lead_id=' + leadId}
        // as={'/static/' + someJsString}
        // passHref
        >
            <Button>Добавить объект</Button>
        </Link>
        <Typography
            variant="h5"
        >Заявки:
        </Typography>
        {data.clients.map((client, index) => {
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