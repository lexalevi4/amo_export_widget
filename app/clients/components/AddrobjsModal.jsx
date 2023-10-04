import { AppBar, Box, Button, Dialog, Stack, Toolbar, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useMemo } from "react";

function AddrobjsModal({ state, isOpen, handleClose, formData, }) {





    return (useMemo(() => (<>
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

                    <Stack>
                        {state.map((item, index) => {

                            const arr = item.split(':')
                            // console.log(item)
                            // console.log(arr[0])
                            // console.log(arr[1])
                            try {
                                return (
                                    <Typography
                                        key={'addrobj_' + arr[0]}
                                    >
                                        {arr[1]}
                                    </Typography>
                                )
                            } catch (e) {
                                return true

                            }
                        })}
                    </Stack>

                </Box>

            </div>



            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >



                    {/* 
                    <Button
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        onClick={dropStations}
                        color="error"
                    >
                        Сбросить
                    </Button> */}
                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                        Закрыть
                    </Button>


                </Toolbar>
            </AppBar>
        </Dialog>

    </>), [state, isOpen]))
}

export default AddrobjsModal;