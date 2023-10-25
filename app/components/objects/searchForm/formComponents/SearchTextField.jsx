'use client'
import { FormControl, Stack, TextField } from "@mui/material";
import { useObjectSearchFormState } from "@/app/objects/store";
import { useMemo } from "react";

function SearchTextField({ name, title }) {

    const value = useObjectSearchFormState((state) => state.search[name])
    
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam)
    const handler = (e) => {
        setSearchParam(name, e.target.value)
    }



    return (
        useMemo(() => (
           

                <TextField
                    name={name}
                    label={title}
                    onChange={handler}
                    value={value}
                    size="small"
                />

              
          
        ), [value]))
}

export default SearchTextField;