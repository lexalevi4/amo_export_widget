'use client'
import { Box, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { useState } from "react";
// import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


function ObjectCard({ object, formData }) {
    const [visible, setVisible] = useState(true);
    const [expanded, setExpanded] = useState(false);

    let images = ['no_photo.jpg'];
    if (object.images.active.length > 0) {
        images = object.images.active;
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDelete = async () => {
        if (window.confirm('Удалить объект?')) {
            setVisible(false)
            await fetch('/api/object/delete?id=' + object.id);
        }

    }
    console.log(images);

    const createHeader = () => {
        let header = '';
        if (Number(object.category) === 1) {
            if (Number(object.object) === 1) {
                header += object.rooms + "-комн. "
                header += object.totalArea + '/' + object.livingArea + '/' + object.kitchenArea + ' '
                header += object.floor + '/' + object.floorsCount + ' эт. '

            }

        }
        return header;

    }
    const header = createHeader();



    return (<>



        <Card
            className="my-5"
            style={{
                display: !visible ? 'none' : ''
            }}
        >
            {/* <CardHeader
                title={header}
            // subheader={object.price}

            >
           
            </CardHeader> */}
            <CardContent>
                <Stack
                    direction={'row'}
                    spacing={2}
                >
                    <Box
                        style={
                            {
                                width: 300
                            }
                        }
                    >
                        <Carousel

                            infiniteLoop={true}
                            showThumbs={false}
                            emulateTouch={true}
                            renderThumbs={() => (
                                images.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={'https://tb-widget-images.storage.yandexcloud.net/thumb/' + image}
                                        alt="piece"
                                        width="0"
                                        height="0"
                                        sizes="80"
                                        style={{ width: '100%', height: 'auto', maxHeight: 80, maxWidth: 80 }}

                                    />
                                )))}
                            // renderThumbs={}
                            statusFormatter={(currentItem, total) => { return currentItem + ' из ' + total }}
                        >
                            {images.map((image) => {
                                return (
                                    <div key={'image_' + object.id + '_' + image}>
                                        <Image
                                            src={'https://tb-widget-images.storage.yandexcloud.net/mid/' + image}
                                            alt={image}
                                            width="0"
                                            height="0"
                                            sizes="300"
                                            style={{ width: '100%', height: 'auto', maxHeight: 300, maxWidth: 300 }}
                                        />

                                    </div>
                                )
                            })}
                        </Carousel>


                    </Box>
                    <Box
                    // style={
                    //     {
                    //         width: 300
                    //     }
                    // }
                    >
                        <Stack spacing={2}
                            className="text-left"
                        >
                            <Typography
                                variant="h5"
                            >
                                {header}

                            </Typography>
                            <Typography>
                                {object.address}
                            </Typography>
                            {object.metro.length > 0 && (
                                <Typography>
                                    {object.metro.map((metro, station_index) => {

                                        let station = formData.metro.filter(item => item.id === metro.id)[0];
                                        return (

                                            <span key={'metro_string' + object.id + "_" + station_index}>
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

                            {object.highways.length > 0 && (
                                <Typography>
                                    {object.highways.map((highway, highway_index) => {

                                        let current_higway = formData.highway.filter(item => item.id === highway.id)[0];
                                        return (

                                            <span key={'highways' + object.id + "_" + highway_index}>
                                                {current_higway.name} {' шоссе '}
                                                {highway.distance} км.
                                                <br />
                                            </span>

                                        )
                                    })}

                                </Typography>
                            )}

                            <Typography variant="h6" component="p">
                                <Typography variant="h6" component="span">
                                    {Intl.NumberFormat('ru-RU', {
                                        style: 'currency',
                                        currency: 'RUB',
                                        currencyDisplay: 'symbol', maximumFractionDigits: 0
                                    }).format(object.price)}
                                </Typography>
                                {object.totalArea > 0 && (
                                    <>

                                        <Typography variant="h6" component="span" color="text.secondary">
                                            {' (' +
                                                Intl.NumberFormat('ru-RU', {
                                                    style: 'currency',
                                                    currency: 'RUB',
                                                    currencyDisplay: 'symbol', maximumFractionDigits: 0
                                                }).format(
                                                    Math.round(object.price / object.totalArea))
                                            } / m<sup>2</sup>{')'}
                                        </Typography>
                                    </>

                                )}

                            </Typography>

                            {/* <Typography
                                variant="h6"
                            >
                                {Number(object.price).toLocaleString()} {Number(object.totalArea) > 0 && (
                                    '(' +
                                    Math.ceil((Number(object.price) / Number(object.totalArea))).toLocaleString()
                                    +
                                    ' за квадрат)'
                                )}
                            </Typography> */}


                        </Stack>



                    </Box>
                </Stack>

                {/* <Typography>{object.address}</Typography> */}
            </CardContent>
            <CardActions disableSpacing>
                <Link
                    prefetch={false}
                    href={'/objects/update?id=' + object.id}
                >
                    <IconButton aria-label="update" title="Редактировать">
                        <EditIcon
                            color="primary"
                        />
                    </IconButton>
                </Link>
                <IconButton aria-label="delete" title="Удалить"
                    onClick={handleDelete}
                >
                    <DeleteIcon

                        color="error"
                    />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>

                    <div dangerouslySetInnerHTML={{ __html: object.description }} />
                </CardContent>
            </Collapse>
        </Card >
    </>);
}

export default ObjectCard;