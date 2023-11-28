'use client'
import { useClientsState } from "@/app/clients/store";
import ObjectsSearchForm from "@/app/components/objects/searchForm/ObjectsSearchForm";
import { useObjectSearchFormState } from "@/app/objects/store";
import { Box, Button, Dialog, Paper } from "@mui/material";
// import { useState } from "react";
import 'react-dadata/dist/react-dadata.css';
function CreateClientModal({ leadId, formData }) {

    // const [isOpen, setIsOpen] = useState(false);
    const editModalIsOpen = useClientsState((state) => state.editModalIsOpen);

    const setClientState = useClientsState((state) => state.setState);

    const defaultSearch = useObjectSearchFormState((state) => state.defaultSearch);
    const setSearch = useObjectSearchFormState((state) => state.setSearch);

    const openNewClientForm = () => {
        // setSearch(defaultSearch);
        let data = {};
        Object.assign(data, defaultSearch);
        setSearch(data);
        setClientState('editModalIsOpen', true);
        setClientState('currentFilterId', 0);

    }

    const closeModal = () => {
        setClientState('editModalIsOpen', false);
    }



    return (<>
        {leadId > 0 &&
            (<>
                <Box
                    className='flex justify-end'
                >
                    <Button
                        variant="contained"
                        onClick={openNewClientForm}
                    >Добавить заявку
                    </Button>
                </Box>
            </>)

        }


        <Dialog
            // className="p-5"
            // fullScreen
            maxWidth={'xl'}
            keepMounted
            open={editModalIsOpen}
            scroll='paper'
            onClose={closeModal}
        >
            <Paper
                className="p-5"
            >
                <ObjectsSearchForm
                    formData={formData}
                    leadId={leadId}
                />
            </Paper>


        </Dialog>
    </>);
}

export default CreateClientModal;