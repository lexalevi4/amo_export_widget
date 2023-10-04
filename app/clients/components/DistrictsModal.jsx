import { AppBar, Button, Dialog, Toolbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useMemo } from "react";
import Districts from "@/app/components/objects/searchForm/formComponents/Districts";
function DistrictsModal({ state, isOpen, handleClose, formData, }) {

    return (
        useMemo(() => (<>
            <Dialog
                // fullScreen
                maxWidth={'xl'}
                keepMounted
                open={isOpen}
                scroll='paper'
                onClose={handleClose}

            >

                <Districts
                    districts={formData.districts}
                    search_districts={state.districts}
                    search_okrugs={state.okrugs}
                    // handleClick={handleClick}
                    // handleOkrugClick={handleOkrugClick}
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

export default DistrictsModal;