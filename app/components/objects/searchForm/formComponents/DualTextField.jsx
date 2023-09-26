'use client'
import { FormControl, Stack, TextField } from "@mui/material";
import { useObjectSearchFormState } from "@/app/objects/store";

function DualTextField({ name1, name2, title1, title2 }) {

    const value1 = useObjectSearchFormState((state) => state.search[name1])
    const value2 = useObjectSearchFormState((state) => state.search[name2])
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam)
    const handler1 = (e) => {
        setSearchParam(name1, e.target.value)
    }

    const handler2 = (e) => {
        setSearchParam(name2, e.target.value)
    }

    return (<>
        <Stack
            className='items-end'
            direction="row"
            spacing={2}
            sx={{
                display: 'flex'
            }}
        >

            <TextField
                name={name1}
                label={title1}
                onChange={handler1}
                value={value1}

            // className="mx-1"
            // onChange={handleTextInput}
            // name={name}
            // value={value}
            // id={name + "iput"}
            // label={label}
            // variant="standard"


            />

            <TextField
                name={name2}
                label={title2}
                onChange={handler2}
                value={value2}
            />
        </Stack>
    </>);
}

export default DualTextField;