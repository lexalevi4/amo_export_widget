'use client'
import { Autocomplete, Button, Stack, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, debounce } from "@mui/material";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function LinkObject({ objects, value, leadId }) {

    const [currentValue, setCurrentValue] = useState(objects.filter((item) => { return item.id === value })[0] || null);
    const [objectsOptions, setObjectsOptions] = useState(value ? [objects.filter((item) => { return item.id === value })] : [])
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event, newValue) => {
        // console.log(newValue.id)
        setCurrentValue(newValue)
    }

    const linkObject = async () => {
        let data = new FormData();
        data.append('data', JSON.stringify({ leadId: leadId, object: currentValue?.id || null }));
        try {
            // if (currentValue.id > 0) {
            await fetch('/api/lead/link-object', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            // }
        } catch (e) {
        }
    }

    const fetchLinkObjects = useMemo(
        () =>
            debounce(async (request) => {
                let res = await fetch('/api/object/search-objects-for-link?input=' + request.input)
                let items = await res.json();
                if (items.status === 'ok') {
                    setObjectsOptions(items.items);
                } else {
                    setObjectsOptions([]);
                }

            }, 400),
        [],
    );
    useEffect(() => {

        if (inputValue && inputValue !== '') {
            fetchLinkObjects({ input: inputValue })
        } else {
            setObjectsOptions([]);
        }
    }, [inputValue])


    return (<>

        <Stack
            spacing={2}
            direction={'row'}
            className="flex"
            style={{
                width: '100%'
            }}
        // container
        >

            <Typography
                variant="h4"
            >
                Объект - источник:
            </Typography>


            <Autocomplete
                className="flex-1 w-64"
                // id="grouped-demo"
                autoComplete={true}
                options={objectsOptions}
                value={currentValue}
                onChange={handleChange}
                isOptionEqualToValue={(option, value) => {
                    // console.log(option); console.log(value);
                    return Number(option.id) === Number(value.id)
                }
                }
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}

                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.address}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Введите адрес" />}
                renderOption={(props, option) => {
                    // console.log(props)
                    delete props.key
                    //    = option.id
                    return (
                        <li
                            key={option.id}

                            {...props}
                        >
                            <TableContainer>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                style={{
                                                    width: 110
                                                }}
                                            >
                                                {option.image && (
                                                    <Image
                                                        alt="qq"
                                                        src={'https://tb-widget-images.storage.yandexcloud.net/thumb/' + option.image}
                                                        width={100}
                                                        height={100}
                                                    />
                                                )}

                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {option.category}<br />
                                                    {option.deal_type}
                                                </Typography>

                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {option.address}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {option.price}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>



                        </li>
                    );
                }}
            // renderGroup={(params) => (
            //     <li key={params.group}>
            //         <GroupHeader>{params.group}</GroupHeader>
            //         <GroupItems>{params.children}</GroupItems>
            //     </li>
            // )}
            />

            < Button
                onClick={linkObject}
                variant="contained"
            >Привязать</Button >

        </Stack >
    </>);
}

export default LinkObject;