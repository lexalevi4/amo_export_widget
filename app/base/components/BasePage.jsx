'use client'

import LoadingTb from "@/app/components/Loading";
import { useObjectSearchFormState } from "@/app/objects/store";
import { useAccountState } from "@/app/store/account/accountStore";
import { useEffect } from "react";
import BaseSearchForm from "./form/BaseSearchForm";
import BaseObjectsTable from "./table/BaseObjectsTable";
import { sendApiRequest } from "@/app/services/actions";
import BaseObjectsPagination from "./table/BaseObjectsPagination";
import { YMaps } from "@pbe/react-yandex-maps";
// import { CssVarsProvider } from '@mui/joy/styles';
function BasePage({ accData, formData }) {

    const setAccData = useAccountState((state) => state.setState);
    const setFormData = useObjectSearchFormState((state) => state.setFormData);
    const loading = useObjectSearchFormState((state) => state.loading);
    const objects = useObjectSearchFormState((state) => state.objects);
    const setObjects = useObjectSearchFormState((state) => state.setObjects);
    const activeSearch = useObjectSearchFormState((state) => state.activeSearch);
    const page = useObjectSearchFormState((state) => state.page);
    const setState = useObjectSearchFormState((state) => state.setState);

    const searchUpdated = useObjectSearchFormState((state) => state.search_updated);

    const objectsIsLoading = useObjectSearchFormState((state) => state.objectsIsLoading);
    const setListObjects = useObjectSearchFormState((state) => state.setListObjects);
    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const setSearch = useObjectSearchFormState((state) => state.setSearch);
    const defaultSearch = useObjectSearchFormState((state) => state.defaultSearch);


    const getListObjects = async () => {
        const res = await sendApiRequest('post', 'api/refresh-objects', { filter: JSON.stringify(activeSearch), page: page })
        setListObjects(res);
    }


    useEffect(() => {
        if (searchUpdated > 0) {
            getListObjects()
        }
    }, [searchUpdated])

    useEffect(() => {
        setAccData(accData)
        setFormData(formData)
        setActiveSearch({ ...defaultSearch, cluster: 2, status: 'active' })
        setSearch({ ...defaultSearch, cluster: 2, status: 'active' })

    }, [])

    if (loading) {
        return (<LoadingTb />)
    }


    return (<>
        {/* <CssVarsProvider> */}
        <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                apikey: "d75321b0-ad40-4b10-9d56-3fb3a34883a1"
            }}
        >
            <BaseSearchForm />
            <BaseObjectsTable
                objects={objects}
                loading={objectsIsLoading}
            />
            <BaseObjectsPagination
            />
        </YMaps>
        {/* </CssVarsProvider> */}


    </>);
}

export default BasePage;