'use client'
import { Divider, Paper, Table, TableBody, TableContainer } from "@mui/material";
import FiltersTableRow from "./FiltersTableRow";
import dynamic from "next/dynamic";
import { useClientsState } from "../store";
import { useEffect, useState } from "react";
import MetroModal from "./MetroModal";
import DistrictsModal from "./DistrictsModal";
import HighwaysModal from "./HighwaysModal";
import AddrobjsModal from "./AddrobjsModal";
import MapModal from "./MapModal";
import { YMaps } from "@pbe/react-yandex-maps";
import CreateClientModal from "@/app/lead-card/components/CreateClientModal";
function FiltersTable({ filters, formData, leadId = 0 }) {

    // const setFormData = useClientsState
    const [currentFilters, setCurrentFilters] = useState(filters);
    const setFormData = useClientsState((state) => state.setFormData)
    const setState = useClientsState((state) => state.setState)

    const metro = useClientsState((state) => state.metro)
    const districts = useClientsState((state) => state.districts)
    const highways = useClientsState((state) => state.highways)
    const polygons = useClientsState((state) => state.polygons)
    const addrobjs = useClientsState((state) => state.addrobjs)


    const metroIsOpen = useClientsState((state) => state.metroIsOpen)
    const districtsIsOpen = useClientsState((state) => state.districtsIsOpen)
    const highwaysIsOpen = useClientsState((state) => state.highwaysIsOpen)
    const polygonsIsOpen = useClientsState((state) => state.polygonsIsOpen)
    const addrobjsIsOpen = useClientsState((state) => state.addrobjsIsOpen)

    const updatedAll = useClientsState((state) => state.updatedAll)




    const getFilters = async () => {
        const data = await fetch('/api/client/get-filters-by-lead?leadId=' + leadId);
        const res = await data.json();
        setCurrentFilters(res.clients);
        setState('updatedAll', false);
    }

    useEffect(() => {
        if (updatedAll) {
            getFilters()
        }
    }, [updatedAll])

    const handleEditOpen = (filter) => {

    }


    const closeMetro = () => {
        setState('metroIsOpen', false);
    }

    // const params = useObjectSearchFormState((state) => state.params)
    useEffect(() => {
        setFormData(formData)
    }, [])

    return (<>

        <CreateClientModal
            formData={formData}
            leadId={leadId}

        />
        <Divider className="my-5" />
        <TableContainer component={Paper}
            elevation={10}
        >
            <Table>
                <TableBody>
                    {currentFilters.map(filter => {
                        return (
                            <FiltersTableRow
                                formData={formData}
                                filter={filter}
                                key={'filter_row' + filter.id}
                            />
                        )
                    })}

                </TableBody>
            </Table>

        </TableContainer>

        {/* {leadId > 0 && */}

        {/* } */}


        <MetroModal
            formData={formData}
            isOpen={metroIsOpen}
            state={metro}
            handleClose={closeMetro}
        />
        <DistrictsModal
            formData={formData}
            handleClose={() => setState('districtsIsOpen', false)}
            isOpen={districtsIsOpen}
            state={districts}
        />
        <HighwaysModal
            formData={formData}
            handleClose={() => setState('highwaysIsOpen', false)}
            isOpen={highwaysIsOpen}
            state={highways}
        />
        <AddrobjsModal
            formData={formData}
            handleClose={() => setState('addrobjsIsOpen', false)}
            isOpen={addrobjsIsOpen}
            state={addrobjs}
        />
        {/* <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                // apikey: "e105999a-b1c1-4234-963f-21e492dca418"
            }}
        > */}
        <MapModal
            state={polygons}
            isOpen={polygonsIsOpen}
            handleClose={() => setState('polygonsIsOpen', false)}
        />
        {/* </YMaps> */}
    </>);
}

export default dynamic(() => Promise.resolve(FiltersTable), { ssr: false })
// export default FiltersTable;