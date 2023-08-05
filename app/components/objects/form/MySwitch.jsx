"use client"
import { FormControlLabel, Switch } from "@mui/material";
import { useEffect } from "react";


function MySwitch({ title, name, value, setter, flat }) {

    const handler = () => {
        let new_value = !value;
        setter(new_value);
        flat[name] = new_value;
    }
    // useEffect(() => {
    //     flat[name] = value;
    // }, [value])


    return (<>

        <FormControlLabel
            labelPlacement="start"
            control={
                <Switch

                    name="name"
                    id={name + "switch"}
                    checked={value}
                    onClick={handler}
                // onChange={handler}
                />
            } label={title} />


    </>);
}

export default MySwitch;