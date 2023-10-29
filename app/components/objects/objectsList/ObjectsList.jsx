'use client'
import { Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useObjectSearchFormState } from "@/app/objects/store";
import ObjectCard from "./ObjectCard";

import { red } from '@mui/material/colors';

import ReportPlotModal from "../objectsTable/ReportPlotModal";
import LoadingTb from "../../Loading";
import SortIcon from '@mui/icons-material/Sort';

function ObjectsList({ formData, fav = false }) {


    const [cleanOpen, setCleanOpen] = useState(false);
    const [objects, setObjects] = useState([])
    const [objectsIsLoading, setObjectsIsLoading] = useState(true)

    const search = useObjectSearchFormState((state) => state.search)
    const activeSearch = useObjectSearchFormState((state) => state.activeSearch)
    const pageType = useObjectSearchFormState((state) => state.pageType)
    const search_updated = useObjectSearchFormState((state) => state.search_updated)
    const setState = useObjectSearchFormState((state) => state.setState)
    const page = useObjectSearchFormState((state) => state.page)
    const setPage = useObjectSearchFormState((state) => state.setPage)
    const [objectsCount, setObjectsCount] = useState(0)
    const [mapInfo, setMapInfo] = useState(null)
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const setSearch = useObjectSearchFormState((state) => state.setSearch);
    const [isError, setIsError] = useState(false);





    useEffect(() => {
        // await setSearchParam('cluster', 3)
        // console.log({ ...search, cluster: 3 });
        setActiveSearch({
            ...search,
            cluster: 3,
            isNewBuilding: 0,
            category: 1,
            deal_type: 1,
            rooms: [],
            addrobjs: ['0c5b2444-70a0-4932-980c-b4dc0d3f02b5']
        });
        setSearch({
            ...search,
            cluster: 3,
            isNewBuilding: 0,
            category: 1,
            deal_type: 1,
            rooms: [],
            addrobjs: ['0c5b2444-70a0-4932-980c-b4dc0d3f02b5']
        });

    }, [])

    useEffect(() => {
        console.log(search_updated);
        if (Number(search_updated) === 1) {
            console.log('asdf');

            getObjects();
            setState('search_updated', 0);
        }
        
    }, [search_updated])


    


    const handleCleanOpen = () => {
        // setCleanOpen(true)
    }

    const sendFav = () => {
        // console.log('send_fav')
        // setSnackbarOpen(true);
        // try {
        //     if (window.Telegram.WebApp.initData !== null && window.Telegram.WebApp.initData !== '') {
        //         fetch('https://turbobroker.ru/tg-web-app/send-all-fav', {
        //             method: 'post',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({
        //                 flat: 0,
        //                 fav: 1,
        //                 tg_data: window.Telegram.WebApp.initData || null
        //             })
        //         }).then(
        //             // setIsFav(!isFav)
        //         )
        //     } else {
        //         // console.log('Иди на хуй)')
        //         // setIsFav(!isFav)
        //     }
        // } catch (e) {

        // }

    }


    const getObjects = async () => {

        console.log('qwe')
        if (pageType === 'list') {
            setObjectsIsLoading(true);

            let data = new FormData();
            data.append('filter', JSON.stringify(activeSearch));
            data.append('page', page);

            try {
                await fetch('/api/tg-app/objects/get', {
                    method: 'POST',
                    body: data,
                }).then(res => res.json())
                    .then(data => {
                        setObjects(data.objects);
                        setObjectsCount(data.count)
                    })
                    .then(() => setObjectsIsLoading(false))
            } catch (e) {
                setIsError(true);
            }
        }
        if (pageType === 'map') {
            setObjectsIsLoading(true);

            let data = new FormData();
            data.append('filter', JSON.stringify(activeSearch));
            // data.append('page', page);

            try {
                await fetch('/api/tg-app/objects/map-info', {
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
                setIsError(true);
            }

        }

    }
    const getRatingColor = (value) => {
        if (value === 5) {
            return red[100]
        }
        if (value === 4) {
            return red[200]
        }
        if (value === 3) {
            return red[300]
        }
        if (value === 2) {
            return red[500]
        }
        if (value === 1) {
            return red[900]
        }


    }

    if (objectsIsLoading) {
        return (
            <LoadingTb />
        )
    }

    const per_page = 20;

    return (<>
        <Paper
            key={'flat_list'}
        >
            {
                fav && (<>

                    <Paper className="grid grid-flow-col justify-stretch mb-3">
                        <Button
                            className='mr-1 '
                            // fullWidth
                            variant='contained'
                            startIcon={<DeleteIcon />}
                            onClick={handleCleanOpen}
                            color="error"
                        >
                            Очистить
                        </Button>
                        <Button
                            className='ml-1 '
                            // fullWidth
                            color="success"
                            variant='contained'
                            onClick={sendFav}
                            startIcon={<SendIcon />}
                        >
                            Отправить в чат
                        </Button>



                    </Paper>
                </>)
            }
            {/* <YMaps query={{
                load: "package.full",
                lang: "ru_RU",
                // apikey: "e105999a-b1c1-4234-963f-21e492dca418"
            }}> */}
            <Paper
                className="p-2 text-right mt-5"
            >
                <Typography variant="body2" color="text.secondary">
                    Показано: {(((page - 1) * per_page) + 1)}- {(((page - 1) * per_page) + objects.length)} из {objectsCount}
                    {/* Показано:{objectsCount} */}
                </Typography>
                <Button

                    style={{
                        textDecoration: 'none',
                        textTransform: 'none',
                        whiteSpace: 'nowrap',
                        width: '33%'
                    }}
                >
                    <SortIcon />
                    Сортировка
                </Button>
            </Paper>
            {
                objects.map(function (object) {

                    return (<ObjectCard
                        //  handlePriceDescModal={handlePriceDescModal} 
                        key={'flat_card_' + object.id}
                        object={object}
                        formData={formData}
                    //  metro={metro}
                    //   fav={fav} 
                    //   dispatch={dispatch} 
                    />)
                })

            }
            {/* </YMaps> */}
        </Paper>
        <ReportPlotModal
            mobile={true}
        />

    </>);
}

export default ObjectsList;