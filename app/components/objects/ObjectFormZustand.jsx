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
import Description from "./form/object-forms/Description";
import MyDivider from "./form/MyDivider";
import Images from "./form/Images";
import { useObjectFormState } from "@/app/objects/create/store";
import { shallow } from 'zustand/shallow'

function ObjectFormZustand({ form_data, flat_for_update = null }) {


    const loading = useObjectFormState((state) => state.loading);
    const setFlat = useObjectFormState((state) => state.setFlat);
    const updateFlat = useObjectFormState((state) => state.updateFlat);
    const addImages = useObjectFormState((state) => state.addImages);
    const formData = useObjectFormState((state) => state.formData);
    const setFormData = useObjectFormState((state) => state.setFormData);
    const flat = useObjectFormState((state) => Object.keys(state.flat))
    const category = useObjectFormState((state) => state.flat.category)
    const object = useObjectFormState((state) => state.flat.object);

    useEffect(() => {
        setFlat(flat_for_update);
        setFormData(form_data);
    }, [])

    useEffect(() => {
        console.log(formData)
    }, [formData])



    const [object_menu_items, setObject_menu_items] = useState([]);

    // useEffect(() => {
    //     console.log(object_menu_items)

    // }, [flat])

    // useEffect(() => {
    //     console.log(object_menu_items)

    // }, [object_menu_items])

    useEffect(() => {
        updateFlat('object', '');
        if (Number(category) > 0) {

            setObject_menu_items(
                form_data.object.filter((item) => {
                    return Number(item.category) === Number(category)
                })
            )

        }
    }, [category])

    if (loading) {
        return <></>
    }
    // const { id, text, done } = todo
    // const setter = (name, value) => {
    //     updateFlat(name, value);
    // }

    const getter = (name) => {
        return useObjectFormState((state) => state.flat[name])
    }

    return (<>
        <Stack spacing={2}>

            <MyRadioGroup

                items={formData.deal_type}
                title={"Тип сделки"}
                name={"deal_type"}
                value={flat.deal_type}
                // getter={getter}
                setter={updateFlat}

            />

            {flat.deal_type !== null && (
                <>
                    <MyRadioGroup

                        items={formData.category}
                        title={"Категория"}
                        name={"category"}
                        value={flat.category}
                        // getter={getter}
                        setter={updateFlat}

                    />
                    {flat.category !== null && (

                        <MySelect
                            items={object_menu_items}
                            // value={object}
                            title={"Объект"}
                            name={'object'}
                            setter={updateFlat}
                            getter={getter}
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
                    setter={updateFlat}
                    flat={flat}
                />
            </YMaps >


            {Number(category) === 2 && (
                <MyTextInput
                    name={'kpName'}
                    value={flat.kpName}
                    setter={updateFlat}
                    title={'Название коттеджного посёлка'}
                    width={500}
                />
            )}


            {Number(category) === 3 && (
                <MyTextInput
                    name={'buildingName'}
                    value={flat.buildingName}
                    setter={updateFlat}
                    title={'Название здания'}
                    width={500}
                />
            )}


            {Number(category) === 1 && (
                <FlatSale
                    flat={flat}
                    getter={getter}
                    setter={updateFlat}
                    form_data={formData}
                    object={object}
                // deal_type={deal_type}

                />
            )}

            {Number(category) === 2 && (
                <Suburban
                    flat_object={object}
                    flat={flat}
                    form_data={formData}
                    getter={getter}
                    setter={updateFlat}
                />
            )}

            {Number(category) === 3 && (
                <Commercial
                    flat_object={object}
                    flat={flat}
                    form_data={formData}
                    getter={getter}
                    setter={updateFlat}
                // deal_type={deal_type}
                />
            )}

            {/* <Price
                flat={flat}
                deal_type={deal_type}
                form_data={form_data}
            /> */}


            <MyDivider
                title={"Описание"}

            />

            <Description
                flat={flat}
                setter={updateFlat}
                getter={getter}
            />


            <MyDivider
                title={"Фото"}

            />

            <Images
                setter={addImages}
                getter={getter}
            />




        </Stack >
    </>);
}

export default ObjectFormZustand;