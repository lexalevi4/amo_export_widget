"use client"

import { Box, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MyRadioGroup from "./form/RadioGroup";
import MySelect from "./form/MySelect";
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import Address from "./form/Address";
import { YMaps } from "@pbe/react-yandex-maps";
import MyButtonsGroup from "./form/MyButtonsGroup";
import MyTextInput from "./form/MyTextInput";
import MySwitch from "./form/MySwitch";
import FlatSale from "./form/object-forms/FlatSale";
import Price from "./form/object-forms/Price";
import Suburban from "./form/object-forms/Suburban";
import Commercial from "./form/object-forms/Commercial";

function ObjectForm({ form_data, flat_for_update = null }) {

    const flat = JSON.parse(JSON.stringify(flat_for_update));

    const [deal_type, setDeal_type] = useState(flat.deal_type);
    const [category, setCategory] = useState(flat.category);
    const [flat_object, setObject] = useState(flat.flat_object);

    const [address, setAddress] = useState(flat.address);
    const [lat, setLat] = useState(flat.lat);
    const [lng, setLng] = useState(flat.address);
    const [dadata_response, setDadata_respone] = useState(flat.dadata_response);
    const [kpName, setKpName] = useState(flat.kpName)
    const [buildingName, setBuildingName] = useState(flat.buildingName)




    const [object_menu_items, setObject_menu_items] = useState([]);



    useEffect(() => {
        setObject_menu_items(
            form_data.object.filter((item) => {
                return Number(item.category) === Number(category)
            })

        )
        setObject('')

    }, [category])

    // useEffect(() => {
    //     console.log(rooms)

    // }, [rooms])

    return (<>
        <Stack spacing={2}>

            <MyRadioGroup
                flat={flat}
                items={form_data.deal_type}
                title={"Тип сделки"}
                name={"deal_type"}
                value={deal_type}
                setter={setDeal_type}

            />

            {deal_type !== null && (
                <>
                    <MyRadioGroup
                        flat={flat}
                        items={form_data.category}
                        title={"Категория"}
                        name={"category"}
                        value={category}
                        setter={setCategory}

                    />
                    {category !== null && (
                        <MySelect
                            flat={flat}
                            items={object_menu_items}
                            value={flat_object}
                            title={"Объект"}
                            name={'flat_object'}
                            setter={setObject}
                        />
                    )}
                </>
            )}

            <Divider
                className="my-5"
            />

            <YMaps query={{
                load: "package.full",
                lang: "ru_RU",
                // apikey: "e105999a-b1c1-4234-963f-21e492dca418"
            }}>


                <Address

                    address={address}
                    setAddress={setAddress}
                    lat={lat}
                    setLat={setLat}
                    lng={lng}
                    setLng={setLng}
                    dadata_response={dadata_response}
                    setDadata_respone={setDadata_respone}
                />
            </YMaps >


            {Number(category) === 2 && (
                <MyTextInput
                    name={'kpName'}
                    value={kpName}
                    setter={setKpName}
                    flat={flat}
                    title={'Название коттеджного посёлка'}
                    width={500}


                />
            )}


            {Number(category) === 3 && (
                <MyTextInput
                    name={'buildingName'}
                    value={buildingName}
                    setter={setBuildingName}
                    flat={flat}
                    title={'Название здания'}
                    width={500}


                />
            )}


            {Number(category) === 1 && (
                <FlatSale
                    flat_object={flat_object}
                    flat={flat}
                    form_data={form_data}
                    deal_type={deal_type}
                />
            )}

            {Number(category) === 2 && (
                <Suburban
                    flat_object={flat_object}
                    flat={flat}
                    form_data={form_data}
                    deal_type={deal_type}
                />
            )}

            {Number(category) === 3 && (
                <Commercial
                    flat_object={flat_object}
                    flat={flat}
                    form_data={form_data}
                    deal_type={deal_type}
                />
            )}

            <Price
                flat={flat}
                deal_type={deal_type}
                form_data={form_data}
            />










        </Stack >
    </>);
}

export default ObjectForm;