'use client'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

function MyRadioGroup({ name, title, items, value, setter, flat }) {

    const handleChange = (event) => {
        setter(event.target.value);
        flat['name'] = event.target.value;
    };

    return (

        <FormControl>
            <FormLabel id={name + "radio-buttons-group"}>{title}</FormLabel>
            <RadioGroup
                row
                aria-labelledby={name + "radio-buttons-group"}
                name={name}
                value={value}
                onChange={handleChange}
            >
                {
                    items.map((item) => {
                        return (
                            <FormControlLabel key={'deal_type_' + item.id} value={item.id} control={<Radio />} label={item.name} />
                        )
                    })
                }
            </RadioGroup>
        </FormControl>

    );
}

export default MyRadioGroup;