"use client"

import { Button, Divider, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import MyRadioGroup from "./form/RadioGroup";
import MySelect from "./form/MySelect";
import 'react-dadata/dist/react-dadata.css';
import Address from "./form/Address";
import { YMaps } from "@pbe/react-yandex-maps";
import MyTextInput from "./form/MyTextInput";
import FlatSale from "./form/object-forms/FlatSale";
import Suburban from "./form/object-forms/Suburban";
import Commercial from "./form/object-forms/Commercial";
import Description from "./form/object-forms/Description";
import MyDivider from "./form/MyDivider";
import Images from "./form/Images";
import { useObjectFormState } from "@/app/objects/create/store";

import { useRouter } from "next/navigation";
import Price from "./form/object-forms/Price";
import dynamic from "next/dynamic";
// import { headers } from "next/server";


function ObjectFormZustand({ form_data, flat_for_update = null, leadId = 0 }) {
    const router = useRouter();
    // Call this function whenever you want to
    // refresh props!
    // const refreshData = () => {
    // router.replace(router.asPath);
    // }

    const loading = useObjectFormState((state) => state.loading);
    const setFlat = useObjectFormState((state) => state.setFlat);
    const updateFlat = useObjectFormState((state) => state.updateFlat);
    const addImages = useObjectFormState((state) => state.addImages);
    const formData = useObjectFormState((state) => state.formData);
    const setFormData = useObjectFormState((state) => state.setFormData);
    const flat = useObjectFormState((state) => Object.keys(state.flat))
    const category = useObjectFormState((state) => state.flat.category)
    const object = useObjectFormState((state) => state.flat.object);
    const flat_data = useObjectFormState((state) => state.flat)
    const deal_type = useObjectFormState((state) => state.flat.deal_type)



    useEffect(() => {
        // setFlat(flat_for_update);
        setFormData(form_data);
    }, [])

    useEffect(() => {
        console.log(flat_for_update)
        setFlat(flat_for_update);
        // setFormData(form_data);
    }, [flat_for_update])

    // useEffect(() => {
    // console.log(formData)
    // }, [formData])



    const [object_menu_items, setObject_menu_items] = useState([]);
    const [saveError, setSaveError] = useState(false);
    const [saveErrorMessage, setSaveErrorMessage] = useState('');



    // useEffect(() => {
    //     if (object_menu_items.length > 0) {

    //         const filtered = object_menu_items.filter(item => {
    //             return item.id === Number(object);
    //         })

    //         if (filtered.length === 0) {
    //             updateFlat('object', '');
    //             console.log('empty')
    //             console.log(object_menu_items)
    //             console.log(object_menu_items.length)
    //             console.log(Number(object));
    //         } else {
    //             console.log('not empty')
    //         }
    //     }
    // }, [object_menu_items])

    useEffect(() => {

        if (Number(category) > 0) {
            const new_menu = form_data.object.filter((item) => {
                return Number(item.category) === Number(category)
            });
            const filtered = new_menu.filter(item => {
                return item.id === Number(object);
            })
            if (filtered.length === 0) {
                updateFlat('object', '');
                // console.log('empty')
                // console.log(object_menu_items)
                // console.log(object_menu_items.length)
                // console.log(Number(object));
            } else {
                // console.log('not empty')
            }
            setObject_menu_items(
                new_menu
            )
        }
    }, [category])

    if (loading) {
        return <></>
    }
    // if (!window) {
    //     return <></>
    // }


    // const getter = (name) => {
    //     return useObjectFormState((state) => state.flat[name])
    // }

    const save = async () => {
        setSaveError(false);
        // console.log(headers());

        // console.log(flat_data);
        let data = new FormData();
        // Object.keys(flat_data).forEach((key) => data.append('flat[' + key + ']', flat_data[key]));
        // for (var key in flat) {
        //     data.append('flat[' + key + ']', flat[key]);
        // }
        data.append('flat', JSON.stringify(flat_data));
        // const result = await fetch('/api/object/save');

        try {
            await fetch('/api/object/save', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.result) {
                        goBack()
                    }
                })
            // setImages_disabled(false);
        } catch (e) {
            setSaveError(true);
            setSaveErrorMessage('Что-то пошло не так');

            // console
        }

    }


    const goBack = () => {
        if (leadId > 0) {
            router.push('/lead-card?lead_id=' + leadId)
        } else if (flat.lead_id > 0) {
            router.push('/lead-card?lead_id=' + flat.lead_id)

        } else {
            router.back()
        }
    }

    return (<>
        <Stack spacing={2}>

            <MyRadioGroup

                items={formData.deal_type}
                title={"Тип сделки"}
                name={"deal_type"}
                value={flat.deal_type}
            // getter={getter}
            // setter={updateFlat}

            />

            {flat.deal_type !== null && (
                <>
                    <MyRadioGroup

                        items={formData.category}
                        title={"Категория"}
                        name={"category"}
                    // value={flat.category}
                    // getter={getter}
                    // setter={updateFlat}

                    />
                    {flat.category !== null && (

                        <MySelect
                            items={object_menu_items}
                            // value={object}
                            title={"Объект"}
                            name={'object'}
                        // setter={updateFlat}
                        // getter={getter}
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

            }}>


                <Address
                    // setter={updateFlat}
                    flat={flat}
                // address={flat.address }
                />
            </YMaps >



            {Number(category) === 2 && (
                <MyTextInput
                    name={'kpName'}
                    // value={flat.kpName}
                    // setter={updateFlat}
                    title={'Название коттеджного посёлка'}
                    width={500}
                />
            )}


            {Number(category) === 3 && (
                <MyTextInput
                    name={'buildingName'}
                    // value={flat.buildingName}
                    // setter={updateFlat}
                    title={'Название здания'}
                    width={500}
                />
            )}
            <Divider />
            {/* 
            <Metro
                flat={flat}
                form_data={form_data}
                getter={getter}
                setter={updateFlat}
            />

            <Divider />
            <Highways
                flat={flat}
                form_data={form_data}
                getter={getter}
                setter={updateFlat}
            /> */}

            {Number(category) === 1 && (
                <FlatSale
                    flat={flat}
                    // getter={getter}
                    // setter={updateFlat}
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
                // getter={getter}
                // setter={updateFlat}
                />
            )}

            {Number(category) === 3 && (
                <Commercial
                    flat_object={object}
                    flat={flat}
                    form_data={formData}
                // getter={getter}
                // setter={updateFlat}
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

            {window !== undefined && (
                <Description
                    flat={flat}
                // setter={updateFlat}
                // getter={getter}
                />
            )}



            <MyDivider
                title={"Фото/Видео"}

            />
            <MyTextInput
                name={'video'}
                // value={flat.buildingName}
                // setter={updateFlat}
                title={'Видео'}
                width={500}
            />

            <Images
                // className="mb-10"
                setter={addImages}
            // getter={getter}
            />
            <MyDivider
                title={"Условия"}

            />
            <Price
                deal_type={deal_type}
                form_data={formData}
            />


            <Stack
                className="mt-10"
                direction={'row'}
                spacing={3}
            >
                <Button
                    onClick={save}
                    variant="contained"
                // color="success"
                >
                    Сохранить

                </Button>

                <Button
                    onClick={
                        goBack
                    }
                    variant="contained"
                    color="error"
                >
                    Отмена

                </Button>
            </Stack>

        </Stack >
    </>);
}


// export default ObjectFormZustand;
export default dynamic(() => Promise.resolve(ObjectFormZustand), { ssr: false })