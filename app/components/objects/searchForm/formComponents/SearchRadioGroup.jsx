import { useObjectSearchFormState } from "@/app/objects/store";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useMemo } from "react";

function SearchRadioGroup({ name, title, items }) {

    const value = useObjectSearchFormState((state) => state.search[name])
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam)

    return (
        useMemo(() => (
            <FormControl>
                <FormLabel id={name + "radio-buttons-group"}>{title}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby={name + "radio-buttons-group"}
                    name={name}
                    value={value}
                    onChange={(e) => setSearchParam(name, e.target.value)}
                >
                    {
                        items.map((item) => {
                            return (
                                <FormControlLabel key={name + '_' + item.id} value={item.id} control={<Radio />} label={item.name} />
                            )
                        })
                    }
                </RadioGroup>
            </FormControl>
        ), [value]))
}

export default SearchRadioGroup;