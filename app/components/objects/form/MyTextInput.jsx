"use client"
import { Box, FormControl, InputLabel, TextField } from "@mui/material";
import { useEffect } from "react";

function MyTextInput({ title, name, value, setter, type = 'text', flat,width=null }) {

    const handler = (e) => {

        setter(e.target.value)
        // flat[name] = value;

    }
    // useEffect(() => {
    //     try {

    //     } catch (e) {

    //     }
    // }, [value])

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