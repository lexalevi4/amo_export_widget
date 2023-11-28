'use client'
import { useObjectSearchFormState } from "@/app/objects/store";
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

function SearchSelect({ width = 300, name, title, items, multiple = false, required = false }) {

    const value = useObjectSearchFormState((state) => state.search[name])
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam)

    return (<>

        <FormControl
            style={
                {
                    width: width
                }

            }
        >
            <InputLabel
                size="small"
                id={name + "-name-label"}>{title}</InputLabel>
            <Select
                size="small"
                required={required}
                multiple={multiple}
                // displayEmpty={true}
                labelId={name + "-name-label"}
                id={name + '-select'}
                name={name}
                value={value}
                onChange={(e) => setSearchParam(name, e.target.value)}
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

    </>);
}

export default SearchSelect;