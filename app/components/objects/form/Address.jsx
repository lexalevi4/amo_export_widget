'use client'
import { useEffect, useRef, useState } from "react";
import { AddressSuggestions } from "react-dadata";
import { useYMaps } from "@pbe/react-yandex-maps";
import MyTextInput from "./MyTextInput";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Skeleton, Stack, Switch, TextField, Typography } from "@mui/material";
import '../../../../dist/style.css'
import { useObjectFormState } from "@/app/objects/create/store";
import NewBuilding from "./object-forms/NewBuilding";
import { sortByName } from "@/app/heplers/heplers";


function Address({
    // flat = { flat },
    // address
    // setter
}) {

    const flat = useObjectFormState((state) => state.flat);

    console.log(flat);


    const ymaps = useYMaps();
    const [placemark, setPlacemark] = useState(null);
    const [map, setMap] = useState(null);

    const lat = useObjectFormState((state) => state.flat.lat);
    const flatId = useObjectFormState((state) => state.flat.id);
    const lng = useObjectFormState((state) => state.flat.lng);
    const address = useObjectFormState((state) => state.flat.address);
    const [dadata_address, setDadataAddress] = useState(useObjectFormState((state) => state.flat.dadata));
    const dadata_response = useObjectFormState((state) => state.flat.dadata_response);

    const mapRef = useRef(null);
    const updateFlat = useObjectFormState((state) => state.updateFlat);
    const updateMultiItemField = useObjectFormState((state) => state.updateMultiItemField);


    const newBuildings = useObjectFormState((state) => state.flat.newBuildings);
    const newBuildingHouses = useObjectFormState((state) => state.flat.newBuildingHouses);

    const metroDistances = useObjectFormState((state) => state.flat.metroDistances);
    const highwayDistances = useObjectFormState((state) => state.flat.highwayDistances);

    const formData = useObjectFormState((state) => state.formData);

    const stations = formData.metro.sort((a, b) => sortByName(a, b, 'metro'));
    const all_highways = formData.highway.sort((a, b) => sortByName(a, b, 'name'));

    const [metroUpdating, setMetroUpdating] = useState(false);
    const [metroDisabled, setMetroDisabled] = useState(false);
    console.log(address);

    // const [startMetroUpdating, setStartMetroUpdating] = useState(false);

    // useEffect(() => {
    //     if (startMetroUpdating) {
    //         updateMetro();
    //         setStartMetroUpdating(false);
    //     }

    // }, [lat, lng])

    useEffect(() => {
        // let initial = 0;
        let selected = 0;
        metroDistances.map(item => {
            // console.log(item);
            // console.log(item.active);
            selected = selected + Number(item.active);
            return true;
        })
        // let selected = metroDistances.reduce((item) => { initial + item.active }, initial)
        // console.log(selected);
        if (selected > 2) {
            setMetroDisabled(true)
        } else {
            setMetroDisabled(false)
        }


        // console.log(metroDistances)

    }, [metroDistances])

    // const [showZhk, setShowZhk] = useState(false);

    const dragEnd = (e) => {
        let coords = e.originalEvent.target.geometry.getCoordinates()
        console.log(e);
        console.log(coords);
        updateFlat('lat', coords[0])
        updateFlat('lng', coords[1])
        // setStartMetroUpdating(true);
        try {
            updateMetro(coords[0], coords[1])
        } catch (e) {

        }

    }

    const geocode = async function (lat, lng) {
        let dadata = await (await fetch('/api/dadata/reverse-geocode?lat=' + lat + '&lng=' + lng)).json()
        return dadata.suggestions[0];
    }

    // useEffect(() => {
    //     console.log(newBuildings)
    //     console.log(newBuildingHouses)

    // }, [newBuildings, newBuildingHouses])

    useEffect(() => {

        if (!ymaps || !mapRef.current

        ) {
            return;
        }
        let newMap = new ymaps.Map(mapRef.current, {
            controls: [],
            center: [55.751574, 37.573856], zoom: 10,
        }, {
            // maxZoom: 16,
            // minZoom: 10
        })
        newMap.events.add('click', async function (e) {
            let coords = e.get('coords');
            updateFlat('lat', coords[0])
            updateFlat('lng', coords[1])
            let dadata = await geocode(coords[0], coords[1]);
            updateFlat('address', dadata.value)
            updateFlat('dadata_response', dadata)
            setDadataAddress(dadata)
            // let addr_field = document.querySelector('.react-dadata__input');
            // addr_field.value = dadata.value;

        });
        setMap(
            newMap
        );


        if (map) {

            if (lat > 0 && lng > 0) {
                let new_placemark = new ymaps.Placemark([lat, lng])
                setPlacemark(new_placemark);
                map.geoObjects.add(new_placemark);
                new_placemark.events.add(['dragend'], dragEnd)
            }
        }

    }, [ymaps, flat])

    const onAddrChange = (suggestion) => {
        updateFlat('address', suggestion.value)
        updateFlat('dadata_response', suggestion)
        setDadataAddress(suggestion)
    }
    useEffect(() => {
        console.log(dadata_response)
        if (dadata_response?.value) {
            updateFlat('address', dadata_response?.value)
            // setStartMetroUpdating(true);
            if (dadata_response?.data?.geo_lat) {
                updateFlat('lat', dadata_response?.data?.geo_lat)
            }
            if (dadata_response?.data?.geo_lon) {
                updateFlat('lng', dadata_response?.data?.geo_lon)
                try {
                    updateMetro(dadata_response.data.geo_lat, dadata_response.data.geo_lon)
                } catch (e) {

                }

            }
            if (dadata_response?.data?.region_with_type) {
                updateFlat('locationRegion', dadata_response?.data?.region_with_type)
            } else {
                updateFlat('locationRegion', '')
            }
            if (dadata_response?.data?.area_with_type) {
                updateFlat('locationDistrict', dadata_response?.data?.area_with_type)
            } else {
                updateFlat('locationDistrict', '')
            }
            if (dadata_response?.data?.city_with_type || dadata_response?.data?.settlement_with_type) {
                if (dadata_response?.data?.city_with_type) {
                    updateFlat('locationLocality', dadata_response?.data?.city_with_type)
                }
                if (dadata_response?.data?.settlement_with_type) {
                    updateFlat('locationLocality', dadata_response?.data?.settlement_with_type)
                }

            } else {
                updateFlat('locationLocality', '')
            }
            if (dadata_response?.data?.street_with_type) {
                updateFlat('locationStreet', dadata_response?.data?.street_with_type)
            } else {
                updateFlat('locationStreet', '')
            }
            if (dadata_response?.data?.house) {
                let house = dadata_response?.data?.house;
                if (dadata_response?.data?.block_type) {
                    house = house + " " + dadata_response?.data?.block_type + " " + dadata_response?.data?.block
                }
                updateFlat('locationHouse', house)
            } else {
                updateFlat('locationHouse', '')
            }

            // updateFlat('lng', dadata_response?.data?.geo_lon)
        }

    }, [dadata_response])



    useEffect(() => {

        if (ymaps && map) {
            if (lat > 0 && lng > 0) {
                if (placemark === null) {
                    let new_placemark = new ymaps.Placemark([lat, lng],
                        {},
                        {
                            draggable: true
                        })
                    setPlacemark(new_placemark);
                    map.geoObjects.add(new_placemark);
                    new_placemark.events.add(['dragend'], dragEnd)
                    map.setCenter([lat, lng])
                    map.setZoom(17)
                } else {
                    placemark.geometry.setCoordinates([lat, lng]);
                    map.setCenter([lat, lng])
                    map.setZoom(17)
                }

            }
        }

    }, [lat, lng, ymaps, map, flatId])

    const updateAddrString = (e) => {
        updateFlat('address', e.target.value)
    }


    const getMetro = async (newLat, newLng) => {
        let res = await (await fetch('/api/object/get-metro-and-highways?lat=' + newLat + '&lng=' + newLng)).json()
        return res;
    }
    const updateMetro = async (newLat, newLng) => {
        setMetroUpdating(true);
        let res = await getMetro(newLat, newLng);
        console.log(res);
        if (res.status === 'ok') {
            updateFlat('metroDistances', res.metro)
            updateFlat('highwayDistances', res.highways)
        } else {
            updateFlat('metroDistances', [])
            updateFlat('highwayDistances', [])
        }

        setMetroUpdating(false);
    }


    return (<>
        <Typography
            variant="h6"
            color='GrayText'
        >
            Адрес
        </Typography>

        <Stack direction={'row'} spacing={2}>
            <div
                style={{
                    width: 500
                }}>
                <AddressSuggestions token={"asdfasdfasdf"}
                    key={Math.random()}
                    uid='dadata-input-qq'
                    url="/api/dadata/suggest"
                    // height={56}
                    style={{
                        height: 56
                    }}
                    // onAddrChange={test}
                    inputProps={
                        {
                            onChange: updateAddrString
                        }

                    }

                    httpCache

                    // query={address}
                    value={dadata_address}
                    defaultQuery={address}
                    onChange={onAddrChange}
                    delay={300}
                    minChars={3}
                />
            </div>
            <MyTextInput
                type='number'
                // value={lat}
                // setter={setter}
                title='Широта'
                name={'lat'}
            />
            <MyTextInput
                type='number'
                // value={lng}
                // setter={setter}
                title='Долгота'
                name={'lng'}
            />
        </Stack>
        <Stack>
            <Typography
                variant="h6"
                color='GrayText'
                className="mb-3"
            >Адрес разбитый (для экзотических досок и листовок)
            </Typography>
            <Stack
                direction={'row'}
                spacing={2}
            >
                <MyTextInput

                    // value={lng}
                    // setter={setter}
                    title='Регион'
                    name={'locationRegion'}
                />

                <MyTextInput
                    width={400}

                    // value={lng}
                    // setter={setter}
                    title='Район'
                    name={'locationDistrict'}
                />
                <MyTextInput

                    // value={lng}
                    // setter={setter}
                    title='Населённый пункт'
                    name={'locationLocality'}
                />
                <MyTextInput

                    // value={lng}
                    // setter={setter}
                    title='Улица'
                    name={'locationStreet'}
                />
                <MyTextInput
                    width={150}

                    // value={lng}
                    // setter={setter}
                    title='Дом'
                    name={'locationHouse'}
                />

            </Stack>

        </Stack>


        <div style={
            {
                width: '100%',
                height: '30vh'
            }
        }>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }}>
            </div>
        </div>

        <Typography
            variant="h6"
            color='GrayText'
            className="mb-3"
        >
            ЖК (Обязательно для Новостроек)
        </Typography>
        <Stack
            direction={'row'}
            spacing={2}
            className="my-3"
        >
            <Stack
                width={'33%'}
            >
                <Typography>
                    Циан
                </Typography>
                <NewBuilding
                    key={Math.random()}
                    src={1}
                    zhk={newBuildings.filter((item) => { return item.src === 1 })[0] ? newBuildings.filter((item) => { return item.src === 1 })[0] : null}
                    house={newBuildingHouses.filter((item) => { return item.src === 1 })[0] ? newBuildingHouses.filter((item) => { return item.src === 1 })[0] : null}
                // house={null}

                />
            </Stack>
            <Stack
                width={'33%'}
            >
                <Typography>
                    Авито
                </Typography>
                <NewBuilding
                    src={2}
                    zhk={newBuildings.filter((item) => { return item.src === 2 })[0] ? newBuildings.filter((item) => { return item.src === 2 })[0] : null}
                    house={newBuildingHouses.filter((item) => { return item.src === 2 })[0] ? newBuildingHouses.filter((item) => { return item.src === 2 })[0] : null}
                // house={null}

                />
            </Stack>

            <Stack
                width={'33%'}
            >
                <Typography>
                    Яндекс
                </Typography>
                <NewBuilding
                    src={3}
                    zhk={newBuildings.filter((item) => { return item.src === 3 })[0] ? newBuildings.filter((item) => { return item.src === 3 })[0] : null}
                    house={newBuildingHouses.filter((item) => { return item.src === 3 })[0] ? newBuildingHouses.filter((item) => { return item.src === 3 })[0] : null}
                // house={null}

                />
            </Stack>

        </Stack>

        <Stack
            direction={'row'}
            spacing={2}
        >
            <Stack
                spacing={1}
                width={'50%'}
            >
                <Typography
                    className="text-center"

                >
                    Метро
                </Typography>

                {metroUpdating && (<>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </>)}


                {!metroUpdating && metroDistances.map((metroItem, index) => {
                    return (
                        <Stack
                            direction={'row'}
                            key={'form_metro_' + index}
                        >
                            <FormControl
                            // label={"Метро"}

                            >
                                <Switch
                                    checked={Boolean(metroItem.active)}
                                    label="Активно"
                                    disabled={metroDisabled && !(Boolean(metroItem.active))}
                                    onChange={(e) => { updateMultiItemField('metroDistances', index, 'active', metroItem.active ? 0 : 1) }}
                                />
                            </FormControl>

                            <FormControl
                                // label={"Метро"}
                                style={
                                    {
                                        width: 250
                                    }

                                }
                            >
                                <InputLabel id={index + "-metro-label"}>Метро</InputLabel>
                                <Select
                                    // name="Метро"

                                    labelId={index + "-metro-label"}
                                    id={index + "-metroselect"}
                                    value={metroItem.id}
                                    input={<OutlinedInput label={'Метро'} />}
                                    onChange={(e) => { updateMultiItemField('metroDistances', index, 'id', e.target.value) }}
                                // onChange={(e) => { updateMultiItemField('metro', index, 'id', e.target.value) }}
                                // value={.id}
                                >
                                    {stations.map((station, station_index) => {
                                        return (
                                            <MenuItem
                                                key={'metro-menu-item-' + index + '-' + station.id}
                                                value={station.id}
                                                id={index + '-metro-item-' + metroItem.id}
                                            >
                                                {stations.filter(item => item.id === station.id)[0].colors.map(function (color, index) {
                                                    return (<span key={station_index + '_metro_' + index} style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
                                                })}
                                                {station.metro}
                                            </MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>

                            <Box>
                                <FormControl
                                    style={
                                        {
                                            width: 100
                                        }}
                                >
                                    < TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        type={'numeric'}
                                        label={'Пешком'}

                                        // id={'to_metro-input'}
                                        value={metroItem.foot}
                                        onChange={(e) => { updateMultiItemField('metroDistances', index, 'foot', e.target.value) }}
                                    // onChange={(e) => { updateMultiItemField('metro', index, 'to_metro', e.target.value) }}
                                    />
                                </FormControl>
                            </Box >
                            <Box>
                                <FormControl
                                    style={
                                        {
                                            width: 100
                                        }}
                                >
                                    < TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        type={'numeric'}
                                        label={'Траспортом'}

                                        // id={'to_metro-input'}
                                        value={metroItem.car}
                                        onChange={(e) => { updateMultiItemField('metroDistances', index, 'car', e.target.value) }}
                                    // onChange={(e) => { updateMultiItemField('metro', index, 'to_metro', e.target.value) }}
                                    />
                                </FormControl>
                            </Box >
                            <Box>
                                <FormControl
                                    style={
                                        {
                                            width: 150
                                        }

                                    }
                                >
                                    <InputLabel id={index + "-to_metro_by-label"}>В фиде указываем</InputLabel>
                                    <Select
                                        labelId={index + "-to_metro_by-label"}
                                        // id={index + "-to_metro_byselect"}
                                        value={metroItem.distanceType}
                                        input={<OutlinedInput
                                            label={'В фиде указываем'}
                                        />}
                                        onChange={(e) => { updateMultiItemField('metroDistances', index, 'distanceType', e.target.value) }}
                                    // defaultValue={item.distance_type}
                                    // onChange={(e) => { updateMetro(index, 'distanceType', e.target.value) }}
                                    >
                                        <MenuItem
                                            value={1}
                                        // id={index + '-multiad-item-' + 1}
                                        >
                                            Пешком
                                        </MenuItem>
                                        <MenuItem
                                            value={2}
                                        // id={index + '-multiad-item-' + 2}
                                        >
                                            Транспортом
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>

                        </Stack>)
                })}


            </Stack>
            <Divider orientation="vertical" flexItem />
            <Stack
                width={'50%'}
                // direction={'row'}
                spacing={2}
            >
                <Typography
                    className="text-center"
                >
                    Шоссе
                </Typography>

                {metroUpdating && (<>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />

                </>)}
                {!metroUpdating && highwayDistances.map((highwayItem, index) => {
                    return (
                        <Stack
                            direction={'row'}
                            key={'form_highway_' + index}
                        >
                            <FormControl
                                style={
                                    {
                                        width: 400
                                    }

                                }
                            >
                                <InputLabel id={index + "-highways-label"}>{"Шоссе"}</InputLabel>
                                <Select
                                    labelId={index + "-highways-label"}
                                    id={index + "-highwaysselect"}
                                    value={highwayItem.id}
                                    input={<OutlinedInput label={'Шоссе'} />}
                                    onChange={(e) => { updateMultiItemField('highwayDistances', index, 'id', e.target.value) }}
                                >
                                    {all_highways.map((highway, station_index) => {
                                        return (
                                            <MenuItem
                                                key={'highways-menu-item-' + index + '-' + highway.id}
                                                value={highway.id}
                                            // id={index + '-highways-item-' + highway.id}
                                            >

                                                {highway.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <Box>
                                <FormControl
                                // style={
                                //     {
                                //         width: 80
                                //     }}
                                >
                                    < TextField
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        type={'numeric'}
                                        label={'Расстояние (км)'}

                                        // id={'to_metro-input'}
                                        value={highwayItem.distance}
                                        onChange={(e) => { updateMultiItemField('highwayDistances', index, 'distance', e.target.value) }}
                                    />
                                </FormControl>
                            </Box >

                        </Stack>)
                })}

            </Stack>

        </Stack>

    </>);
}

export default Address;