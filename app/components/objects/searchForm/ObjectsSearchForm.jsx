'use client'

import { useObjectSearchFormState } from "@/app/objects/store";
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { serialize } from '@/app/heplers/clientHelpers'
import SearchRadioGroup from "./formComponents/SearchRadioGroup";
import SearchSelect from "./formComponents/SearchSelect";



function ObjectsSearchForm({ formData }) {
    const params = useSearchParams();


    const setFormData = useObjectSearchFormState((state) => state.setFormData);
    const loading = useObjectSearchFormState((state) => state.loading);
    const category = useObjectSearchFormState((state) => state.search.category)
    const object = useObjectSearchFormState((state) => state.search.object)
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam)
    const search = useObjectSearchFormState((state) => state.search)

    const [object_menu_items, setObject_menu_items] = useState([]);


    useEffect(() => {
        setFormData(formData);
        params.forEach((value, key) => {


        })
    }, [])


    useEffect(() => {

        if (Number(category) > 0) {
            const new_menu = formData.object.filter((item) => {
                return Number(item.category) === Number(category)
            });
            // const filtered = new_menu.filter(item => {
            //     return item.id === Number(object);
            // })
            // if (filtered.length === 0) {
            //     // updateSearch('object', '');
            //     // console.log('empty')
            //     // console.log(object_menu_items)
            //     // console.log(object_menu_items.length)
            //     // console.log(Number(object));
            // } else {
            //     // console.log('not empty')
            // }
            setObject_menu_items(
                new_menu
            )
        }
    }, [category])


    if (loading) {
        return (<></>)
    }




    return (<>
        <h1>Форма</h1>
        <Stack
            spacing={2}
        >
            <SearchRadioGroup
                items={formData.category}
                name={'category'}
                title={'Категория'}
            />

            {category !== '' && (
                <SearchSelect
                    items={object_menu_items}
                    required={false}
                    multiple={true}
                    name={'object'}
                    title={'Объект'}
                // width={}

                />
            )}


        </Stack>


        <Link
            href={'/objects?' + serialize(search)}
            replace
            prefetch={false}
            
        >
            <Button
                className="mt-10"
                variant="contained"
            >
                Искать
            </Button>
        </Link>

    </>);
}

export default ObjectsSearchForm;