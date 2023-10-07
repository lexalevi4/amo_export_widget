'use client'
import { useEffect, useRef, useState } from "react";
import ObjectsTable from "./objectsTable/ObjectsTable";
import MapObjects from "@/app/objects/map/components/MapObjects";
import MyPagination from "./searchForm/MyPagination";
import { useObjectSearchFormState } from "@/app/objects/store";
import { Paper, Typography } from "@mui/material";

function Objects({ data, formData
    // , pageType
}) {

    // const [type, setType] = useState(pageType)
    const [objects, setObjects] = useState(data.objects)
    const [objectsIsLoading, setObjectsIsLoading] = useState(false)

    const activeSearch = useObjectSearchFormState((state) => state.activeSearch)
    const pageType = useObjectSearchFormState((state) => state.pageType)
    const search_updated = useObjectSearchFormState((state) => state.search_updated)
    const setState = useObjectSearchFormState((state) => state.setState)
    const page = useObjectSearchFormState((state) => state.page)
    const setPage = useObjectSearchFormState((state) => state.setPage)
    const [objectsCount, setObjectsCount] = useState(data.count)
    const [mapInfo, setMapInfo] = useState(null)
    const pageRef = useRef(pageType)

    useEffect(() => {
        // pageRef.current = pageType;
    }, [pageType]);

    // useEffect(() => {

    //     if (pageType !== pageRef.current) {
            
    //         // console.log(pageRef)
    //         // getObjects();
    //         getObjects();
    //         pageRef.current = pageType;

    //     }
    // }, [pageType])




    // useEffect(() => {
    //     console.log(pageRef)
    // }, [pageRef])





    const getObjects = async () => {
        if (pageType === 'list') {
            setObjectsIsLoading(true);

            let data = new FormData();
            data.append('filter', JSON.stringify(activeSearch));
            data.append('page', page);

            try {
                await fetch('/api/object/get', {
                    method: 'POST',
                    body: data,
                }).then(res => res.json())
                    .then(data => {
                        setObjects(data.objects);
                        setObjectsCount(data.count)
                    })
                    .then(() => setObjectsIsLoading(false))
            } catch (e) {
            }
        }
        if (pageType === 'map') {
            setObjectsIsLoading(true);

            let data = new FormData();
            data.append('filter', JSON.stringify(activeSearch));
            // data.append('page', page);

            try {
                await fetch('/api/object/map-info', {
                    method: 'POST',
                    body: data,
                }).then(res => res.json())
                    .then(data => {
                        // setObjects(data.objects);
                        setMapInfo(data.info)
                        setObjectsCount(data.count)
                    })
                    .then(() => setObjectsIsLoading(false))
            } catch (e) {
            }

        }

    }
    useEffect(() => {


    }, [pageType])

    useEffect(() => {
        console.log(search_updated)
        if (search_updated > 0) {
            getObjects();
            setState('search_updated', 0);
        }
        console.log(activeSearch);

    }, [activeSearch, page, search_updated])

    const handlePage = (event, value) => {
        // console.log(event)
        // console.log(value);
        setPage(value);
    }
    const per_page = 20;

    if (pageType === 'list') {
        return (<>
            <Paper
                className="p-2 text-right mt-5"
            >
                <Typography variant="body2" color="text.secondary">
                    Показано: {(((page - 1) * per_page) + 1)}- {(((page - 1) * per_page) + objects.length)} из {objectsCount}
                </Typography>
            </Paper>
            <ObjectsTable
                formData={formData}
                objects={objects}
                filterId={0}
                isFilter={false}
                isLoading={objectsIsLoading}
            />
            <MyPagination
                page={page}
                count={objectsCount}
                handlePage={handlePage}
            />

        </>)

    }
    if (pageType === 'map') {
        return (<>
            <Paper
                className="p-2 text-right mt-5"
            >
                <Typography variant="body2" color="text.secondary">
                    Всего: {objectsCount}
                </Typography>
            </Paper>
            <MapObjects
                mapInfo={mapInfo}
            />
        </>)
    }



}

export default Objects;