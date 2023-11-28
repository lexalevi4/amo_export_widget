import MetroMap from "@/app/components/objects/searchForm/formComponents/MetroMap";
import { AppBar, Button, Dialog, Toolbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useMemo } from "react";

function MetroModal({ state, isOpen, handleClose, formData, topDiff = 0, leftDiff = 0 }) {

    const handleBrunchClick = () => { }
    const handleStationClick = () => { }
    return (
        useMemo(() => (
            <>
                <Dialog
                    // fullScreen
                    fullScreen
                    maxWidth={'xl'}
                    keepMounted
                    open={isOpen}
                    scroll='paper'
                    onClose={handleClose}

                >


                    <MetroMap
                        topDiff={topDiff}
                        leftDiff={leftDiff}
                        brunches={state.brunches}
                        handleBrunchClick={handleBrunchClick}
                        handleStationClick={handleStationClick}
                        formData={formData}
                        state={state.metro}


                    />
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

export default MetroModal;