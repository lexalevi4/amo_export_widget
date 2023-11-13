import { useObjectFormState } from "@/app/objects/create/store";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useMemo } from "react";

function MySelect({ items, title, name,
    //  setter, 
    width = 300, multiple = false, required = false }) {

    const value = useObjectFormState((state) => state.flat[name]);
    const updateFlat = useObjectFormState((state) => state.updateFlat);

    const handleChange = (e) => {
        updateFlat(name, e.target.value)
    }


    // const handleChange = (event) => {
    //     setter(name, event.target.value)

    // }
    // console.log(value)
    return (
        useMemo(() => (
            <FormControl
                style={
                    {
                        width: width
                    }

                }
            >
                <InputLabel id={name + "-name-label"}>{title}</InputLabel>
                <Select
                    required={required}
                    multiple={multiple}
                    // displayEmpty={true}
                    labelId={name + "-name-label"}
                    id={name + '-select'}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label={title} />}
                >

                    {/* <MenuItem
                    displayEmpty
                    value={''}
                    // instanceId={'object-item-' + item.id}
                    id={name + '-item-empty'  }
                > */}

                    {/* </MenuItem> */}

                    {
                        items.
                            map((item) => (
                                <MenuItem
                                    key={name + '_' + item.id}
                                    value={item.id}
                                    // instanceId={'object-item-' + item.id}
                                    id={name + '-item-' + item.id}
                                >
                                    {item.name}
                                </MenuItem>
                            ))
                    }
                </Select>
            </FormControl >
        ), [value, name,items]))
}

export default MySelect;