'use client'

import LoadingTb from "@/app/components/Loading";
import { useObjectSearchFormState } from "@/app/objects/store";
import { useAccountState } from "@/app/store/account/accountStore";
import { useEffect, useState } from "react";
import BaseSearchForm from "./form/BaseSearchForm";
import BaseObjectsTable from "./table/BaseObjectsTable";
import { sendApiRequest } from "@/app/services/actions";
import BaseObjectsPagination from "./table/BaseObjectsPagination";
import { YMaps } from "@pbe/react-yandex-maps";
import ObjectFormZustand from "@/app/components/objects/ObjectFormZustand";
import { Modal, ModalClose, ModalDialog, Sheet } from "@mui/joy";

// import { CssVarsProvider } from '@mui/joy/styles';
function BasePage({ accData, formData, isParser = false }) {

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
    const [editFormIsOpen, setEditFormIsOpen] = useState(false);
    const [objectForEdit, setObjectForEdit] = useState(null);

    useEffect(() => {
        setEditFormIsOpen(true);
    }, [objectForEdit])

    useEffect(() => {
        if (!editFormIsOpen) {
            setObjectForEdit(null);
        }
    }, [editFormIsOpen])


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

    console.log(isParser)
    console.log(accData);
    useEffect(() => {
        setAccData(accData)
        setFormData(formData)
        let cluster = 2;
        let region = '';
        let deal_type = '';
        let category= ''

        if (isParser) {
            cluster = 3;
            deal_type = 1;
            category = 1;
            region = accData?.settings?.default_region
        }
        setActiveSearch({ ...defaultSearch, cluster: cluster, status: 'active', category: category, deal_type: deal_type, region: region })
        setSearch({ ...defaultSearch, cluster: cluster, status: 'active', category: category, deal_type: deal_type, region: region })
        setState('defaultSearch', { ...defaultSearch, cluster: cluster, status: 'active', category: category, deal_type: deal_type, region: region })

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
            <BaseSearchForm
                isParser={isParser}
            />
            <BaseObjectsTable
                objects={objects}
                objectsIsLoading={objectsIsLoading}
                setObjectForEdit={setObjectForEdit}
            />
            {!objectsIsLoading && (
                <BaseObjectsPagination />
            )}
            {(editFormIsOpen && objectForEdit) && (
                <Modal
                    // sx={{
                    //     maxWidth: '80svw',
                    //     maxHeight: '80svh',
                    //     overflowY: 'auto'
                    // }}
                    onClose={() => setEditFormIsOpen(false)}
                    open={editFormIsOpen}

                >


                    <ModalDialog>
                        <ModalClose />
                        <Sheet
                            sx={{
                                width: '90svw',
                                height: '90svh',
                                overflowY: 'auto'
                            }}
                        >
                            <ObjectFormZustand
                                form_data={formData}
                                flat_for_update={objectForEdit}
                                isModal={true}

                            />
                        </Sheet>
                    </ModalDialog>
                </Modal>
            )}


        </YMaps>
        {/* </CssVarsProvider> */}


    </>);
}

export default BasePage;