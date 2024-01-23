// import MyTextInput from "@/app/components/objects/form/MyTextInput";
import { sortByName } from "@/app/heplers/heplers";
import { useAccountState } from "@/app/store/account/accountStore";
import { Autocomplete, Avatar, Box, Button, ButtonGroup, Chip, CircularProgress, FormControl, FormLabel, Grid, IconButton, Input, List, ListDivider, ListItem, ListItemDecorator, Option, Select, Stack, Typography } from "@mui/joy";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import OrderSelector from "./OrderSelector";
import { CloseRounded } from "@mui/icons-material";
import { useObjectSearchFormState } from "@/app/objects/store";
import BaseFormSelect from "./FormComponents/BaseFormSelect";
import BaseFormModal from "./FormComponents/BaseFormModal";
import BaseFormTextInput from "./FormComponents/BaseFormTextInput";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { addressSuggest } from "@/app/services/actions";
import { debounce } from '@mui/material/utils';
import Addrobjs from "@/app/components/objects/searchForm/formComponents/Addrobjs";
import BaseMetroModal from "./FormComponents/BaseMetroModal";


function BaseSearchForm({ isParser }) {

    const [object_menu_items, setObject_menu_items] = useState([]);
    const users = useAccountState((state) => state.users);
    const groups = useAccountState((state) => state.groups);
    const pipelines = useAccountState((state) => state.pipelines);
    const statuses = useAccountState((state) => state.statuses);
    const session = useAccountState((state) => state.session);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const category = useObjectSearchFormState((state) => state.search.category);
    const object = useObjectSearchFormState((state) => state.search.object);
    const addrobjs = useObjectSearchFormState((state) => state.search.addrobjs);
    const selectedUsers = useObjectSearchFormState((state) => state.search.users);
    const cluster = useObjectSearchFormState((state) => state.search.cluster);
    const setActiveSearch = useObjectSearchFormState((state) => state.setActiveSearch);
    const resetSearch = useObjectSearchFormState((state) => state.resetSearch);
    const search = useObjectSearchFormState((state) => state.search);
    const formData = useObjectSearchFormState((state) => state.formData);

    const setSearchState = useObjectSearchFormState((state) => state.setState);

    const region = useObjectSearchFormState((state) => state.search.region);

    const formMetro = useObjectSearchFormState((state) => state.metro);
    const formDistricts = useObjectSearchFormState((state) => state.districts);

    const [formIsOpen, setFormIsOpen] = useState(false);
    const [districtsIsOpen, setDistrictsIsOpen] = useState(false);
    const [metroIsOpen, setMetroIsOpen] = useState(false);

    const objectsIsLoading = useObjectSearchFormState((state) => state.objectsIsLoading);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);

    const [addrOptions, setAddrOptions] = useState([]);
    const [addrValue, setAddrValue] = useState([]);
    const [addrQuery, setAddrQuery] = useState('');
    const [locations, setLocations] = useState([]);
    const [addrIsLoading, setAddrIsLoading] = useState(false);



    const action = useRef(null);



    useEffect(() => {
        setAddrIsLoading(false);
    }, [addrOptions])

    useEffect(() => {
        if (Number(region) > 0) {
            let new_metro = formData.metro.filter(item => Number(item.region) === Number(region));
            let newDistrits = formData.districts.filter(item => Number(item.region) === Number(region))
            let newLocations = formData.region_value.filter(item => Number(item.id) === Number(region))[0]?.value || []
            console.log(formData.districts);
            setSearchState('metro', new_metro);
            setSearchState('districts', newDistrits);
            setLocations(newLocations)
        }else{
            setSearchState('metro', []);
            setSearchState('districts', []);
            setLocations([])
        }
    }, [region])

    useEffect(() => {
        console.log(formMetro)
        console.log(formDistricts)

    }, [formMetro, formDistricts])


    const groupsForSelect = [];


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



            setObject_menu_items(new_menu)
        } else {
            setObject_menu_items([])

            // setSearchParam('object', [])
            // setSearchParam('rooms', [])
        }
        if (category !== 1) {
            // setSearchParam('rooms', [])
        }
    }, [category])

    // useEffect(() => {
    //     console.log(value);
    // }, [value])
    groups.sort((a, b) => sortByName(a, b, 'name')).map((group) => {
        const currentGroupUsers = users.filter(user => user.group_id === group.amo_group_id)
        if (currentGroupUsers.length > 0) {
            groupsForSelect.push({
                id: group.amo_group_id,
                name: group.name,
                users: currentGroupUsers.sort((a, b) => sortByName(a, b, 'name'))
            })
        }
        return true;
    })
    // console.log(groupsForSelect);

    const selectGroup = (group) => {
        // console.log('qq')
        // console.log(group);
        // const currentGroupUsers = users.filter(user => user.group_id === group.amo_group_id)
        // console.log(currentGroupUsers)
        const newValue = selectedUsers.slice(0);
        // console.log(newValue)
        group.users.map(user => {
            if (!newValue.includes(user.amo_user_id)) {
                newValue.push(user.amo_user_id);
            }
            return true;
        })
        setSearchParam('users', newValue)
        // setValue(newValue);
        // if (value.includes())
    }

    const searchHandler = () => {
        setActiveSearch(search);
    }


    // const getAddressSuggest = async ()=>{
    //     const res = await addressSuggest(addrQuery, locations);
    //     console.log(res)
    //     return res;

    // }

    const getAddressSuggest = useMemo(
        () =>
            debounce(async (q, request_locations) => {
                setAddrIsLoading(true);
                const res = await addressSuggest(q, request_locations);
                setAddrOptions(res)

            }, 400),
        [],
    );

    useEffect(() => {
        // console.log(addrQuery)
        if (addrQuery.length > 3) {
            getAddressSuggest(addrQuery, locations)
        }
        if (addrQuery === '') {
            setAddrOptions([]);
        }

    }, [addrQuery])

    const addressHandler = (event, newInputValue) => {
        setAddrQuery(newInputValue);

    }
    const addressChangeHandler = (event, newValue) => {
        // console.log(newValue);
        // setAddrValue(newValue);
        const new_value = newValue[0].value + ':' + newValue[0].label;
        // console.log(newValue);
        updateMultyField('addrobjs', new_value);

    }

    return (<>

        {isParser && (
            <>
                <Stack
                    // sx={{
                    //     width: '100%'
                    // }}
                    direction={'row'}
                    className='mt-5'
                    spacing={2}
                    container
                // className='align-middle'
                >
                    <BaseFormSelect
                        width={200}
                        name={'region'}
                        label="Регион"


                    />

                    <FormControl
                    // sx={{
                    //     width: '100%'
                    // }}
                    >
                        <FormLabel>Адрес</FormLabel>
                        <Autocomplete
                            loading={addrIsLoading}
                            loadingText={'Загрузка...'}
                            value={addrValue}
                            clearOnBlur
                            disabledItemsFocusable
                            blurOnSelect={false}
                            // clearText=""
                            multiple={true}
                            onInputChange={addressHandler}
                            onChange={addressChangeHandler}

                            disableClearable={true}
                            options={addrOptions}
                            sx={{
                                width: 650
                            }}
                            freeSolo={true}
                            size="sm"
                            endDecorator={<>
                                {/* {addrIsLoading && ( <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />)} */}
                                <Button variant="plain" size="sm"
                                    onClick={() => { setMetroIsOpen(true) }}
                                >
                                    Метро
                                </Button>
                                <Button size="sm" variant="plain">Район</Button>
                                <Button size="sm" variant="plain">Регион</Button>
                            </>}

                        />
                    </FormControl>

                </Stack>
                <Addrobjs
                />

            </>
        )}
        {!isParser && (
            <Stack
                direction={'row'}
                className='mt-5'
                spacing={2}
                container
            // className='align-middle'
            >
                <Grid

                >

                    <BaseFormTextInput
                        type="number"
                        name={'id'}
                        label="ID"
                    />

                    {/* <MyTextInput
                    name={'id'}
                    title={"ID"}
                    type="number"
                /> */}

                </Grid>


                <FormControl>
                    <FormLabel>Пользователь</FormLabel>
                    <Stack
                        spacing={2}
                        direction={'row'}
                    >
                        <ButtonGroup
                            color="primary"
                            orientation="horizontal"
                        // size="sm"
                        >
                            <Button
                                variant={Number(cluster) === 1 ? 'solid' : 'outlined'}
                                onClick={() => setSearchParam('cluster', 1)}
                            >
                                Мои
                            </Button>
                            <Button
                                variant={Number(cluster) === 2 ? 'solid' : 'outlined'}
                                onClick={() => setSearchParam('cluster', 2)}
                            >
                                Все
                            </Button>

                            {/* <IconButton /> */}
                        </ButtonGroup>



                    </Stack>
                </FormControl>
                {Number(cluster) === 2 && (
                    <>
                        <FormControl>
                            <FormLabel>Выбрать</FormLabel>
                            <Select
                                value={selectedUsers}
                                onChange={(e, newValue) => setSearchParam('users', newValue)}
                                multiple
                                slotProps={{
                                    listbox: {
                                        sx: {
                                            '--ListItemDecorator-size': '44px',
                                        },
                                    },
                                }}
                                sx={{
                                    '--ListItemDecorator-size': '44px',
                                    minWidth: 350,
                                    maxWidth: 350,
                                    // height: 30

                                }}



                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', gap: '0.25rem' }}>
                                        <Grid container>
                                            {selected.map((selectedOption) => (
                                                <Grid
                                                    key={'chip_' + selectedOption.value}
                                                >
                                                    <Chip variant="soft"
                                                        color="primary"

                                                    >
                                                        {selectedOption.label}
                                                    </Chip>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}
                                {...(selectedUsers.length > 0 && {
                                    endDecorator: (
                                        <IconButton
                                            size="sm"
                                            variant="plain"
                                            color="neutral"
                                            onMouseDown={(event) => {
                                                event.stopPropagation();
                                            }}
                                            onClick={() => {
                                                setSearchParam('users', [])

                                                action.current?.focusVisible();
                                            }}
                                        >
                                            <CloseRounded />
                                        </IconButton>
                                    ),
                                    indicator: null,
                                })}
                            >
                                {groupsForSelect.map((group, index) => {
                                    return (
                                        <React.Fragment key={'group_' + group.id}>
                                            {index !== 0 && <ListDivider role="none" />}
                                            <List
                                                aria-labelledby={`select-group-${group.name}`}
                                                sx={{ '--ListItemDecorator-size': '28px' }}
                                            >
                                                <ListItem id={`select-group-${group.name}`}

                                                    sticky
                                                >
                                                    <Typography level="body-xs"
                                                        onClick={() => selectGroup(group)}
                                                    >
                                                        {group.name} ({group.users.length})
                                                    </Typography>
                                                </ListItem>
                                                {group.users.map((user, userIndex) => {
                                                    return (
                                                        <Option
                                                            key={'user_option_' + user.amo_user_id}
                                                            value={user.amo_user_id} label={user.name}>
                                                            <ListItemDecorator
                                                                className='mr-1'
                                                            >
                                                                <Avatar size="sm" src={"https://tb-widget-images.storage.yandexcloud.net/thumb/" + user.image} />
                                                            </ListItemDecorator>
                                                            {user.name}
                                                        </Option>
                                                    )
                                                })}
                                            </List>

                                        </React.Fragment>
                                    )
                                })}

                            </Select>
                        </FormControl>
                    </>
                )}
                <BaseFormSelect
                    name={'status'}
                    multiple={false}
                    label="Статус"
                />
            </Stack>
        )}

        <Stack
            direction={'row'}
            spacing={2}
            className='mt-2 mb-5'
        >

            <BaseFormSelect
                width={150}
                dropable={!isParser}
                name={'deal_type'}
                label="Тип сделки"
            />

            <BaseFormSelect
                width={200}
                dropable={!isParser}
                name={'category'}
                label="Категория"
            />

            {Number(category) === 1 && (
                <BaseFormSelect
                    dropable={true}
                    // width={250}
                    name={'rooms'}
                    label="Объект"
                    items={formData.rooms_search}
                    multiple={true}
                />
            )}

            {Number(category) > 1 && (
                <>


                    <BaseFormSelect
                        dropable={true}
                        name={'object'}
                        label="Объект"
                        items={object_menu_items}
                        multiple={true}
                    />


                </>
            )}
            <BaseFormTextInput
                width={150}
                type="number"
                name={'minPrice'}
                label="Цена от"
            />

            <BaseFormTextInput
                width={150}
                type="number"
                name={'maxPrice'}
                label="До"
            />
        </Stack >

        <Stack
            direction={'row'}
            className="mb-4"
        >

            <Button

                variant="outlined"
                color="neutral"
                startDecorator={<FilterAltOutlined />}
                onClick={() => setFormIsOpen(true)}
            >
                Ещё фильтры
            </Button>
            <Button
                // startDecorator={<RestartAltIcon />}
                className="ml-2"
                variant="plain" color="danger"
                onClick={resetSearch}
            >
                Сбросить
            </Button>

        </Stack>

        <Stack
            className='my-2'
            useFlexGap
            direction="row"
            spacing={{ xs: 0, sm: 2 }}
            justifyContent={{ xs: 'space-between' }}
            flexWrap="wrap"
            sx={{ minWidth: 0 }}
        >
            <Button

                disabled={objectsIsLoading}
                onClick={searchHandler}
            >
                Искать
            </Button>
            {/* <OrderSelector /> */}

        </Stack>
        <BaseFormModal
            isOpen={formIsOpen}
            setIsOpen={setFormIsOpen}
        />
        <BaseMetroModal
            isOpen={metroIsOpen}
            setIsOpen={setMetroIsOpen}
        />



    </>);
}

export default BaseSearchForm;