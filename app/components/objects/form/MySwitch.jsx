"use client"
import { useObjectFormState } from "@/app/objects/create/store";
import { FormControlLabel, Switch } from "@mui/material";
import { useMemo } from "react";
// import { useEffect } from "react";


function MySwitch({ title, name,
    //  setter
    //  , flat, getter 
}) {

    // const value = getter(name);


    const value = useObjectFormState((state) => state.flat[name]);
    const updateFlat = useObjectFormState((state) => state.updateFlat);

    // const handleChange = (e) => {
    //     updateFlat(name, e.target.value)
    // }


    const handler = () => {
        let new_value = !value;
        updateFlat(name, new_value);
        // flat[name] = new_value;
    }
    // useEffect(() => {
    //     flat[name] = value;
    // }, [value])


    return (
        useMemo(() => (
            <>

                <FormControlLabel
                    labelPlacement="start"
                    control={
                        <Switch

                            name={name}
                            id={name + "switch"}
                            checked={value}
                            onClick={handler}
                        // onChange={handler}
                        />
                    } label={title} />


            </>), [value, name]))
}

export default MySwitch;