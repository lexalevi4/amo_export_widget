'use client'
import { Autocomplete, Button, Grid, Stack, TableBody, TableContainer, TextField, Typography } from "@mui/material";
import Image from "next/image";

function LinkObject({ objects }) {
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
                id="grouped-demo"
                options={objects}
                groupBy={(option) => option.category}
                getOptionLabel={(option) => option.address}
                // sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Введите адрес" />}
                renderOption={(props, option) => {
                    return (
                        <li {...props}>


                            {/* <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRo
                                </TableBody>
                            </Table>

                        </TableContainer> */}

                            <Grid
                                spacing={3}
                                container alignItems="center">
                                <Grid item
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

                                </Grid>
                                <Grid
                                    item
                                >
                                    <Typography>
                                        {option.category}<br />
                                        {option.deal_type}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <Typography>
                                        {option.address}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                >
                                    <Typography>
                                        {option.price}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </li>
                    );
                }}
            // renderGroup={(params) => (
            //     <li key={params.key}>
            //         <GroupHeader>{params.group}</GroupHeader>
            //         <GroupItems>{params.children}</GroupItems>
            //     </li>
            // )}
            />

            <Button
                variant="contained"
            >Привязать</Button>

        </Stack>
    </>);
}

export default LinkObject;