'use client'

import { YMaps } from "@pbe/react-yandex-maps";
import FIltersTable from "./FIltersTable";

function ClientsPageComponent({ data, formData }) {
    return (<>
        <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                apikey: "d75321b0-ad40-4b10-9d56-3fb3a34883a1"
            }}
        >
            <FIltersTable
                filters={data.filters}
                formData={formData}

            />
        </YMaps>
    </>);
}

export default ClientsPageComponent;