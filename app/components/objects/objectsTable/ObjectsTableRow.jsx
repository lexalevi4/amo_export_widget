'use client'
import { Box, Button, Chip, Collapse, Grid, IconButton, Rating, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Images from "./Images";
import { Map, Placemark, RulerControl, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import { printMetro, secToStr } from "@/app/heplers/tableHelper";
import PriceAnalizeTabs from "./PriceAnalizeTabs";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ObjectsTableRow({ flat, formData, isFilter, filterId = 0, setObjectStatus, isLeadCard }) {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    // console.log(flat.images)
    // console.log(flat.description)

    const handleFilterStatusChange = (e) => {
        setObjectStatus(flat.id, filterId, Number(e.target.dataset.onclickparam));
        setVisible(false);

    }
    const handleDelete = async () => {
        if (window.confirm('Удалить объект?')) {
            setVisible(false)
            await fetch('/api/object/delete?id=' + flat.id);
        }

    }

    const printObject = () => {
        if (flat.category === 1) {
            if (Number(flat.object) === 1) {
                if (Number(flat.rooms) === 200) {
                    return 'Студия';
                }
                if (Number(flat.rooms) === 100) {
                    return 'Св. планировка'
                }
                return flat.rooms + "-комн."

            }

        }
        let current_obj = formData.object.filter(item => {
            // console.log(item.id)
            // console.log(flat.object)
            return Number(item.id) === Number(flat.object)
        })
        // console.log(current_obj)


        try {
            return current_obj[0].name
        } catch (e) {
            return "";
        }

    }

    const printMaterial = () => {
        let current_material = formData.material.filter(item => {
            return Number(item.id) === Number(flat.material)
        })
        // console.log(current_material);

        return current_material[0]?.name || ''
    }

    if (!visible) {
        return (<></>)
    }

    const getPriceRating = (val) => {
        if (val === 1) {
            return 5
        }
        if (val === 2) {
            return 4
        }
        if (val === 3) {
            return 3
        }
        if (val === 4) {
            return 2
        }
        if (val === 5) {
            return 1
        }
    }

    return (<>

        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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

            {/* <TableCell>{flat.id}</TableCell> */}
            <TableCell align="left">
                <Typography className="mb-3">
                    {printObject()}
                </Typography>
                <Typography>
                    {flat.address}
                </Typography>

                {/* {flat.metro_distances.length > 0 && (
                    <>
                        {
                            flat.metro_distances.map((metro, station_index) => {
                                let station = formData.metro.filter(item => Number(item.id) === Number(metro.id))[0];
                                return (
                                    <Chip
                                        key={'metro_chip_' + flat.id + "_" + station_index}
                                        label={station.metro}
                                    >asdf</Chip>
                                )
                            }
                            )
                        }
                    </>
                )} */}

                {flat.metro_distances.length > 0 && (




                    <TableContainer
                        className="mt-3"
                    // style={{
                    //     maxWidth: 500
                    // }}
                    >
                        <Table
                            style={{
                                width: 'max-content'
                            }}
                            size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            minWidth: 170
                                        }}
                                    // width={100}
                                    >Метро</TableCell>
                                    <TableCell>🦶</TableCell>
                                    <TableCell>🚗</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {flat.metro_distances.map((metro, station_index) => {


                                    let station = formData.metro.filter(item => Number(item.id) === Number(metro.id))[0];
                                    // console.log(station);
                                    // console.log(metro);
                                    return (
                                        <TableRow key={'metro_row' + flat.id + "_" + station_index}>
                                            <TableCell
                                                style={{
                                                    maxWidth: 100
                                                }}
                                                width={100}
                                            >
                                                {station.colors.map(function (color, index) {
                                                    // name = item.metro
                                                    return (<span key={station_index + '_metro_' + index} style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
                                                })}
                                                {station.metro}
                                            </TableCell>
                                            <TableCell>{secToStr(metro.foot)}</TableCell>
                                            <TableCell>{secToStr(metro.car)}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                {flat.highway_distances.length > 0 && (

                    <TableContainer
                        className="mt-3"
                    // style={{
                    //     maxWidth: 500
                    // }}
                    >
                        <Table
                            style={{
                                width: 'max-content'
                            }}
                            size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            minWidth: 170
                                        }}
                                    // width={100}
                                    >Шоссе</TableCell>

                                    <TableCell>🚗 до МКАД</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {flat.highway_distances.map((highway, highway_index) => {


                                    let current_highway = formData.highway.filter(item => Number(item.id) === Number(highway.id))[0];
                                    // console.log(station);
                                    // console.log(metro);
                                    return (
                                        <TableRow key={'highway_row' + flat.id + "_" + highway_index}>
                                            <TableCell
                                                style={{
                                                    maxWidth: 100
                                                }}
                                                width={100}
                                            >

                                                {current_highway.name}
                                            </TableCell>
                                            <TableCell>{(highway.distance / 1000).toFixed(1)} км.</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>


                )}
            </TableCell>
            <TableCell align="left">
                <Typography>
                    {flat.totalArea}/{flat.livingArea}/{flat.kitchenArea}


                </Typography>
                <Typography>
                    {flat.floor}/{flat.floorsCount}{ }
                </Typography>
                <Typography>
                    {flat.material && (
                        <>
                            {printMaterial()}
                        </>
                    )}
                </Typography>


            </TableCell>

            <TableCell align="right">



                <Typography >
                    {Intl.NumberFormat('ru-RU', {
                        style: 'currency',
                        currency: 'RUB',
                        currencyDisplay: 'symbol', maximumFractionDigits: 0
                    }).format(flat.price)}
                </Typography>
                {flat.totalArea > 0 && (
                    <>
                        <Typography color="text.secondary">
                            {' ' +
                                Intl.NumberFormat('ru-RU', {
                                    style: 'currency',
                                    currency: 'RUB',
                                    currencyDisplay: 'symbol', maximumFractionDigits: 0
                                }).format(
                                    Math.round(flat.price / flat.totalArea))
                            } / m<sup>2</sup>
                        </Typography>
                    </>
                )}
                {flat.price_type > 0 && (
                    <Rating value={(flat.price_type - 6) * -1} size="small" readOnly />
                )}




                {/* {flat.price} */}

            </TableCell>
            <TableCell align="right">
                {isLeadCard && (
                    <>
                        <a
                            // prefetch={false}
                            href={'/objects/update?id=' + flat.id}
                        >
                            <IconButton aria-label="update" title="Редактировать">
                                <EditIcon
                                    color="primary"
                                />
                            </IconButton>
                        </a>
                        <IconButton aria-label="delete" title="Удалить"
                            onClick={handleDelete}
                        >
                            <DeleteIcon

                                color="error"
                            />
                        </IconButton>
                    </>
                )}
                {!isLeadCard && (
                    <a
                        href={flat.link}
                        target="_blank"
                    >
                        Ссылка
                    </a>
                )}

            </TableCell>
        </TableRow>
        {isFilter && (
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Grid
                        className="my-5 py-3"
                        container
                    >

                        <Grid item
                            className="mx-2"
                        >
                            <Button
                                onClick={handleFilterStatusChange}
                                color="primary"
                                variant="contained"
                                data-onclickparam={1}
                            >Да</Button>
                        </Grid>
                        <Grid item
                            className="mx-2"
                        >
                            <Button
                                onClick={handleFilterStatusChange}
                                data-onclickparam={2}
                                color="error"
                                variant="contained"
                            >Нет</Button>
                        </Grid>
                        <Grid item
                            className="mx-2"
                        >
                            <Button
                                onClick={handleFilterStatusChange}
                                color="warning"
                                data-onclickparam={3}
                                variant="contained"
                            >Не знаю</Button>
                        </Grid>


                    </Grid>
                </TableCell>
            </TableRow>

        )}

        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box

                    >
                        {/* <Box
                            style={{ width: '100%' }}
                        > */}


                        {/* </Box> */}
                        <Table size="small" aria-label="purchases">
                            {/* <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Total price ($)</TableCell>
                                </TableRow>
                            </TableHead> */}
                            <TableBody>
                                <TableRow

                                >
                                    <TableCell
                                        colSpan={2}
                                        width={'100%'}
                                    >
                                        {flat?.positions?.price?.district?.length > 0 && flat?.districts.length > 0 && (
                                            <PriceAnalizeTabs
                                                flat={flat}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>

                                <TableRow >
                                    <TableCell width={'60%'} scope="row"
                                        style={{
                                            verticalAlign: "top"
                                        }}
                                    >
                                        <Images
                                            images={flat.list_images}
                                        />
                                        <Typography
                                            dangerouslySetInnerHTML={{ __html: flat.description }}
                                            style={{
                                                whiteSpace: 'pre-line'
                                            }}
                                        // className="pre-line"
                                        >
                                            {/* {flat.lead_id > 0 ? "" : flat.description} */}

                                            {/* {flat.description} */}
                                        </Typography>
                                        {/* {flat.list_images.map(image => {
                                            return (<>
                                                <Box key={'images' + flat.id}>
                                                    <Typography>{image.thumb}</Typography>
                                                    <Typography>{image.mid}</Typography>
                                                    <Typography>{image.full}</Typography>

                                                </Box>
                                            </>)
                                        })} */}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            verticalAlign: "top"
                                        }}
                                        width={'40%'}>

                                        <YMaps>
                                            <div
                                                style={{
                                                    width: '100%',
                                                    height: 520
                                                }}
                                            >

                                                <Map width={'100%'} height={500} defaultState={{ center: [flat.lat, flat.lng], zoom: 16 }} >
                                                    <Placemark geometry={[flat.lat, flat.lng]} />
                                                    <ZoomControl options={{ float: "right" }} />
                                                    <RulerControl options={{ float: "right" }} />

                                                </Map>
                                            </div>


                                        </YMaps>
                                    </TableCell>

                                </TableRow>

                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>

    </>);
}

export default ObjectsTableRow;