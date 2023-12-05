'use client'
import { YMaps } from "@pbe/react-yandex-maps";
import ObjectsSearchForm from "./ObjectsSearchForm";

function MapProvidedObjectSearchForm({ formData }) {
    return (<>
        <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                apikey: "d75321b0-ad40-4b10-9d56-3fb3a34883a1"
            }}
        >
            <ObjectsSearchForm
                formData={formData}
            />
        </YMaps>
    </>);
}

export default MapProvidedObjectSearchForm;