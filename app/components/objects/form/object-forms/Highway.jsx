import { useObjectFormState } from "@/app/objects/create/store";
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Switch, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
function Highway({ item, index, items, getter, selected }) {

    const updateMultiItemField = useObjectFormState((state) => state.updateMultiItemField);
    // const multiItemFieldSetDefault = useObjectFormState((state) => state.multiItemFieldSetDefault);
    // const metro = getter('metro')
    const delMultiItemFieldItem = useObjectFormState((state) => state.delMultiItemFieldItem);


    const filtered = items.filter(current => {
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
                <InputLabel id={index + "-highways-label"}>{"Шоссе"}</InputLabel>
                <Select
                    labelId={index + "-highways-label"}
                    id={index + "-highwaysselect"}
                    value={item.id}
                    input={<OutlinedInput label={'Шоссе'} />}
                    onChange={(e) => { updateMultiItemField('highways', index, 'id', e.target.value) }}
                >
                    {filtered.map((highway, station_index) => {
                        return (
                            <MenuItem
                                key={'highways-menu-item-' + index + '-' + highway.id}
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
                        value={item.to_metro}
                        onChange={(e) => { updateMultiItemField('highways', index, 'distance', e.target.value) }}
                    />
                </FormControl>
            </Box >
            
            <Button
                onClick={() => delMultiItemFieldItem('highways', index)}
                color="error"
            >
                <DeleteIcon />
                Удалить
            </Button>

        </Stack>
    </>);
}

export default Highway;