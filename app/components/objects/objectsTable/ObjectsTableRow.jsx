'use client'
import { Box, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Images from "./Images";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";


function ObjectsTableRow({ flat, formData }) {
    const [open, setOpen] = useState(false);
    // console.log(flat.images)
    // console.log(flat.description)

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
            console.log(item.id)
            console.log(flat.object)
            return Number(item.id) === Number(flat.object)
        })
        // console.log(current_obj)

        return current_obj[0].name

    }

    const printMaterial = () => {
        let current_material = formData.material.filter(item => {
            return Number(item.id) === Number(flat.material)
        })
        console.log(current_material);

        return current_material[0]?.name || ''
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
                {flat.metro.length > 0 && (
                    <Typography>
                        {flat.metro.map((metro, station_index) => {

                            let station = formData.metro.filter(item => item.id === metro.id)[0];
                            return (

                                <span key={'metro_string' + flat.id + "_" + station_index}>
                                    {station.colors.map(function (color, index) {
                                        // name = item.metro
                                        return (<span key={station_index + '_metro_' + index} style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
                                    })}
                                    {station.metro} {' '}
                                    {metro.to_metro} мин. {Number(metro.to_metro_by) === 1 ? "пешком" : 'транспортом'}
                                    <br />
                                </span>

                            )
                        })}

                    </Typography>
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
            
            <TableCell align="right">{flat.price}</TableCell>
            <TableCell align="right">
                <a
                    href={flat.link}
                    target="_blank"
                >
                    Ссылка
                </a>
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
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
                                            style={{
                                                whiteSpace: 'pre-line'
                                            }}
                                        // className="pre-line"
                                        >
                                            {/* dangerouslySetInnerHTML={{ __html: nl2br(flat.description) }} */}
                                            {flat.description}
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