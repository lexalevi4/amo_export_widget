'use client'
import { Box, Collapse, Stack, Switch, TableCell, TableRow, Typography, IconButton, Grid, Button } from "@mui/material";
import { useClientsState } from "../store";
import Link from "next/link";
import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoadingTb from "@/app/components/Loading";
import ObjectsTable from "@/app/components/objects/objectsTable/ObjectsTable";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useObjectSearchFormState } from "@/app/objects/store";

function FiltersTableRow({ filter, formData }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(filter.active === 1);
    const [filterData, setFilterData] = useState(JSON.parse(filter.filter));
    const [deleted, setDeleted] = useState(false);
    // const [currentFilter, setCurrentFilter] = useState(JSON.parse(filter.filter))
    // console.log(filter);
    // console.log(filter.totalCount);
    const setState = useClientsState((state) => state.setState)
    const filterUpdated = useClientsState((state) => state.filterUpdated)
    const currentFilterId = useClientsState((state) => state.currentFilterId)


    const [objects, setObjects] = useState([]);
    const [objectsIsLoading, setObjectsIsLoading] = useState(true)
    const [status, setStatus] = useState(0);
    const [page, setPage] = useState(1);

    const [unsorted, setUnsorted] = useState(filter.count.filter((item => item.status === 0))[0]?.count || 0)
    const [yes, setYes] = useState(filter.count.filter((item => item.status === 1))[0]?.count || 0)
    const [no, setNo] = useState(filter.count.filter((item => item.status === 2))[0]?.count || 0)
    const [soso, setSoso] = useState(filter.count.filter((item => item.status === 3))[0]?.count || 0)




    // const editModalIsOpen = useClientsState((state) => state.editModalIsOpen);

    const setClientState = useClientsState((state) => state.setState);
    const currentFilter = useClientsState((state) => state.currentFilter);

    // const defaultSearch = useObjectSearchFormState((state) => state.defaultSearch);
    const setSearch = useObjectSearchFormState((state) => state.setSearch);

    const handleEditOpen = () => {
        // console.log(filterData);
        // let field = get().search[name].slice(0);
        let data = {};
        Object.assign(data, filterData);
        setSearch(data);
        setClientState('editModalIsOpen', true);
        setClientState('currentFilterId', filter.id);
    }

    // useEffect(() => {
    //     console.log(currentFilter)
    // }, [currentFilter])


    useEffect(() => {

        if (filterUpdated === 1) {
            if (currentFilterId === filter.id) {
                setOpen(false);
                console.log(currentFilter);
                // try {
                setFilterData(JSON.parse(currentFilter.filter_data));
                console.log(currentFilter);

                setUnsorted(currentFilter.filter_counts.count.filter((item => item.status === 0))[0]?.count || 0);
                setYes(currentFilter.filter_counts.count.filter((item => item.status === 1))[0]?.count || 0);
                setNo(currentFilter.filter_counts.count.filter((item => item.status === 2))[0]?.count || 0);
                setSoso(currentFilter.filter_counts.count.filter((item => item.status === 3))[0]?.count || 0);

                setState('filterUpdated', 0);
                // } catch (e) {

                // }


            }
        }

    }, [filterUpdated])

    const getObjects = async () => {
        setObjectsIsLoading(true);
        try {
            const objects = await fetch('/api/client/get-filtered-objects?id=' + filter.id + '&status=' + status + '&page=' + page);
            const res = await objects.json();
            console.log(res)
            if (res.status === 'ok') {
                setObjects(res.objects);
                setObjectsIsLoading(false);
            } else {
                console.log('error')
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(objects)

    }, [objects])

    useEffect(() => {
        if (open) {
            getObjects()
        }
    }, [open, status, page])

    const showModal = (name) => {
        if (name === 'metro') {
            setState('metro', { metro: filterData.metro, brunches: filterData.brunches })
            setState('metroIsOpen', true)
        }

        if (name === 'districts') {
            setState('districts', { districts: filterData.districts, okrugs: filterData.okrugs })
            setState('districtsIsOpen', true)
        }
        if (name === 'highways') {
            setState('highways', filterData.highways)
            setState('highwaysIsOpen', true)
        }
        if (name === 'polygons') {
            setState('polygons', filterData.polygons)
            setState('polygonsIsOpen', true)
        }
        if (name === 'addrobjs') {
            setState('addrobjs', filterData.addrobjs)
            setState('addrobjsIsOpen', true)
        }

    }

    const printSingleFormDataValue = (name, id) => {
        let currentItem = formData[name].filter((item) => {
            return Number(item.id) === Number(id);
        })
        return currentItem[0]?.name || ''
    }

    const printFilterObjects = () => {

        if (Number(filterData.category) === 1) {
            if (filterData.rooms.length === 0) {
                return 'Все'
            } else {
                return filterData.rooms.map(item => {
                    return (
                        <Typography
                            key={'rooms' + filter.id + '_' + item}
                        >
                            {printSingleFormDataValue('rooms_search', item)}
                        </Typography>
                    )
                })
            }
        } else {
            if (filterData.object.length === 0) {
                return 'Все'
            } else {
                return filterData.object.map(item => {
                    return (
                        <Typography
                            key={'object' + filter.id + '_' + item}
                        >
                            {printSingleFormDataValue('object', item)}
                        </Typography>
                    )
                })
            }
        }

    }
    const printDiffFilters = (filters) => {

        let result = [];
        filters.map(filter => {
            let text = '';
            if (filter.data[0] > 0) {
                text = text + 'от ' + filter.data[0]
            }
            if (filter.data[1] > 0) {
                text = text + ' до ' + filter.data[1]
            }
            if (text !== '') {
                result.push({ name: filter.name, value: text })
            }

            return true;
        })

        return result.map(item => {
            return (
                <Typography
                    key={'row' + filter.id + '_' + item.name}
                >
                    <span className="font-bold">{item.name}</span><br />
                    {item.value}
                </Typography>
            )
        })

    }


    const handleActive = async () => {
        setActive(!active);
        await fetch('/api/client/filter-active?id=' + filter.id)
    }

    const handleDelete = async () => {
        if (window.confirm('удалить?')) {
            await fetch('/api/client/delete-filter?id=' + filter.id)
            setDeleted(true);
        }
    }



    const setObjectStatus = (objectId, filterId, newStatus) => {

        if (status === 0) {
            setUnsorted(unsorted - 1)
        }
        if (status === 1) {
            setYes(yes - 1)
        }
        if (status === 2) {
            setNo(no - 1)
        }
        if (status === 3) {
            setSoso(soso - 1)
        }
        if (newStatus === 1) {
            setYes(yes + 1)
        }
        if (newStatus === 2) {
            setNo(no + 1)
        }
        if (newStatus === 3) {
            setSoso(soso + 1)
        }
        fetch('/api/client/set-filtered-object-status?objectId=' + objectId + '&filterId=' + filterId + '&status=' + newStatus)

        // console.log(id, filterId, status)
        // setVisible(false)

    }


    const handleChangeFilterStatus = (e) => {
        let newStatus = Number(e.target.dataset.onclickparam);
        if (newStatus === status) {
            getObjects()

        } else {
            setStatus(newStatus)
        }

    }


    if (deleted) {
        return (<>
        </>)

    }

    return (<>
        <TableRow
            className="align-top"
        >
            <TableCell>
                <Stack

                >
                    <IconButton
                        className="mb-3"
                        aria-label="expand row"
                        size="small"
                    // onClick={() => setOpen(!open)}
                    >
                        <FavoriteBorderIcon />
                    </IconButton>

                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Stack>
            </TableCell>
            <TableCell>
                <Switch
                    checked={active}
                    onChange={handleActive}
                />
                <IconButton aria-label="update"
                    onClick={handleEditOpen}
                    title="Редактировать">
                    <EditIcon
                        color="primary"
                    />
                </IconButton>

                <IconButton aria-label="delete" title="Удалить"
                    onClick={handleDelete}
                >
                    <DeleteIcon

                        color="error"
                    />
                </IconButton>

                <Typography
                    className="font-bold mb-3"
                >
                    {filter.name}
                </Typography>

                {unsorted > 0 && (
                    <Typography
                    >
                        Неразобранное: {unsorted}
                    </Typography>
                )}
                {yes > 0 && (
                    <Typography
                    >
                        Да: {yes}
                    </Typography>
                )}
                {no > 0 && (
                    <Typography
                    >
                        Нет: {no}
                    </Typography>
                )}
                {soso > 0 && (
                    <Typography
                    >
                        Не знаю: {soso}
                    </Typography>
                )}

            </TableCell>
            <TableCell>
                {/* {filter.filter} */}
                <Typography>
                    {printSingleFormDataValue('deal_type', filterData.deal_type)}
                </Typography>
                <Typography>
                    {printSingleFormDataValue('category', filterData.category)}
                </Typography>
                <Typography>
                    {printSingleFormDataValue('cluster', filterData.cluster)}
                </Typography>
            </TableCell>

            <TableCell>
                {printFilterObjects()}
            </TableCell>

            <TableCell>
                <Typography>
                    <Link
                        href={'javascript:void(0)'}
                        onClick={() => showModal('addrobjs')}
                    >
                        Адреса: {filterData.addrobjs.length}
                    </Link>
                </Typography>
                <Typography>
                    <Link
                        href={'javascript:void(0)'}
                        onClick={() => showModal('metro')}
                    >
                        Метро: {filterData.metro.length}
                    </Link>
                </Typography>
                <Typography>
                    <Link
                        href={'javascript:void(0)'}
                        onClick={() => showModal('districts')}
                    >
                        Районы: {filterData.districts.length}
                    </Link>
                </Typography>
                <Typography>
                    <Link
                        href={'javascript:void(0)'}
                        onClick={() => showModal('highways')}
                    >
                        Шоссе: {filterData.highways.length}
                    </Link>
                </Typography>
                <Typography>
                    <Link
                        href={'javascript:void(0)'}
                        onClick={() => showModal('polygons')}
                    >
                        Область на карте: {filterData.polygons.length}
                    </Link>
                </Typography>
            </TableCell>
            <TableCell>
                {printDiffFilters([
                    { name: 'Цена', data: [filterData.minPrice, filterData.maxPrice,] },
                    { name: 'Площадь', data: [filterData.minTotalArea, filterData.maxTotalArea,] },
                    { name: 'Жилая', data: [filterData.minLivingArea, filterData.maxLivingArea,] },
                    { name: 'Кухня', data: [filterData.minKitchenArea, filterData.maxKitchenArea,] },
                    { name: 'Участок', data: [filterData.minLandArea, filterData.maxLandArea,] },
                ])}
            </TableCell>
            <TableCell>
                {printDiffFilters([
                    { name: 'Этаж', data: [filterData.minFloor, filterData.maxFloor,] },
                    { name: 'Этажность', data: [filterData.minFloorsCount, filterData.maxFloorsCount,] },
                ])}
            </TableCell>
            {/* <TableCell>
                
            </TableCell> */}
        </TableRow >
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>

                        <Grid
                            className="my-5 py-3"
                            container
                        >
                            <Grid item
                                className="mx-2"
                            >
                                <Button
                                    disabled={objectsIsLoading}
                                    color="inherit"
                                    variant={status === 0 ? "contained" : 'outlined'}
                                    data-onclickparam={0}
                                    onClick={handleChangeFilterStatus}
                                >
                                    Неразобранное {unsorted > 0 && (' [' + unsorted + ']')}
                                </Button>
                            </Grid>
                            <Grid item
                                className="mx-2"
                            >
                                <Button
                                    disabled={objectsIsLoading}
                                    color="success"

                                    variant={status === 1 ? "contained" : 'outlined'}
                                    data-onclickparam={1}
                                    onClick={handleChangeFilterStatus}
                                >
                                    Да
                                    {yes > 0 && (' [' + yes + ']')}
                                </Button>
                            </Grid>
                            <Grid item
                                className="mx-2"
                            >
                                <Button
                                    disabled={objectsIsLoading}
                                    color="error"
                                    variant={status === 2 ? "contained" : 'outlined'}
                                    data-onclickparam={2}
                                    onClick={handleChangeFilterStatus}
                                >
                                    Нет
                                    {no > 0 && (' [' + no + ']')}
                                </Button>
                            </Grid>
                            <Grid item
                                className="mx-2"
                            >
                                <Button
                                    disabled={objectsIsLoading}
                                    color="warning"
                                    variant={status === 3 ? "contained" : 'outlined'}
                                    data-onclickparam={3}
                                    onClick={handleChangeFilterStatus}
                                >
                                    Не знаю
                                    {soso > 0 && (' [' + soso + ']')}
                                </Button>
                            </Grid>


                        </Grid>


                        <ObjectsTable
                            formData={formData}
                            objects={objects}
                            isLoading={objectsIsLoading}
                            isFilter={true}
                            filterId={filter.id}
                            setObjectStatus={setObjectStatus}
                        />

                    </Box>
                </Collapse>

            </TableCell>

        </TableRow>
    </>);
}

export default FiltersTableRow;