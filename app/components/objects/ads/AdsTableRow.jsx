import { FormControlLabel, Grid, IconButton, Stack, Switch, TableCell, TableRow, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdForm from "./AdForm";
import { useState } from "react";
import dayjs from "dayjs";
function AdsTableRow({ ad, formData, object, feeds, setAds }) {

    const [showForm, setShowForm] = useState(false)
    const [activeFeeds, setActiveFeeds] = useState(ad.activeFeeds)
    const [startDate, setStartDate] = useState(ad.start_date)
    const [endDate, setEndDate] = useState(ad.end_date)
    const [active, setActive] = useState(Boolean(ad.active))
    const [delDisabled, setDelDisabled] = useState(false)

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
        fetch('/api/ad/set-active?id=' + ad.id)
        setActive(!active);
    }

    const handleDelete = async () => {
        if (window.confirm('Удалить объявление?')) {
            setDelDisabled(true);
            await fetch('/api/ad/delete?id=' + ad.id).then(res => res.json())
                .then(data => {
                    setAds(data);
                    console.log(data)
                })
        }
    }

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

                <IconButton aria-label="delete" title="Удалить"
                    onClick={handleDelete}
                    disabled={delDisabled}
                >
                    <DeleteIcon

                        color="error"
                    />
                </IconButton>
            </TableCell>
            <TableCell>
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
                    container
                    // direction={'row'}
                    spacing={2}
                >
                    {feeds.map((feed, feed_index) => {
                        return (
                            <Grid
                                key={'feed_grid_item_' + ad.id + '_' + object.id + '_' + feed.id}
                                item
                            >

                                <FormControlLabel
                                    labelPlacement="start"
                                    control={
                                        <Switch
                                            value={feed.id}

                                            // name={name}
                                            // id={name + "switch"}
                                            checked={activeFeeds.includes(feed.id)}
                                        // onClick={handler}
                                        // onChange={handleFeedActive}
                                        />
                                    } label={feed.name} />


                            </Grid>
                        )
                    })}
                </Grid>

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
    </>);
}

export default AdsTableRow;