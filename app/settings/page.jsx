// import { useState } from "react";

// import TabList from '@mui/joy/TabList';
import { sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler";
import { session } from "../heplers/session";

import { useSettingsState } from "./store";
import SettingsTabs from "./components/SettingsTabs";

// import { Tab, TabList } from "@mui/joy";

async function Settings({ }) {

    // const handleUpdateUser = async () => {

    //     res = await sendPostRequest('https://turbobroker.ru/api/update-user', {
    //         id: user.id,
    //         firstname: firstName,
    //         middlename: middleName,
    //         lastname: lastName,
    //         image: image,
    //         phone: phone
    //     }).then(data => console.log(data));

    // }
    // constS

    const current_session = await session.getAll();
    console.log(current_session);
    if (!current_session?.is_admin) {
        return (<>
            Ошибка авторизации
        </>)
    }


    // try {
    const data = await sendGetRequest('https://turbobroker.ru/api/get-user-data');
    console.log(data);
    // } catch (e) {
    // console.log(e)
    // }
    if (data.status === 'error') {
        return (<>
            Ошибка авторизации

        </>)
    }



    return (<>

        <SettingsTabs data={data}   />

    </>);
}

export default Settings;