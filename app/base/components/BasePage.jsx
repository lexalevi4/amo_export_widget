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
    const perPage = useObjectSearchFormState((state) => state.perPage);
    const sort = useObjectSearchFormState((state) => state.sort);
    const setState = useObjectSearchFormState((state) => state.setState);

    const searchUpdated = useObjectSearchFormState((state) => state.search_updated);

    const objectsIsLoading = useObjectSearchFormState((state) => state.objectsIsLoading);
    const setListObjects = useObjectSearchFormState((state) => state.setListObjects);
    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const setSearch = useObjectSearchFormState((state) => state.setSearch);
    const defaultSearch = useObjectSearchFormState((state) => state.defaultSearch);
    const refreshObjects = useObjectSearchFormState((state) => state.refreshObjects);


    const getListObjects = async () => {
        setState('objectsIsLoading', true)
        const res = await sendApiRequest('post', 'api/refresh-objects', { filter: JSON.stringify(activeSearch), page: page, perPage: perPage, sort: sort })
        setListObjects(res);
        setState('objectsIsLoading', false)
    }


    useEffect(() => {
        if (searchUpdated > 0) {
            setState('objectsIsLoading', true)
            // refreshObjects();
            getListObjects()
        }
    }, [searchUpdated])

    useEffect(() => {
        setAccData(accData)
        setFormData(formData)
        setActiveSearch({ ...defaultSearch, cluster: 2, status: 'active', category: '', deal_type: '' })
        setSearch({ ...defaultSearch, cluster: 2, status: 'active', category: '', deal_type: '' })
        setState('defaultSearch', { ...defaultSearch, cluster: 2, status: 'active', category: '', deal_type: '' })

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
            {!objectsIsLoading && (
                <BaseObjectsPagination />
            )}

        </YMaps>
        {/* </CssVarsProvider> */}


    </>);
}

export default BasePage;