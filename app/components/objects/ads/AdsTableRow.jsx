import { Button, FormControlLabel, Grid, IconButton, Stack, Switch, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdForm from "./AdForm";
import { useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
function AdsTableRow({ ad, formData, object, feeds, setAds, updateActive }) {

    const [showForm, setShowForm] = useState(false)
    const [activeFeeds, setActiveFeeds] = useState(ad.activeFeeds)
    const [startDate, setStartDate] = useState(ad.start_date)
    const [endDate, setEndDate] = useState(ad.end_date)
    const [active, setActive] = useState(Boolean(ad.active))
    const [delDisabled, setDelDisabled] = useState(false)
    const [showFull, setShowFull] = useState(false);


    const handleShowFull = () => {
        setShowFull(!showFull)
    }

    // console.log(ad);

    const handleShowForm = () => {
        setShowForm(!showForm)
    }
    const updateData = (data) => {
        setActiveFeeds(data.activeFeeds);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
    }
    const handleActive = () => {
        fetch('/api/export/set-active?id=' + ad.id)
        setActive(!active);
        updateActive(ad.id)
    }

    const handleDelete = async () => {
        if (window.confirm('Удалить объявление?')) {
            setDelDisabled(true);
            await fetch('/api/export/delete?id=' + ad.id).then(res => res.json())
                .then(data => {
                    setAds(data);
                    console.log(data)
                })
        }
    }

    // const adStatuses = {
    // "1":"Опубликовано",
    // "1":"Опубликовано",

    // };

    return (<>
        <TableRow key={'ad_' + ad.id}>
            <TableCell>
                <Switch
                    onChange={handleActive}
                    checked={active}
                />
                <IconButton aria-label="update"
                    onClick={handleShowForm}
                    title="Редактировать">
                    <EditIcon
                        color="primary"
                    />
                </IconButton>

                {/* <IconButton aria-label="delete" title="Удалить"
                    onClick={handleDelete}
                    disabled={delDisabled}
                >
                    <DeleteIcon

                        color="error"
                    />
                </IconButton> */}
            </TableCell>
            <TableCell>

                <Typography
                // color={'error'}
                >
                    Id: {ad.id}
                </Typography>
                <Typography
                // color={'error'}
                >
                    Создано: {ad.created_at}
                </Typography>
                {startDate && endDate && startDate > endDate && (
                    <Typography
                        color={'error'}
                    >
                        Дата начала позже даты конца
                    </Typography>
                )}
                <Typography>
                    {startDate > 0 && (
                        <>Старт - {dayjs(startDate * 1000).format('DD/MM/YYYY HH:mm')}</>
                    )}
                    {endDate > 0 && startDate * 1000 > Date.now() && (
                        <>
                            <br />
                            публикация не началась
                        </>
                    )}

                </Typography>
                <Typography>
                    {endDate > 0 && (
                        <>Конец - {dayjs(endDate * 1000).format('DD/MM/YYYY HH:mm')}</>
                    )}
                    {endDate > 0 && endDate * 1000 < Date.now() && (
                        <>
                            <br />
                            публикация завершена
                        </>
                    )}
                </Typography>
            </TableCell>
            <TableCell>

                <Grid
                    className="mt-3"
                    container
                    direction={'row'}
                    spacing={2}
                >
                    {feeds.map((feed, feed_index) => {
                        const feed_status = ad.statuses.filter(status => {
                            return status.id === feed.id
                        })[0]
                        const feedActive = activeFeeds.includes(feed.id);
                        let color = 'primary'
                        if (feed_status.status == 1) {
                            color = 'success'
                        }
                        if (feed_status.status > 1) {
                            color = 'error'
                        }

                        return (
                            <FormControlLabel
                                key={'feed__short_grid_item_' + ad.id + '_' + object.id + '_' + feed.id}
                                labelPlacement="start"

                                control={
                                    <Switch
                                        value={feed.id}
                                        color={color}
                                        onClick={handleShowFull}
                                        // name={name}
                                        // id={name + "switch"}
                                        checked={feedActive}
                                    // onClick={handler}
                                    // onChange={handleFeedActive}
                                    />
                                } label={feed.name} />
                        )
                    })}

                </Grid>
                <Button
                    onClick={handleShowFull}
                >
                    {showFull ? "Свернуть" : 'Подробнее'}
                </Button>
                {/*                 
                <Grid
                    container
                    // direction={'row'}
                    spacing={2}
                >
                    <Grid
                        item
                    > */}
                {showFull && (
                    <TableContainer>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Доска
                                </TableCell>
                                <TableCell>
                                    Статус
                                </TableCell>
                                <TableCell>
                                    Сообщение
                                </TableCell>
                                <TableCell>
                                    Ссылка
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>


                            {feeds.map((feed, feed_index) => {
                                const feed_status = ad.statuses.filter(status => {
                                    return status.id === feed.id
                                })[0]
                                const feedActive = activeFeeds.includes(feed.id);
                                return (
                                    <TableRow
                                        key={'feed_grid_item_' + ad.id + '_' + object.id + '_' + feed.id}
                                    >
                                        <TableCell>
                                            <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        value={feed.id}

                                                        // name={name}
                                                        // id={name + "switch"}
                                                        checked={feedActive}
                                                    // onClick={handler}
                                                    // onChange={handleFeedActive}
                                                    />
                                                } label={feed.name} />
                                        </TableCell>
                                        <TableCell>
                                            {feedActive && (
                                                <>
                                                    {/* {feed_status.status === 0 && (
                                                        "Нет"
                                                    )} */}
                                                    {feed_status.status === 1 && (
                                                        <Typography
                                                            color={'green'}
                                                        >
                                                            Опубликовано

                                                        </Typography>

                                                    )}
                                                    {feed_status.status > 1 && (
                                                        <Typography
                                                            color={'error'}
                                                        >
                                                            Ошибка/Предупреждение
                                                        </Typography>
                                                    )}
                                                </>
                                            )}

                                        </TableCell>
                                        <TableCell
                                            className="whitespace-pre-line"
                                        >
                                            {feed_status.message}
                                        </TableCell>
                                        <TableCell>
                                            {(feedActive && feed_status.url && feed_status.url !== '') && (
                                                <Link
                                                    href={feed_status.url}
                                                    target="_blank"
                                                >
                                                    Ссылка
                                                </Link>

                                            )}

                                        </TableCell>



                                        {/* <Grid
                                            key={'feed_grid_item_' + ad.id + '_' + object.id + '_' + feed.id}
                                            item
                                        >




                                        </Grid> */}
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </TableContainer>
                )}

                {/* </Grid>
                    <Grid
                        item>


                    </Grid>
                </Grid> */}

            </TableCell>

        </TableRow >

        <TableRow>
            <TableCell
                colSpan={3}
            >
                {showForm && (
                    <AdForm
                        setAds={setAds}
                        feeds={feeds}
                        formData={formData}
                        object={object}
                        ad={ad}
                        handleShowForm={handleShowForm}
                        updateData={updateData}


                    />
                )}

            </TableCell>
        </TableRow>
        {!showForm && (
            <TableRow
            >
                <TableCell colSpan={2}>
                    <Button
                        onClick={handleShowForm}
                        variant="contained"
                    >
                        Редактировать это объявление
                    </Button>
                </TableCell>

            </TableRow>
        )}

    </>);
}

export default AdsTableRow;