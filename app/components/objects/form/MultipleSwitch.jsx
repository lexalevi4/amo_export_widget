import { FormControlLabel, Switch } from "@mui/material";
import React, { useMemo } from "react";


function MultipleSwitch({
    item,
    disabled = false,
    name,
    state,
    handler
}) {

    const handleClick = (e) => {
        handler(name, e)
    }

    const checked = useMemo(() => {
        let id = Number(item.id)
        return state.includes(id)
    }, [item.id, state])

    return (

        useMemo(() => {
            // console.log('sdfsdf');
            return (
                <>
                    <FormControlLabel
                        className="m-0"
                        labelPlacement="end"
                        control={
                            <Switch
                                disabled={disabled}
                                checked={checked}
                                onClick={handleClick}
                                inputProps={{
                                    value: item.id
                                }}
                            />
                        } label={item.name} />
                </>)
        }, [checked, disabled])
    )
}

export default MultipleSwitch;