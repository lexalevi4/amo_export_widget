import { AppBar, Button, Dialog, FormLabel, Paper, Stack, Toolbar, Typography } from "@mui/material";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import { useObjectSearchFormState } from "@/app/objects/store";
import SearchButtonsGroup from "../searchForm/formComponents/SearchButtonsGroup";
import { useEffect, useState } from "react";
import SearchRadioGroup from "../searchForm/formComponents/SearchRadioGroup";
import DualTextField from "../searchForm/formComponents/DualTextField";
import SearchTextField from "../searchForm/formComponents/SearchTextField";
import MetroModal from "../searchForm/formComponents/MetroModal";
import DistrictsModal from "../searchForm/formComponents/DistrictsModal";
function MobileForm({ isOpen, handleClose, formData }) {


    const search = useObjectSearchFormState((state) => state.search)
    const activeSearch = useObjectSearchFormState((state) => state.activeSearch);
    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const setObjectsIsLoading = useObjectSearchFormState((state) => state.setObjectsIsLoading);

    const setSearch = useObjectSearchFormState((state) => state.setSearch);

    const metro = useObjectSearchFormState((state) => state.search.metro);
    // const polygons = useObjectSearchFormState((state) => state.search.polygons);
    const districts = useObjectSearchFormState((state) => state.search.districts);
    const okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    // const highways = useObjectSearchFormState((state) => state.search.highways);

    const [metroOpen, setMetroOpen] = useState(false);
    const [districtsOpen, setDistrictsOpen] = useState(false);

    useEffect(() => {



    }, [])
    const updateSearch = () => {
        setActiveSearch(search)
        handleClose()
    }

    return (<>

        <Dialog
            // className="mx-3"
            // style={{

            // }}
            // maxWidth={'xl'}
            fullScreen
            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={handleClose}
        >

            <Paper
                className="p-2 m-2"
            >


                <SearchButtonsGroup
                    items={formData.rooms_search.filter(item => { return item.id !== 99 })}
                    name={'rooms'}
                    title={'Комнат'}
                />
                {/* <SearchRadioGroup
                    items={formData.isNewBuilding}
                    name={'isNewBuilding'}
                    title={'Готовность'}
                /> */}

                <SearchRadioGroup
                    items={formData.isByHomeowner}
                    name={'isByHomeowner'}
                    title={'Автор'}
                />


                <SearchRadioGroup
                    items={formData.isApartments}
                    name={'isApartments'}
                    title={'Статус'}
                />

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

                <SearchButtonsGroup
                    items={formData.price_type}
                    name={'price_type'}
                    title={'Тип цены'}
                />

                <Button
                    // className="mb-2"
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


                <SearchButtonsGroup
                    items={formData.to_metro_by}
                    name={'to_metro_by'}
                    arrayValue={false}

                    title={''}
                />

                <SearchTextField
                    name='to_metro'
                    title={'До метро минут max'}
                    size="small"
                />
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
                <Stack
                    direction={'row'}
                    spacing={2}
                >
                    <Stack>
                        <FormLabel>Этаж</FormLabel>
                        <DualTextField
                            name1={'minFloor'}
                            name2={'maxFloor'}
                            title1={'от'}
                            title2={'до'}
                        />
                    </Stack>
                    <Stack>
                        <FormLabel>Этажность</FormLabel>
                        <DualTextField
                            name1={'minFloorsCount'}
                            name2={'maxFloorsCount'}
                            title1={'от'}
                            title2={'до'}
                        />
                    </Stack>
                </Stack>
                <FormLabel>Площадь</FormLabel>
                <Stack
                    direction={'row'}
                    spacing={1}
                >
                    <Stack>
                        <FormLabel>Общая</FormLabel>
                        <DualTextField
                            spacing={0}
                            name1={'minTotalArea'}
                            name2={'maxTotalArea'}
                            title1={'от'}
                            title2={'до'}
                        />
                    </Stack>
                    <Stack>
                        <FormLabel>Жилая</FormLabel>
                        <DualTextField
                            spacing={0}
                            name1={'minLivingArea'}
                            name2={'maxLivingArea'}
                            title1={'от'}
                            title2={'до'}
                        />
                    </Stack>
                    <Stack>
                        <FormLabel>Кухня</FormLabel>
                        <DualTextField
                            spacing={0}
                            name1={'minKitchenArea'}
                            name2={'maxKitchenArea'}
                            title1={'от'}
                            title2={'до'}
                        />

                    </Stack>
                </Stack>









            </Paper >

            <AppBar position="fixed" color="primary" sx={{ bottom: 0, top: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >

                    <Button
                        onClick={handleClose}
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        // onClick={dropDistricts}
                        color="error"
                    >
                        Отмена

                    </Button>
                    <Button
                        onClick={updateSearch}
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        // onClick={dropDistricts}
                        color="success"
                    >
                        Сохранить

                    </Button>



                </Toolbar>
            </AppBar>
            <MetroModal
                topDiff={-18}
                isOpen={metroOpen}
                handleClose={() => setMetroOpen(false)}
            />
            <DistrictsModal
                isOpen={districtsOpen}
                setIsOpen={setDistrictsOpen}
            />
        </Dialog >

    </>);
}

export default MobileForm;