import { Box, Button, DialogActions, DialogTitle, Divider, FormLabel, Modal, ModalClose, ModalDialog, Sheet, Stack, Typography } from "@mui/joy";
import BaseFormSelect from "./BaseFormSelect";
import { useEffect, useState } from "react";
import { useObjectSearchFormState } from "@/app/objects/store";
import BaseFormTextInput from "./BaseFormTextInput";

function BaseFormModal({ isOpen, setIsOpen }) {
    const [object_menu_items, setObject_menu_items] = useState([]);
    const [material_menu_items, setMaterial_menu_items] = useState([]);

    const category = useObjectSearchFormState((state) => state.search.category);
    const object = useObjectSearchFormState((state) => state.search.object);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const formData = useObjectSearchFormState((state) => state.formData);
    const updateActiveSearch = useObjectSearchFormState((state) => state.updateActiveSearch);
    const resetSearch = useObjectSearchFormState((state) => state.resetSearch);

    // setActiveSearch(search);

    const handleSearch = ()=>{
        updateActiveSearch()
        setIsOpen(false);

    }

    useEffect(() => {

        if (Number(category) > 0) {


            const new_menu = formData.object.filter((item) => {
                return Number(item.category) === Number(category)
            });


            const new_materials = formData.material.filter((item) => {
                console.log(item);
                if (Number(category) === 1) {
                    return (Number(item.main) === 1)
                }
                if (Number(category) === 2) {
                    return (Number(item.suburban) === 1)
                }
                if (Number(category) === 3) {
                    return (Number(item.commercial) === 1)
                }

            });
            console.log(new_materials);

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

            setMaterial_menu_items(new_materials)

            setObject_menu_items(new_menu)
        } else {
            setObject_menu_items([])
            setMaterial_menu_items([])
            // setSearchParam('object', [])
            // setSearchParam('rooms', [])
        }
        if (category !== 1) {
            // setSearchParam('rooms', [])
        }
    }, [category])

    return (<>

        <Modal

            open={isOpen} onClose={() => setIsOpen(false)}

        >
            <ModalDialog
                sx={{
                    width: 640
                }}

            >
                <ModalClose />
                <DialogTitle>Фильтр</DialogTitle>
                <Sheet
                    className='pr-4 pb-8'
                    sx={{
                        minHeight: 500,
                        maxHeight: '50svh',
                        overflowY: 'auto'
                    }}
                >

                  
                    {Number(category) > 0 && (
                        <>



                            {(object.includes(1) || object.includes('1')) && (
                                <Stack
                                    className='mt-2'
                                    direction={'row'}
                                    spacing={2}
                                >
                                    <BaseFormSelect
                                        name={'isNewBuilding'}
                                        label="Готовность"
                                    />

                                    <BaseFormSelect
                                        name={'isApartments'}
                                        label="Апартменты"
                                    />


                                </Stack>
                            )}



                        </>

                    )}
                 
                    <Divider
                        className='my-2'
                    />
                    <Typography
                        className='mt-3'

                    >
                        Площадь
                    </Typography>

                    {Number(category) !== 1 && (
                        <Stack
                            className='mt-2'
                            direction={'row'}
                            spacing={2}
                        >

                            <BaseFormTextInput
                                type="number"
                                name={'minLandArea'}
                                label="Участок от"
                            />

                            <BaseFormTextInput
                                type="number"
                                name={'maxLandArea'}
                                label="До"
                            />


                        </Stack>

                    )}

                    <Stack
                        className='mt-2'
                        direction={'row'}
                        spacing={2}
                    >

                        <BaseFormTextInput
                            type="number"
                            name={'minTotalArea'}
                            label="Общая от"
                        />

                        <BaseFormTextInput
                            type="number"
                            name={'maxTotalArea'}
                            label="До"
                        />



                    </Stack>


                    {Number(category) === 1 && (
                        <>
                            <Stack
                                className='mt-2'
                                direction={'row'}
                                spacing={2}
                            >

                                <BaseFormTextInput
                                    type="number"
                                    name={'minLivingArea'}
                                    label="Жилая от"
                                />

                                <BaseFormTextInput
                                    type="number"
                                    name={'maxLivingArea'}
                                    label="До"
                                />


                            </Stack>
                            <Stack
                                className='mt-2'
                                direction={'row'}
                                spacing={2}
                            >

                                <BaseFormTextInput
                                    type="number"
                                    name={'minKitchenArea'}
                                    label="Кухня от"
                                />

                                <BaseFormTextInput
                                    type="number"
                                    name={'maxKitchenArea'}
                                    label="До"
                                />


                            </Stack>
                        </>
                    )}

                    <Divider
                        className='my-2'
                    />
                    <Typography
                        className='mt-3'

                    >
                        Здание
                    </Typography>
                    {Number(category) !== 2 && (
                        <Stack
                            className='mt-2'
                            direction={'row'}
                            spacing={2}
                        >

                            <BaseFormTextInput
                                type="number"
                                name={'minFloor'}
                                label="Этаж от"
                            />

                            <BaseFormTextInput
                                type="number"
                                name={'maxFloor'}
                                label="До"
                            />

                        </Stack>
                    )}

                    <Stack
                        className='mt-2'
                        direction={'row'}
                        spacing={2}
                    >

                        <BaseFormTextInput
                            type="number"
                            name={'minFloorsCount'}
                            label="Этажность от"
                        />

                        <BaseFormTextInput
                            type="number"
                            name={'maxFloorsCount'}
                            label="До"
                        />



                    </Stack>
                    {/* <Divider
                        className='my-2'
                    /> */}

                    <BaseFormSelect
                        dropable={true}
                        name={'material'}
                        label="Материал"
                        items={material_menu_items}
                        multiple={true}
                    />
                    <Stack
                        className='mt-2'
                        direction={'row'}
                        spacing={2}
                    >

                        <BaseFormTextInput
                            type="number"
                            name={'minBuildYear'}
                            label="Год постройки от"
                        />

                        <BaseFormTextInput
                            type="number"
                            name={'maxBuildYear'}
                            label="До"
                        />



                    </Stack>



                </Sheet>

                <DialogActions>
                    <Button variant="solid" color="primary"
                    onClick={handleSearch}
                    >
                        Искать
                    </Button>
                    <Button variant="plain" color="danger"
                    onClick={resetSearch}
                    >
                        Сбросить
                    </Button>
                </DialogActions>
            </ModalDialog >
        </Modal >
    </>);
}

export default BaseFormModal;