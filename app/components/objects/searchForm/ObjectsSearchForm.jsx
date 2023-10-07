'use client'

import { useObjectSearchFormState } from "@/app/objects/store";
import { Button, Divider, Fade, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Paper, Popper, Radio, RadioGroup, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { serialize } from '@/app/heplers/clientHelpers'
import SearchRadioGroup from "./formComponents/SearchRadioGroup";
import SearchSelect from "./formComponents/SearchSelect";
import { AddressSuggestions } from "react-dadata";
import '../../../../dist/style.css'
import Addrobjs from "./formComponents/Addrobjs";
import { Label } from "@mui/icons-material";
import SearchButtonsGroup from "./formComponents/SearchButtonsGroup";
import DualTextField from "./formComponents/DualTextField";
import MetroModal from "./formComponents/MetroModal";
import MapSearchModal from "./formComponents/MapSearchModal";
import { YMaps } from "@pbe/react-yandex-maps";
import DistrictsModal from "./formComponents/DistrictsModal";
import HighwaysModal from "./formComponents/HighwaysModal";

// import { useSearchParams } from 'next/navigation'

function ObjectsSearchForm({ formData }) {

    const search = useObjectSearchFormState((state) => state.search)
    const params = useObjectSearchFormState((state) => state.params)

    const searchParams = useSearchParams();
    const cluster = useObjectSearchFormState((state) => state.search.cluster);
    const setFormData = useObjectSearchFormState((state) => state.setFormData);
    const loading = useObjectSearchFormState((state) => state.loading);
    const category = useObjectSearchFormState((state) => state.search.category);
    const object = useObjectSearchFormState((state) => state.search.object);
    const addrobjs = useObjectSearchFormState((state) => state.search.addrobjs);
    const metro = useObjectSearchFormState((state) => state.search.metro);
    const polygons = useObjectSearchFormState((state) => state.search.polygons);
    const districts = useObjectSearchFormState((state) => state.search.districts);
    const okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    const highways = useObjectSearchFormState((state) => state.search.highways);



    const setSearch = useObjectSearchFormState((state) => state.setSearch);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const [metroOpen, setMetroOpen] = useState(false);
    const [districtsOpen, setDistrictsOpen] = useState(false);
    const [highwaysOpen, setHighwaysOpen] = useState(false);
    const [mapOpen, setMapOpen] = useState(false);
    const [isloading, setIsLoading] = useState(false);

    const [saveFilteranchorEl, setSaveFilterAnchorEl] = useState(null);
    const [saveFilterOpen, setSaveFilterOpen] = useState(false);
    const [filterName, setFilterName] = useState('');

    const pageType = useObjectSearchFormState((state) => state.pageType)
    const setState = useObjectSearchFormState((state) => state.setState)


    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const changePageType = useObjectSearchFormState((state) => state.changePageType);
    


    const handleSaveFilterClick = (e) => {
        setSaveFilterAnchorEl(e.currentTarget);
        setSaveFilterOpen(!saveFilterOpen);
    }
    const handleSetFilterName = (e) => {
        setFilterName(e.target.value)
    }


    const saveFilter = async () => {
        let data = new FormData();
        data.append('search', JSON.stringify(search));
        data.append('name', filterName);
        try {
            await fetch('/api/client/saveFilter', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
            // .then(data => { setObjects(data.objects) })
            // .then(() => setObjectsIsLoading(false))
        } catch (e) {
        }


    }



    // console.log(params.get('rooms'))
    // console.log(params.getAll('rooms'));

    useEffect(() => {
        const new_search = search;
        for (const key of searchParams.keys()) {
            if (params.array_nums.includes(key)) {
                new_search[key] = (searchParams.getAll(key).map(item => Number(item))) || []
            } else if (params.arrays.includes(key)) {
                new_search[key] = searchParams.getAll(key) || []
            } else {
                new_search[key] = searchParams.get(key) || ''
            }
            // console.log(key);
        }
        // console.log(new_search);
        setSearch(new_search);
        setFormData(formData)
    }, [])

    // console.log(searchParams);

    const [object_menu_items, setObject_menu_items] = useState([]);
    // const [address, setAddress] = useState('');

    useEffect(() => {
        try {
            let qq = document.querySelector('.react-dadata__input')
            if (qq) {
                // console.log(qq)
                qq.value = ''
            }
        } catch (e) {

        }

    }, [addrobjs])


    // useEffect(() => {
    //     console.log(address)
    // }, [address])
    useEffect(() => {

        if (Number(category) > 0) {


            const new_menu = formData.object.filter((item) => {
                return Number(item.category) === Number(category)
            });

            const new_object = object.filter(item => {
                var result = false;
                new_menu.map(menu_item => {
                    if (item === menu_item.id) {
                        result = true;
                    }
                    return true;
                })
            })
            setSearchParam('object', new_object)

            setObject_menu_items(
                new_menu
            )
        }
    }, [category])


    if (loading) {
        return (<></>)
    }


    const onAddrChange = (suggestion) => {
        // console.log(suggestion);
        // console.log(suggestion.data.fias_id);
        // console.log(suggestion.value);
        const new_value = suggestion.data.fias_id + ':' + suggestion.value;
        updateMultyField('addrobjs', new_value);
        // console.log(addrobjs);


    }

    const updateObjects = () => {
        setActiveSearch(search);
    }

    const handlePageType = () => {
        
        pageType === 'list' ? setState('pageType', 'map') : setState('pageType', 'list')

    }


    return (<>
        {/* <h1>Объекты</h1> */}
        <Grid container spacing={2} >
            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >
                <SearchRadioGroup
                    items={formData.cluster}
                    name={'cluster'}
                    title={'База'}
                />
            </Grid>
            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >
                <SearchRadioGroup
                    items={formData.deal_type}
                    name={'deal_type'}
                    title={'Тип сделки'}
                />
            </Grid>
            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >

                <SearchRadioGroup
                    items={formData.category}
                    name={'category'}
                    title={'Категория'}
                />
            </Grid>
        </Grid>

        {Number(cluster) === 3 && (
            <Grid container spacing={2} >
                <Grid
                    // className="p-1 m-2"
                    item
                    // xl={4}
                    // md={6}
                    xs={4}

                >

                    <SearchRadioGroup
                        items={formData.isByHomeowner}
                        name={'isByHomeowner'}
                        title={'Автор'}
                    />

                </Grid>
            </Grid>
        )}

        <Divider className="my-4" />
        <Grid container spacing={2} >
            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >
                <Stack
                    spacing={2}
                >


                    {Number(category) === 1 && (
                        <>
                            <SearchButtonsGroup
                                items={formData.rooms_search}
                                name={'rooms'}
                                title={'Комнат'}
                            />
                            <SearchRadioGroup
                                items={formData.isNewBuilding}
                                name={'isNewBuilding'}
                                title={'Готовность'}
                            />
                        </>
                    )}





                    {Number(category) > 1 && (
                        <SearchSelect
                            items={object_menu_items}
                            required={false}
                            multiple={true}
                            name={'object'}
                            title={'Объект'}
                        // width={}

                        />
                    )}
                    <DualTextField
                        name1={'minPrice'}
                        name2={'maxPrice'}
                        title1={'Цена от'}
                        title2={'Цена до'}
                    />

                    {/* {object.includes(1) && (
                        <>

                        </>
                    )} */}






                </Stack>

            </Grid>
            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >
                <Stack
                    spacing={2}
                >




                    <DualTextField
                        name1={'minTotalArea'}
                        name2={'maxTotalArea'}
                        title1={'Площадь от'}
                        title2={'Площадь до'}
                    />
                    {Number(category) === 1 && (
                        <>
                            <DualTextField
                                name1={'minLivingArea'}
                                name2={'maxLivingArea'}
                                title1={'Жилая от'}
                                title2={'Жилая до'}
                            />

                            <DualTextField
                                name1={'minKitchenArea'}
                                name2={'maxKitchenArea'}
                                title1={'Кухня от'}
                                title2={'Кухня до'}
                            />
                        </>
                    )}
                    {Number(category) > 1 && (
                        <DualTextField
                            name1={'minLandArea'}
                            name2={'maxLandArea'}
                            title1={'Участок от'}
                            title2={'Участок до'}
                        />
                    )}

                </Stack>

            </Grid>

            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >

                <Stack
                    spacing={2}
                >

                    {Number(category) !== 2 && (
                        <DualTextField
                            name1={'minFloor'}
                            name2={'maxFloor'}
                            title1={'Этаж от'}
                            title2={'Этаж до'}
                        />
                    )}


                    <DualTextField
                        name1={'minFloorsCount'}
                        name2={'maxFloorsCount'}
                        title1={'Этажность от'}
                        title2={'Этажность до'}
                    />

                </Stack>
            </Grid>


        </Grid>
        <Divider
            className="my-4"
        />
        <Grid container spacing={2} >
            <Grid
                // className="p-1 m-2"
                item
                // xl={4}
                // md={6}
                xs={4}

            >

                <FormControl
                    fullWidth
                >
                    <FormLabel id={"dadata-name-label"}>Адрес</FormLabel>

                    <AddressSuggestions token={"asdfasdfasdf"}
                        uid='dadata-input-qq'
                        url="/api/dadata/suggest"
                        id='dadata-search-input'
                        // height={56}
                        // style={{
                        //     height: 56
                        // }}
                        httpCache
                        // hintText={'asdf'}
                        // httpCacheTtl={}

                        // value={address}
                        // defaultQuery={''}

                        onChange={onAddrChange}
                        delay={300}
                        minChars={3}
                    />
                </FormControl>

            </Grid>
            <Grid
                className="text-center"
                item
                xs={4}

            >
                <Grid
                    fullWidth
                    container
                    className="text-center"
                    style={{
                        justifyContent: "center",
                        // content: ""
                    }}

                >
                    <Grid item
                        style={{ width: '50%' }}
                        className="px-2"
                    >
                        <Button
                            // className="mx-2"
                            style={{ width: '100%' }}
                            variant="contained"
                            onClick={() => setMetroOpen(true)}
                        >
                            Выбрать метро
                            {metro.length > 0 && (
                                <>
                                    &nbsp;[{metro.length}]
                                </>
                            )}
                        </Button>


                    </Grid>
                    <Grid item
                        className="px-2"
                        style={{ width: '50%' }}
                    >
                        <Button
                            // className="mx-2"
                            style={{ width: '100%' }}
                            variant="contained"
                            onClick={() => setHighwaysOpen(true)}
                        >
                            Выбрать шоссе
                            {highways.length > 0 && (
                                <>
                                    &nbsp;[{highways.length}]
                                </>
                            )}
                        </Button>
                    </Grid>

                </Grid>

            </Grid>
            <Grid

                className="text-center"
                item
                xs={4}

            >
                <Grid container
                    style={{ width: '100%' }}
                    spacing={2} >

                    <Grid
                        style={{ width: '50%' }}
                        // className="p-1 m-2"
                        item
                    // xl={4}
                    // md={6}
                    // xs={4}

                    >
                        <Button
                            style={{ width: '100%' }}
                            // className="my-10"
                            variant="contained"
                            onClick={() => setDistrictsOpen(true)}
                        >
                            Выбрать районы
                            {(districts.length > 0 || okrugs.length > 0) && (
                                <>
                                    &nbsp;[{districts.length + okrugs.length}]
                                </>
                            )}
                        </Button>
                    </Grid>

                    <Grid
                        style={{ width: '50%' }}
                        // className="p-1 m-2"
                        item
                    // xl={4}
                    // md={6}
                    // xs={4}

                    >
                        <Button
                            style={{ width: '100%' }}
                            // className="my-10"
                            variant="contained"
                            onClick={() => setMapOpen(true)}
                        >
                            Область на карте
                            {polygons.length > 0 && (
                                <>
                                    &nbsp;[{polygons.length}]
                                </>
                            )}
                        </Button>
                    </Grid>
                </Grid>

            </Grid>


        </Grid >



        <Addrobjs />
        <Divider
            className="my-3"
        />
        <Stack spacing={2} direction={'row'}>
            {/* <Link
                href={'/objects?' + serialize(search)}
                replace
                prefetch={false}

            > */}

            <Button
                className="my-10"
                variant="contained"
                disabled={isloading}
                onClick={updateObjects}
            // onClick={() => setIsLoading(true)}
            >
                Искать
            </Button>
            {/* </Link> */}
            {/* <Link
                href={'/objects?' + serialize(search)}
                replace
                prefetch={false}

            > */}

            <Button
                className="my-10"
                variant="contained"
                disabled={isloading}
                onClick={changePageType}

            >
                {pageType === 'list' ? 'На карте' : 'Списком'}
            </Button>
            {/* </Link> */}

            <Button
                className="my-10"
                variant="contained"
                onClick={handleSaveFilterClick}
            // disabled={isloading}
            >
                Создать подборку
            </Button>
            <Popper open={saveFilterOpen} anchorEl={saveFilteranchorEl} placement={'right-end'} transition>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper
                            elevation={10}
                            className="p-5"
                        >
                            {/* <Typography sx={{ p: 2 }}>The content of the Popper.</Typography> */}
                            <TextField
                                label={'Название'}
                                value={filterName}
                                onChange={handleSetFilterName}
                            />
                            <Divider
                                className="mb-2"
                            />
                            <Button

                                className="mx-2"
                                onClick={saveFilter}
                            >Сохранить</Button>
                            <Button
                                onClick={() => setSaveFilterOpen(false)}
                                className="mx-2"
                            >Отмена</Button>
                        </Paper>
                    </Fade>
                )}
            </Popper>

        </Stack>
        <MetroModal
            isOpen={metroOpen}
            handleClose={() => setMetroOpen(false)}
        />
        <DistrictsModal
            isOpen={districtsOpen}
            setIsOpen={setDistrictsOpen}
        />
        <HighwaysModal
            isOpen={highwaysOpen}
            setIsOpen={setHighwaysOpen}
        />



        <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                // apikey: "e105999a-b1c1-4234-963f-21e492dca418"
            }}
        >
            <MapSearchModal
                isOpen={mapOpen}
                setIsOpen={setMapOpen}
            />
        </YMaps>

    </>);
}

export default ObjectsSearchForm;