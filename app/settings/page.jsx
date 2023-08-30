// import { useState } from "react";

// import TabList from '@mui/joy/TabList';
import { cookies } from "next/headers";
import { sendGetRequest } from "../heplers/backendApiHandler";
import { session } from "../heplers/session";

// import { useSettingsState } from "./store";
import SettingsTabs from "./components/SettingsTabs";



async function Settings({ }) {



    const current_session = await session.getAll();
    console.log(cookies().getAll());
    console.log(current_session);
    if (!current_session?.is_admin) {
        return (<>
            Ошибка авторизации
        </>)
    }


    try {
        const data = await sendGetRequest('https://turbobroker.ru/api/get-user-data');
        if (data.status === 'error') {
            return (<>
                Ошибка авторизации

            </>)
        }

        return (<>

            <SettingsTabs data={data} />

        </>);
    } catch (e) {
        return (<>
            Что-то пошло не так...
        </>)
    }
    // console.log(data);



}

export default Settings;