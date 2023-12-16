import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Collapse, Divider, FormControl, FormControlLabel, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useObjectFormState } from "@/app/objects/create/store";
import { DateTimePicker } from "@mui/x-date-pickers";
import { debounce } from '@mui/material/utils';
import AdFormFeed from "./AdFormFeed";
import dayjs from "dayjs";
import AdFeedFormatForm from "./AdFeedFormatForm";
// import parse from 'autosuggest-highlight/parse';

function AdForm({ feeds, object, formData, ad, handleShowForm, updateData = () => { }, setAds }) {





    const [activeFeeds, setActiveFeeds] = useState(ad.activeFeeds);
    const [startDate, setStartDate] = useState(ad.start_date > 0 ? dayjs(ad.start_date * 1000) : null);
    const [endDate, setEndDate] = useState(ad.end_date > 0 ? dayjs(ad.end_date * 1000) : null);
    const [feedSettings, setFeedSettings] = useState(ad.feedSettings)
    const [feedFormatSettings, setFeedFormatSettings] = useState(ad.feedFormatSettings)
    const [saving, setSaving] = useState(false);


    // console.log(endDate);
    // console.log(dayjs(ad.end_date))

    const handleFeedActive = (e) => {
        if (activeFeeds.includes(Number(e.target.value))) {
            setActiveFeeds(activeFeeds.filter(item => item !== Number(e.target.value)))
        } else {
            setActiveFeeds([...activeFeeds, Number(e.target.value)])
        }


    }
    // useEffect(() => {
    //     // console.log(activeFeeds);
    //     // ad.activeFeeds = activeFeeds;
    //     // ad.startDate = startDate;
    //     // ad.endDate = endDate;
    //     // ad.feedSettings = feedSettings;
    //     // console.log(ad);
    //     console.log(activeFeeds);
    //     console.log(startDate);
    //     console.log(endDate);
    //     console.log(feedSettings);

    // }, [activeFeeds, startDate, endDate, feedSettings])

    // useEffect(() => {
    //     console.log(feedSettings);
    // }, [feedSettings, activeFeeds])

    const handleStartDate = (value) => {
        setStartDate(value)
    }

    const handleEndDate = (value) => {
        setEndDate(value)
    }
    const resetDates = () => {
        setStartDate(null)
        setEndDate(null)
    }


    useEffect(()=>{

        if (saving){
            saveAd();
        }

    },[saving])



    const updateAd = (field, value) => {
        ad[field] = value;
    }

    const saveAd = async () => {
        updateData({
            activeFeeds: activeFeeds,
            startDate: startDate !== null ? startDate.valueOf() / 1000 : null,
            endDate: endDate !== null ? endDate.valueOf() / 1000 : null,
        })
        // console.log(feedSettings);
        let request = {
            id: ad.id,
            object_id: object.id,
            feedSettings: feedSettings,
            activeFeeds: activeFeeds,
            feedFormatSettings: feedFormatSettings,
            startDate: startDate !== null ? startDate.valueOf() / 1000 : null,
            endDate: endDate !== null ? endDate.valueOf() / 1000 : null,
            // endDate: endDate.getTime() || null
        }

        // console.log(request);
        let data = new FormData();
        data.append('data', JSON.stringify(request));
        try {
            // if (currentValue.id > 0) {
            await fetch('/api/export/save', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => {
                    setAds(data);
                    // console.log(data)
                })
            // }
        } catch (e) {
        }

        handleShowForm()
    }



    return (<>

        <Paper
            elevation={2}
            className="p-2 my-5"
        >
            <Box
                className='my-5 align-middle'
            >
                {startDate && endDate && (startDate.valueOf() > endDate.valueOf()) && (
                    <Typography
                        color={'error'}
                    >
                        Дата начала позже даты конца!
                    </Typography>
                )}
            </Box>
            <Box
                className='my-5 align-middle'
            >
                <DateTimePicker label="Старт публикации"
                    value={startDate}
                    onChange={handleStartDate}
                />
                <DateTimePicker
                    value={endDate}
                    onChange={handleEndDate}
                    label="Конец публикации" />
                <Button
                    onClick={resetDates}
                >Сбросить</Button>
            </Box>




            <Box>

                {formData.feed_format.map((feedFormat, index) => {
                    return (<Box
                        key={'feed_format_' + object.id + '_' + feedFormat.id}

                    >
                        <AdFeedFormatForm

                            formData={formData}
                            key={'feed_feedFormat' + object.id + '_' + feedFormat.id}
                            feedFormat={feedFormat}
                            object={object}
                            handleFeedActive={handleFeedActive}
                            activeFeeds={activeFeeds}
                            ad={ad}
                            setFeedSettings={setFeedSettings}
                            feedSettings={feedSettings}
                            feedFormatSettings={feedFormatSettings}
                            feeds={feeds}
                            currentFeedFormat={feedFormatSettings.filter(current => current.id === feedFormat.id)[0]}
                            setFeedFormatSettings={setFeedFormatSettings}

                            updateAd={updateAd}
                        />





                    </Box>)

                })}


            </Box>


            {/* 
        <Metro />

        <Divider />
        <Highways /> */}



            <Box
                className='mb-5 mt-10'
            >

                <Button
                    // color="success"
                    variant="contained"
                    disabled={saving}
                    // onClick={saveAd}
                    onClick={()=>setSaving(true)}
                    className="mr-8"
                >
                    Сохранить
                </Button>
                <Button
                    color="error"
                    variant="contained"
                    // disabled={pipelinesButtonDisabled}
                    onClick={handleShowForm}
                // className="mt-8"
                >
                    Отмена
                </Button>


            </Box>
        </Paper>
    </>);
}

export default AdForm;