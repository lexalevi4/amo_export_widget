"use client"
import { useObjectFormState } from "@/app/objects/create/store";
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { useEffect } from "react";

function MyTextInput({ title, name, 
    // value,
     setter, type = 'text', flat, width = null }) {


    const value = useObjectFormState((state) => state.flat[name]);
    const updateFlat = useObjectFormState((state) => state.updateFlat);

    const handler = (e) => {
        updateFlat(name, e.target.value)
    }

    return (<>
        <Box>

            <FormControl
                style={
                    {
                        width: width
                    }}
            >
                {/* <InputLabel
                    htmlFor={name + '-input'}
                    id={name + "-name-label"}>{title}</InputLabel> */}
                < TextField
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    type={type}
                    // InputLabelProps={{ shrink: true }}
                    // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    // error
                    label={title}

                    id={name + '-input'}
                    value={value}
                    onChange={handler}
                />
            </FormControl>
        </Box >
    </>);
}

export default MyTextInput;