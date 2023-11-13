import { useObjectFormState } from "@/app/objects/create/store";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Switch, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
function MetroStation({ item, index, stations,  selected }) {

    const updateMultiItemField = useObjectFormState((state) => state.updateMultiItemField);
    // const multiItemFieldSetDefault = useObjectFormState((state) => state.multiItemFieldSetDefault);
    // const metro = getter('metro')
    const delMultiItemFieldItem = useObjectFormState((state) => state.delMultiItemFieldItem);


    const filtered = stations.filter(current => {
        return !(selected.includes(current.id) && current.id !== item.id)
    })



    return (<>
        <Stack
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
                    value={item.id}
                    input={<OutlinedInput label={'Метро'} />}
                    onChange={(e) => { updateMultiItemField('metro', index, 'id', e.target.value) }}
                >
                    {filtered.map((station, station_index) => {
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
                        value={item.to_metro}
                        onChange={(e) => { updateMultiItemField('metro', index, 'to_metro', e.target.value) }}
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
                    value={item.to_metro_by}
                    onChange={(e) => { updateMultiItemField('metro', index, 'to_metro_by', e.target.value) }}
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
                onClick={() => delMultiItemFieldItem('metro', index)}
                color="error"
            >
                <DeleteIcon />
                Удалить
            </Button>

        </Stack>
    </>);
}

export default MetroStation;