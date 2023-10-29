import {
    Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    ImageList, ImageListItem, Menu, MenuItem, Rating, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography
} from "@mui/material";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { useState } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ExploreIcon from '@mui/icons-material/Explore';
import LaunchIcon from '@mui/icons-material/Launch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { red } from '@mui/material/colors';
import { secToStr } from "@/app/heplers/tableHelper";
import ObjectParamsTable from "./ObjectParamsTable";
import { Placemark, RulerControl, YMaps, ZoomControl, Map } from "@pbe/react-yandex-maps";
import ObjectCardImages from "./ObjectCardImages";
import PriceAnalizeTabs from "../objectsTable/PriceAnalizeTabs";
// import { TabList, TabPanel } from "@mui/joy";
function ObjectCard({ object, formData }) {

    console.log(formData)

    const [anchorEl, setAnchorEl] = useState(null);


    const [assessment, setAssessment] = useState(null)

    const links_open = Boolean(anchorEl);
    const handleLinksClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLinksClose = () => {
        setAnchorEl(null);
    };

    const [available, setAvailable] = useState(true);
    const [isFav, setIsFav] = useState(false);


    const [delOpen, setDelOpen] = useState(false);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }
    // const handleOpenSnackbar = () => {
    //     setSnackbarOpen(true);
    // }

    const [mapOpen, setMapOpen] = useState(false);

    const [gallery_modal_open, SetGalleryModalOpen] = useState(false);

    const handleGalleryModal = () => {
        SetGalleryModalOpen(!gallery_modal_open)
    }


    const handleDelClose = () => {
        setDelOpen(false);
    };
    const mapState = {
        center: [object.lat, object.lng],
        zoom: 14,
    };


    const labels = {
        5: 'Высокая',
        4: 'Выше среднего',
        3: 'Средняя',
        2: 'Ниже среднего',
        1: 'Дно рынка',
    };


    const getHeader = () => {

        var header = '';

        if (object.rooms === 200) {
            header = 'Студия'
        }
        else if (object.rooms > 3) {
            header = '4+к'
        } else {
            header = object.rooms + "к"
        }
        if (object.districts.length > 0) {
            let okrug_id = object.districts.filter(d => d.type === 'Okrug')[0];
            let district_id = object.districts.filter(d => d.type !== 'Okrug')[0];

            console.log(okrug_id)
            console.log(district_id)

            let okrug = formData.districts.filter(item => Number(item.id) === Number(okrug_id.id))[0]?.name || '';
            let district = formData.districts.filter(item => Number(item.id) === Number(district_id.id))[0]?.name || '';
            console.log(okrug)
            console.log(district)
            // return (
            //     <Chip
            //         key={'metro_chip_' + flat.id + "_" + station_index}
            //         label={station.metro}
            //     >asdf</Chip>
            // )
            header = header + ", " + okrug + ', ' + district;
        }

        // console.log(okrug.name)

        return header

    }

    const getRatingColor = (value) => {
        console.log(value);
        if (value === 5) {
            return red[100]
        }
        if (value === 4) {
            return red[200]
        }
        if (value === 3) {
            return red[300]
        }
        if (value === 2) {
            return red[500]
        }
        if (value === 1) {
            return red[900]
        }


    }

    const hideFlat = () => {

    }

    const handleFav = () => {

    }

    const openLink = () => {

    }
    const SendLinkToChat = () => {

    }

    const favContent = () => {
        if (isFav) {
            return (<><HeartBrokenIcon /> Удалить</>)
        } else {
            return (<><FavoriteBorderIcon /> Добавить</>)
        }

    };

    return (<>
        <Card className='mb-2  mt-4 pt-3'

        >
            <CardContent>
                {object.id}
                <ObjectCardImages
                    images={object.list_images}
                    objectId={object.id}
                />
                <Typography gutterBottom variant="h6" component="div">
                    {getHeader()}
                    <br />
                    <Button
                        onClick={() => setMapOpen(true)}
                        color='success'

                        className="px-0"
                        style={{
                            textTransform: 'none',
                            minWidth: '30px',
                            paddingBottom: '11px'

                        }}
                    >
                        <ExploreIcon size='8px' />
                    </Button>
                    {object.address}
                    {
                        (object.isApartments) && (<span> <br /> Апартаменты</span>)
                    }


                </Typography>
                <Typography variant="h6" component="p" className="my-4">
                    <Typography variant="h6" component="span">
                        {Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            currencyDisplay: 'symbol', maximumFractionDigits: 0
                        }).format(object.price)}
                    </Typography> /
                    <Typography variant="h6" component="span" color="text.secondary">
                        {' ' +
                            Intl.NumberFormat('ru-RU', {
                                style: 'currency',
                                currency: 'RUB',
                                currencyDisplay: 'symbol', maximumFractionDigits: 0
                            }).format(
                                Math.round(object.price / object.totalArea))
                        } / m<sup>2</sup>
                    </Typography>
                </Typography>

                {object.price_type > 0 && (
                    <Box
                        className='mb-3'

                        sx={{
                            width: 300,
                            display: 'flex',
                            alignItems: 'center',

                        }}
                    >
                        <Rating
                            name="text-feedback"

                            value={(object.price_type - 6) * (-1)}
                            readOnly
                            icon={<FavoriteIcon fontSize="inherit"
                                style={{
                                    color: getRatingColor(Number(object.price_type))
                                }}
                            />}

                            emptyIcon={<HeartBrokenIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Box sx={{ ml: 2 }}><Typography color="text.primary" >{labels[object.price_type]}</Typography></Box>

                    </Box>
                )}

                <Tabs
                    size="sm"
                    aria-label="Pricing plan"
                    defaultValue={0}

                    sx={(theme) => ({
                        // width: 343,
                        '--Tabs-gap': '0px',
                        borderRadius: 'lg',
                        boxShadow: 'sm',
                        overflow: 'hidden',
                        objectFit: "contain",
                        border: `1px solid ${theme.vars.palette.divider}`,
                    })}
                >
                    <TabList
                        style={{
                            // display:"flex",
                            // position:'absolute',
                            // overflow: "auto",
                            // width: '100%',
                            // maxWidth: 1000
                        }}
                        sx={{
                            '--ListItem-radius': '0px',
                            borderRadius: 0,
                            [`& .${tabClasses.root}`]: {
                                fontWeight: 'lg',
                                flex: 1,
                                bgcolor: 'background.body',
                                position: 'relative',
                                [`&.${tabClasses.selected}`]: {
                                    color: 'primary.500',
                                },
                                [`&.${tabClasses.selected}:before`]: {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    bottom: -1,
                                    width: '100%',
                                    height: 2,
                                    bgcolor: 'primary.400',
                                },
                                [`&.${tabClasses.focusVisible}`]: {
                                    outlineOffset: '-3px',
                                },
                            },
                        }}

                    >
                        <Tab>Локация</Tab>
                        <Tab>Параметры</Tab>
                        <Tab>Анализ</Tab>
                    </TabList>
                    <hr />
                    <TabPanel className='mb-3 p-0' value={0}
                        style={{
                            // display:"flex",
                            // position:'absolute',
                            overflow: "hidden",
                            // width: '100%',
                            // maxWidth: 1000
                        }}
                    >
                        {object.metro_distances.length > 0 && (
                            <>
                                <TableContainer
                                    style={{
                                        overflow: 'auto'
                                    }}
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
                                                        // minWidth: 150
                                                    }}
                                                // width={100}
                                                >Метро</TableCell>
                                                <TableCell>🦶</TableCell>
                                                <TableCell>🚗</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {object.metro_distances.map((metro, station_index) => {


                                                let station = formData.metro.filter(item => Number(item.id) === Number(metro.id))[0];
                                                // console.log(station);
                                                // console.log(metro);
                                                return (
                                                    <TableRow key={'metro_row' + object.id + "_" + station_index}>
                                                        <TableCell
                                                            style={{
                                                                whiteSpace: 'pre'
                                                                // maxWidth: 100
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
                            </>
                        )
                        }

                    </TabPanel>
                    <TabPanel className='mb-3  p-0' value={1}
                        style={{
                            // display:"flex",
                            // position:'absolute',
                            overflow: "hidden",
                            // width: '100%',
                            // maxWidth: 1000
                        }}
                    >
                        <ObjectParamsTable
                            formData={formData}
                            object={object}
                        />
                    </TabPanel>
                    <TabPanel className='mb-3 p-0' value={2}
                        style={{
                            // display:"flex",
                            // position:'absolute',
                            overflow: "hidden",
                            // width: '100%',
                            // maxWidth: 1000
                        }}
                    >
                        {object.positions.price.district.length > 0 && (
                            <PriceAnalizeTabs
                                maxContent={true}
                                flat={object}
                            />
                        )}

                    </TabPanel>




                </Tabs>








            </CardContent>

            <Stack className="my-4 flex " justifyContent={"center"} alignItems={'center'} direction="row" spacing={2}>
                <Button size="small"
                    id={'original_link_' + object.id}
                    color="primary"
                    variant="contained"
                    style={{
                        textTransform: 'none',
                    }}

                    aria-controls={links_open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={links_open ? 'true' : undefined}
                    onClick={handleLinksClick}


                >
                    <LaunchIcon />
                    Ссылка
                </Button>

                <Menu
                    id={'original_link_menu_' + object.id}
                    aria-labelledby={'original_link_' + object.id}
                    anchorEl={anchorEl}
                    open={links_open}
                    onClose={handleLinksClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={openLink}>Открыть в браузере</MenuItem>
                    <MenuItem onClick={SendLinkToChat}>Отправить в чат</MenuItem>

                </Menu>


                <Button size="small"
                    color={!isFav ? "success" : 'secondary'}
                    variant="outlined"
                    data-onclickparam={object.id}
                    onClick={handleFav}
                    style={{
                        textTransform: 'none',
                    }}
                >



                    {favContent()}
                </Button>
                <Button size="small"
                    onClick={() => setDelOpen(true)}
                    color="error"
                    variant="contained"
                    style={{
                        textTransform: 'none',
                    }}
                >
                    <DeleteForeverIcon />
                    Скрыть
                </Button>
            </Stack>


            <Dialog
                open={mapOpen}
                onClose={() => setMapOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className="p-0">
                    <YMaps>
                        <Map defaultState={mapState}
                            width={'80vw'}
                            height={'65vh'}

                        >
                            <Placemark geometry={[object.lat, object.lng]} />
                            <RulerControl options={{ float: "right" }} />
                            <ZoomControl options={{ size: "small", float: "right" }} />
                        </Map>
                    </YMaps>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMapOpen(false)} autoFocus>
                        Закрыть
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={delOpen}
                onClose={handleDelClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Добавить объект в чёрный список?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Он будет скрыт во всех будущих поисках.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideFlat} autoFocus>
                        Да
                    </Button>
                    <Button onClick={handleDelClose}>Нет</Button>
                </DialogActions>
            </Dialog>

        </Card>
    </>);
}

export default ObjectCard;