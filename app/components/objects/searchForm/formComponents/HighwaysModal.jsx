'use client'
import { useObjectSearchFormState } from "@/app/objects/store";
import { AppBar, Toolbar, Box, Button, Checkbox, Dialog, FormControlLabel, Grid, Paper, Stack } from "@mui/material";
import DistrictCheckbox from "./DistrictCheckbox";
import { useEffect, useState } from "react";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import CheckIcon from '@mui/icons-material/Check';
import { chunkArray } from "@/app/heplers/heplers";
import MemoCheckbox from "./MemoCheckbox";


function HighwaysModal({ isOpen, setIsOpen }) {
    const highways = useObjectSearchFormState((state) => state.formData.highway);

    const search_highways = useObjectSearchFormState((state) => state.search.highways);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);

    const handleClick = (e) => {
        updateMultyField('highways', Number(e.target.value))
    }
    const handleClose = () => {
        setIsOpen(false);
    }
    const dropHighways = () => {
        setSearchParam('highways', []);
    }
    const chunkedHighways = chunkArray(highways, Math.floor(highways.length / 3))


    return (<>
        <Dialog
            // fullScreen
            maxWidth={'xl'}
            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={handleClose}

        >
            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{

                }}
            >
                <Box>
                    <Grid
                        container
                    >
                        {
                            chunkedHighways.map((chunk, index) => {
                                return (
                                    <Grid
                                        key={'highway_chunk' + '_col' + index}
                                        item
                                        alignItems={'start'}
                                    >
                                        <Stack>
                                            {chunk.map((highway, index) => {
                                                return (
                                                    <MemoCheckbox
                                                        handleClick={handleClick}
                                                        key={'highway_' + highway.id}
                                                        item={highway}
                                                        state={search_highways}

                                                    />
                                                    // <FormControlLabel
                                                    //     key={'highway_' + highway.id}
                                                    //     label={highway.name + ":"}
                                                    //     control={
                                                    //         < Checkbox
                                                    //             checked={search_highways.includes(highway.id)}
                                                    //             // indeterminate={checked[0] !== checked[1]}
                                                    //             value={highway.id}
                                                    //             onChange={handleClick}
                                                    //         />}
                                                    // />
                                                )

                                            })}
                                        </Stack>

                                    </Grid>
                                )


                            })

                        }

                    </Grid>

                </Box>

            </div>
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >

                    <Button
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        onClick={dropHighways}
                        color="error"
                    >
                        Сбросить
                    </Button>
                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                        Сохранить
                    </Button>


                </Toolbar>
            </AppBar>
        </Dialog>

    </>);
}

export default HighwaysModal;