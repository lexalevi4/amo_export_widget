import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import AdFormFeed from "./AdFormFeed";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useMemo, useState } from "react";
import { debounce } from '@mui/material/utils';
import { sortByName } from "@/app/heplers/heplers";
import DeleteIcon from '@mui/icons-material/Delete';
function AdFeedFormatForm({ feeds, object, activeFeeds, handleFeedActive, formData, ad, updateAd, feedSettings, setFeedSettings, feedFormat, setFeedFormatSettings, currentFeedFormat, feedFormatSettings }) {

    const [zhkOptions, setZhkOptions] = useState(currentFeedFormat.zhk ? [currentFeedFormat.zhk] : []);
    const [zhkHouseOptions, setZhkHouseOptions] = useState(currentFeedFormat.house ? [currentFeedFormat.house] : []);
    const [zhkInputValue, setZhkInputValue] = useState('');
    const [zhk, setZhk] = useState(currentFeedFormat.zhk);
    const [house, setHouse] = useState(currentFeedFormat.house);
    const [metro, setMetro] = useState(currentFeedFormat.metro)
    const [highways, setHighways] = useState(currentFeedFormat.highways)

    const stations = formData.metro.sort((a, b) => sortByName(a, b, 'metro'));
    const all_highways = formData.highway.sort((a, b) => sortByName(a, b, 'name'));

    console.log(currentFeedFormat);

    const fetchZk = useMemo(
        () =>
            debounce(async (request) => {
                let res = await fetch('/api/object/search-zhk?input=' + request.input + '&src=' + request.src)
                let items = await res.json();
                if (items.status === 'ok') {
                    setZhkOptions(items.items);
                } else {
                    setZhkOptions([]);
                }

            }, 400),
        [],
    );

    useEffect(() => {

        if (zhkInputValue != '') {
            fetchZk({ input: zhkInputValue, src: feedFormat.id })
        } else {
            setZhkOptions([]);
        }
    }, [zhkInputValue])


    useEffect(() => {
        // console.log(zhk);
        
        if (zhk && zhk.id > 0) {
            if (zhk.houses.length > 0) {
                setZhkHouseOptions(zhk.houses)
            } else {
                setZhkHouseOptions([])
            }
        } else {
            setZhkHouseOptions([])
           
        }
        setHouse(null);
    }, [zhk])



    const addMetro = () => {
        setMetro([...metro, { id: '', distance: '', distance_type: 1 }])
    }

    const addHighway = () => {
        setHighways([...highways, { id: '', distance: '' }])
    }

    const deleteMetro = (index) => {
        const new_arr = []
        for (let i = 0; i < metro.length; i++) {
            if (i !== index) {
                new_arr.push(metro[i])
            }
        }
        setMetro(new_arr);
    }

    const deleteHighway = (index) => {
        const new_arr = []
        for (let i = 0; i < highways.length; i++) {
            if (i !== index) {
                new_arr.push(highways[i])
            }
        }
        setHighways(new_arr);
    }

    const updateMetro = (index, field, value) => {
        // let newArr = [];
        for (let i = 0; i < metro.length; i++) {
            if (i === index) {
                metro[i][field] = value;
            }
        }
    }

    const updateHighways = (index, field, value) => {

        for (let i = 0; i < highways.length; i++) {
            if (i === index) {
                highways[i][field] = value;
            }
        }

    }
    const handleZhkChange = (event, newValue) => {
        setZhk(newValue)

    }

    const handleHouseChange = (event, newValue) => {
        setHouse(newValue)
    }

  



    const updateFeedFormatSettings = () => {
        let newSettings = [];
        let settings = {
            highways: highways,
            metro: metro,
            house: house,
            zhk: zhk
        }
        feedFormatSettings.map(item => {
            if (item.id === feedFormat.id) {
                newSettings.push({ id: item.id, ...settings })
            } else {
                newSettings.push(item)
            }
        })
        // console.log(newSettings);
        setFeedFormatSettings(newSettings)
    }

    useEffect(() => {
        updateFeedFormatSettings()
    }, [metro, highways, house, zhk])



    return (<>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            > <Typography>
                    Формат {feedFormat.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>

                <Stack
                    className="my-2"
                    direction={'row'}
                    spacing={2}
                >
                    <Autocomplete
                        style={{
                            width: 400
                        }}
                        renderInput={(params) => <TextField {...params} label="ЖК" />}
                        options={zhkOptions}
                        onInputChange={(event, newInputValue) => {
                            setZhkInputValue(newInputValue);
                        }}
                        onChange={handleZhkChange}
                        noOptionsText="Введите название ЖК"
                        isOptionEqualToValue={(option, value) => {
                            // console.log(option); console.log(value);
                            return Number(option.id) === Number(value.id)
                        }
                        }
                        value={zhk}
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option) => {
                            delete props.key
                            return (
                                <li
                                    key={object.id + '_cian_zhk' + option.id}

                                    {...props}
                                >
                                    <Stack>
                                        <Box
                                            // key={index}
                                            component="span"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {option.name}
                                        </Box>
                                        <Typography variant="body2" color="text.secondary">
                                            {option.address}
                                        </Typography>
                                    </Stack>


                                </li>
                            );
                        }}
                    />

                    {zhkHouseOptions.length > 0 && (
                        <Autocomplete
                            style={{
                                width: 300
                            }}
                            renderInput={(params) => <TextField {...params} label="Корпус" />}
                            options={zhkHouseOptions}
                            onChange={handleHouseChange}
                            isOptionEqualToValue={(option, value) => {
                                return Number(option.id) === Number(value.id)
                            }
                            }
                            value={house}
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option) => {
                                delete props.key
                                return (
                                    <li
                                        key={object.id + '_cian_zhk_house' + option.id}

                                        {...props}
                                    >
                                        <Stack>
                                            <Box
                                                // key={index}
                                                component="span"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                {option.name}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">
                                                {option.address}
                                            </Typography>
                                        </Stack>
                                        {/* {option.name} */}

                                    </li>
                                );
                            }}
                        />
                    )}
                </Stack>

                {feedFormat.id === 1 && (
                    <>
                        <Box className='mt-3 mb-10'>
                            <Box className='mb-5'>
                                <Typography variant="h6">Метро</Typography>

                                {metro.map((item, index) => {
                                    return (
                                        <Stack
                                            className="my-2"
                                            key={'metro' + Math.random()}
                                            direction={'row'}
                                            spacing={2}
                                        >
                                            <FormControl
                                                style={
                                                    {
                                                        width: 250
                                                    }

                                                }
                                            >
                                                <InputLabel id={index + "-name-label"}>{"Метро"}</InputLabel>
                                                <Select
                                                    labelId={index + "-metro-label"}
                                                    id={index + "-metroselect"}
                                                    // value={item.id}
                                                    defaultValue={item.id}
                                                    input={<OutlinedInput label={'Метро'} />}
                                                    onChange={(e) => { updateMetro(index, 'id', e.target.value) }}
                                                >
                                                    {stations.map((station, station_index) => {
                                                        return (
                                                            <MenuItem
                                                                key={'metro-menu-item-' + index + '-' + station.id}
                                                                value={station.id}
                                                                id={index + '-metro-item-' + item.id}
                                                            >
                                                                {stations.filter(item => item.id === station.id)[0].colors.map(function (color, index) {
                                                                    return (<span key={station_index + '_metro_' + index} style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
                                                                })}
                                                                {station.metro}
                                                            </MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>
                                            <Box>
                                                <FormControl
                                                    style={
                                                        {
                                                            width: 80
                                                        }}
                                                >
                                                    < TextField
                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                        type={'numeric'}
                                                        label={'минут'}

                                                        id={'to_metro-input'}
                                                        // value={item.distance}
                                                        defaultValue={item.distance}
                                                        onChange={(e) => { updateMetro(index, 'distance', e.target.value) }}
                                                    />
                                                </FormControl>
                                            </Box >
                                            <FormControl
                                                style={
                                                    {
                                                        width: 150
                                                    }

                                                }
                                            >
                                                <Select
                                                    labelId={index + "-to_metro_by-label"}
                                                    id={index + "-to_metro_byselect"}
                                                    // value={item.distance_type}
                                                    defaultValue={item.distance_type}
                                                    onChange={(e) => { updateMetro(index, 'distance_type', e.target.value) }}
                                                >
                                                    <MenuItem
                                                        value={1}
                                                        id={index + '-multiad-item-' + 1}
                                                    >
                                                        Пешком
                                                    </MenuItem>
                                                    <MenuItem
                                                        value={2}
                                                        id={index + '-multiad-item-' + 2}
                                                    >
                                                        Транспортом
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button
                                                onClick={() => deleteMetro(index)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                                Удалить
                                            </Button>

                                        </Stack>
                                    )
                                }


                                )}

                                {metro.length < 3 && (
                                    <Button
                                        onClick={addMetro}
                                    >
                                        Добавить метро
                                    </Button>
                                )}
                            </Box>

                            <Typography variant="h6">Шоссе</Typography>


                            <Box className='mt-3 mb-10'>
                                <Box className='mb-5'>
                                    {
                                        highways.map((item, index) => {
                                            return (
                                                <Stack
                                                    className="my-2"
                                                    key={'highway' + currentFeedFormat.id + '_' + object.id + '_' + Math.random()}
                                                    direction={'row'}
                                                    spacing={2}
                                                >
                                                    <FormControl
                                                        style={
                                                            {
                                                                width: 250
                                                            }

                                                        }
                                                    >

                                                        <InputLabel id={index + "-highways-label"}>{"Шоссе"}</InputLabel>
                                                        <Select
                                                            labelId={index + "-highways-label"}
                                                            id={index + "-highwaysselect"}
                                                            // value={item.id}
                                                            defaultValue={item.id}
                                                            input={<OutlinedInput label={'Шоссе'} />}
                                                            onChange={(e) => { updateHighways(index, 'id', e.target.value) }}
                                                        // onChange={(e) => { updateMultiItemField('highways', index, 'id', e.target.value) }}
                                                        >
                                                            {all_highways.map((highway) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={'highways-menu-item-' + index + '-' + highway.id + '_' + Math.random()}
                                                                        value={highway.id}
                                                                        id={index + '-highways-item-' + highway.id}
                                                                    >

                                                                        {highway.name}
                                                                    </MenuItem>
                                                                )
                                                            })}
                                                        </Select>

                                                    </FormControl>
                                                    <Box>
                                                        <FormControl
                                                        // style={
                                                        //     {
                                                        //         width: 80
                                                        //     }}
                                                        >
                                                            < TextField
                                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                                type={'numeric'}
                                                                label={'Расстояние (км)'}

                                                                id={'to_metro-input'}
                                                                defaultValue={item.distance}
                                                                onChange={(e) => { updateHighways(index, 'distance', e.target.value) }}
                                                            // onChange={(e) => { updateMultiItemField('highways', index, 'distance', e.target.value) }}
                                                            />
                                                        </FormControl>
                                                    </Box >
                                                    <Button
                                                        onClick={() => deleteHighway(index)}
                                                        color="error"
                                                    >
                                                        <DeleteIcon />
                                                        Удалить
                                                    </Button>
                                                </Stack>
                                            )

                                        })
                                    }
                                    {highways.length < 2 && (
                                        <Button
                                            onClick={addHighway}
                                        >
                                            Добавить Шоссе
                                        </Button>
                                    )}
                                </Box>
                            </Box>

                        </Box>
                    </>
                )}

                {feeds.filter(feed => feed.format === feedFormat.id).map((feed, index) => {
                    return (
                        // <Stack>
                        <AdFormFeed
                            formData={formData}
                            key={'feed_' + object.id + '_' + feed.id}
                            feed={feed}
                            object={object}
                            handleFeedActive={handleFeedActive}
                            activeFeeds={activeFeeds}
                            ad={ad}
                            setFeedSettings={setFeedSettings}
                            feedSettings={feedSettings}
                            currentFeed={feedSettings.filter(current => current.id === feed.id)[0]}

                            updateAd={updateAd}
                        // fetchZk={fetchZk}
                        />
                        // </Stack>

                    )

                })}

            </AccordionDetails>
        </Accordion>
    </>);
}

export default AdFeedFormatForm;