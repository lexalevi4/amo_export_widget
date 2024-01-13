import { Button, DialogActions, DialogTitle, Modal, ModalClose, ModalDialog, Sheet, Stack } from "@mui/joy";
import BaseFormSelect from "./BaseFormSelect";
import { useEffect, useState } from "react";
import { useObjectSearchFormState } from "@/app/objects/store";
import BaseFormTextInput from "./BaseFormTextInput";

function BaseFormModal({ isOpen, setIsOpen }) {
    const [object_menu_items, setObject_menu_items] = useState([]);

    const category = useObjectSearchFormState((state) => state.search.category);
    const object = useObjectSearchFormState((state) => state.search.object);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const formData = useObjectSearchFormState((state) => state.formData);

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
        } else {
            setObject_menu_items(
                []
            )
            // setSearchParam('object', [])
            // setSearchParam('rooms', [])
        }
        if (category !== 1) {
            // setSearchParam('rooms', [])
        }
    }, [category])

    return (<>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}

        >
            <ModalDialog

            >
                <ModalClose />
                <DialogTitle>Фильтр</DialogTitle>
                <Sheet
                    sx={{
                        minHeight: 500
                    }}
                >

                    <Stack
                        direction={'row'}
                        spacing={2}
                        className='mt-2'
                    >
                        <BaseFormSelect
                            dropable={true}
                            name={'deal_type'}
                            label="Тип сделки"
                        />

                        <BaseFormSelect
                            dropable={true}
                            name={'category'}
                            label="Категория"
                        />

                    </Stack>
                    {Number(category) > 0 && (
                        <>


                            <Stack
                                className='mt-2'
                                direction={'row'}
                                spacing={2}
                            >
                                <BaseFormSelect
                                    dropable={true}
                                    name={'object'}
                                    label="Объект"
                                    items={object_menu_items}
                                    multiple={true}
                                />

                                {(object.includes(1) || object.includes('1')) && (
                                    <BaseFormSelect
                                        dropable={true}
                                        name={'rooms'}
                                        label="Комнат"
                                        items={formData.rooms_search.filter(item => item.id !== 99)}
                                        multiple={true}
                                    />
                                )}

                            </Stack>
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
                    <Stack
                        className='mt-2'
                        direction={'row'}
                        spacing={2}
                    >

                        <BaseFormTextInput
                            name={'minPrice'}
                            label="Цена от"
                        />

                        <BaseFormTextInput
                            name={'maxPrice'}
                            label="До"
                        />


                    </Stack>

                </Sheet>
                <DialogActions>
                    <Button variant="solid" color="primary"
                    // onClick={() => setOpen(false)}
                    >
                        Искать
                    </Button>
                    <Button variant="plain" color="danger"
                    // onClick={() => setOpen(false)}
                    >
                        Сбросить
                    </Button>
                </DialogActions>
            </ModalDialog>
        </Modal>
    </>);
}

export default BaseFormModal;