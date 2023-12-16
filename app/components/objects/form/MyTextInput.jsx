"use client"
import { useObjectFormState } from "@/app/objects/create/store";
import { Box, FormControl, FormHelperText, TextField } from "@mui/material";
import { useMemo } from "react";

function MyTextInput({ title, name,
    required = false,
    requiredMessage = 'Обязательное',
    // value,
    type = 'text', width = null }) {


    const value = useObjectFormState((state) => state.flat[name]) || '';
    const updateFlat = useObjectFormState((state) => state.updateFlat) || '';

    const handler = (e) => {
        updateFlat(name, e.target.value)
    }

    return (
        useMemo(() => (
            <>

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
                        {required && (
                            <FormHelperText
                                color="error"
                                style={{
                                    color: 'red'
                                }}
                            >
                                {requiredMessage}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Box >
            </>), [value, name]))
}

export default MyTextInput;