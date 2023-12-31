'use client'
import { useObjectFormState } from "@/app/objects/create/store";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useMemo } from "react";

function MyRadioGroup({ name, title, items,
    //  value, 
    //  setter 
}) {

    // const updateFlat = 
    // const handleChange = (e)=>{

    // }
    // const handleChange = (event) => {
    //     setter(event.target.value);
    //     // flat['name'] = event.target.value;
    // };

    const value = useObjectFormState((state) => state.flat[name]);
    const updateFlat = useObjectFormState((state) => state.updateFlat);

    const handleChange = (e) => {
        updateFlat(name, e.target.value)
    }

    // const handleChange = (event) => {
    //     setter(name, event.target.value)

    // }

    return (
        useMemo(() => (
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

        ), [value, name]))
}

export default MyRadioGroup;