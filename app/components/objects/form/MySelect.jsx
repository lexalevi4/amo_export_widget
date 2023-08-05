import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

function MySelect({ value, items, title, name, setter, width = 300, flat, multiple = false }) {

    const handleChange = (e) => {
        let new_value = e.target.value;
        setter(new_value);
        flat[name] = new_value;
        // console.log(flat)
    }
    // console.log(width);

    return (
        <FormControl
            style={
                {
                    width: width
                }

            }
        >
            <InputLabel id={name + "-name-label"}>{title}</InputLabel>
            <Select
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
    );
}

export default MySelect;