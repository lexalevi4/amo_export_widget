import { useEffect, useMemo, useState } from "react";
import { debounce } from '@mui/material/utils';
import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import { useObjectFormState } from "@/app/objects/create/store";
function NewBuilding({ src, zhk, house }) {

    const [zhkOptions, setZhkOptions] = useState(zhk ? [zhk] : []);
    const [zhkHouseOptions, setZhkHouseOptions] = useState(house ? [house] : []);
    const [zhkInputValue, setZhkInputValue] = useState('');
    const updateFlat = useObjectFormState((state) => state.updateFlat);

    const newBuildings = useObjectFormState((state) => state.flat.newBuildings);
    const newBuildingHouses = useObjectFormState((state) => state.flat.newBuildingHouses);


    const fetchZk = useMemo(
        () =>
            debounce(async (request) => {
                let res = await fetch('/api/object/search-zhk?input=' + request.input + '&src=' + src)
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
            fetchZk({ input: zhkInputValue, src: src })
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
        // setHouse(null);
    }, [zhk])

    const handleZhkChange = (event, newValue) => {
        let currentSettings = newBuildings.slice(0);
        let newSettings = currentSettings.filter((item) => { return item.src !== src });
        if (newValue === null) {
            updateFlat('newBuildings', newSettings);
            return true;
        }
        newSettings.push({ ...newValue, src: src });
        updateFlat('newBuildings', newSettings);
        handleHouseChange(null, null);
        return true;

    }

    const handleHouseChange = (event, newValue) => {
        let currentSettings = newBuildingHouses.slice(0);
        let newSettings = currentSettings.filter((item) => { return item.src !== src });

        if (newValue === null) {
            updateFlat('newBuildingHouses', newSettings);
            return true;
        }
        newSettings.push({ ...newValue, src: src });
        updateFlat('newBuildingHouses', newSettings);
        return true;

    }

    return (

        <>
            <Stack
                className="my-2"
                // direction={'row'}
                spacing={2}
            >
                <Autocomplete
                    style={{
                        // width: 400
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
                                key={'_zhk_' + src + "_" + option.id}

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
                            // width: 400
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
                                    key={'_house_' + src + "_" + option.id}

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
        </>
    );
}

export default NewBuilding;