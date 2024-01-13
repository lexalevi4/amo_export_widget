import { useObjectSearchFormState } from "@/app/objects/store";
import { CloseRounded } from "@mui/icons-material";
import { Box, Chip, FormControl, FormLabel, Grid, IconButton, Option, Select } from "@mui/joy";
import { useMemo, useRef } from "react";

function BaseFormSelect({ name, label = '', multiple = false, dropable = false, items = null, width = 300 }) {

    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const value = useObjectSearchFormState((state) => state.search[name]);
    const formDataItems = useObjectSearchFormState((state) => state.formData[name]);
    const action = useRef(null);

    let options = null;

    if (!items) {
        options = formDataItems;
    } else {
        options = items;
    }



    // const formData = useObjectSearchFormState((state) => state.formData);
    const setter = (e, newValue) => {
        setSearchParam(name, newValue);

    }
    // console.log(formData)
    // console.log(items)

    const checkIsSelected = () => {

        if (multiple) {
            if (value.length > 0) {
                return true
            }
        } else {
            if (value && value != '') {
                return true
            }
        }

        return false;
    }

    const renderValue = (selected) => (
        <Box sx={{ display: 'flex', gap: '0.25rem' }}>
            <Grid container>
                {selected.map((selectedOption) => (
                    <Grid
                        key={'chip_' + selectedOption.value}
                    >
                        <Chip variant="soft"
                            color="primary"

                        >
                            {selectedOption.label}
                        </Chip>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )

    return (
        useMemo(() => (
            <>


                <FormControl
                    sx={{
                        width: width
                    }}
                >
                    {label !== '' && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <Select
                        value={value}
                        onChange={setter}
                        multiple={multiple}
                        renderValue={multiple ? renderValue : null}

                        {...((dropable && checkIsSelected()) && {
                            endDecorator: (
                                <IconButton
                                    size="sm"
                                    variant="plain"
                                    color="neutral"
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                    }}
                                    onClick={() => {
                                        if (multiple) {
                                            setSearchParam(name, [])
                                        } else {
                                            setSearchParam(name, '')
                                        }

                                        action.current?.focusVisible();
                                    }}
                                >
                                    <CloseRounded />
                                </IconButton>
                            ),
                            indicator: null,
                        })}
                    >
                        {options.map(item => {
                            return (
                                <Option
                                    key={'user_option_' + name + "_" + item.id}
                                    value={item.id} label={item.name} >
                                    {item.name}
                                </Option>
                            )
                        })}
                    </Select>
                </FormControl >
            </>
        ), [value]))
}

export default BaseFormSelect;