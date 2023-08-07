"use client"
import { useObjectFormState } from "@/app/objects/create/store";
import { FormControlLabel, Switch } from "@mui/material";
import { useEffect } from "react";


function MySwitch({ title, name, setter, flat, getter }) {

    const value = getter(name);

    const handler = () => {
        let new_value = !value;
        setter(name, new_value);
        // flat[name] = new_value;
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