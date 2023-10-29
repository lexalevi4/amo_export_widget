import { AppBar, Button, Dialog, Toolbar, Typography } from "@mui/material";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import CheckIcon from '@mui/icons-material/Check';
import { useObjectSearchFormState } from "@/app/objects/store";
import MetroLink from "./MetroLink";
import { useMemo } from "react";
import MetroMap from "./MetroMap";
import MetroMapSvg from "./MetroMapSvg";

function MetroModal({ isOpen, handleClose, topDiff = 0, leftDiff = 0 }) {


    // const handleClose = () => {

    // }
    const formData = useObjectSearchFormState((state) => state.formData);
    const metro = useObjectSearchFormState((state) => state.search.metro);
    const brunches = useObjectSearchFormState((state) => state.search.brunches);
    // const districts = useObjectSearchFormState((state) => state.search.districts);
    // const okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);

    const dropStations = () => {
        setSearchParam('metro', []);
        setSearchParam('brunches', []);

    }
    const handleBrunchClick = (e) => {
        // console.log(formData.brunches);
        const brunch = Number(e.target.dataset.onclickparam);

        let current_brunch = formData.brunches[brunch]
        // console.log(bruch);
        // console.log(current_brunch);
        let brunches_arr = [];
        let metro_arr = [];
        brunches.map(function (item, index) {

            brunches_arr.push(item);
            return true;
        })
        metro.map(function (item, index) {
            metro_arr.push(item);
            return true;
        })
        if (brunches_arr.indexOf(brunch) > -1) {
            brunches_arr.splice(brunches_arr.indexOf(brunch), 1)
            current_brunch.map(function (item) {
                if (metro_arr.indexOf(item) > -1) {
                    metro_arr.splice(metro_arr.indexOf(item), 1)
                }
                return true;
            })
        } else {
            // console.log('добавляем')
            brunches_arr.push(brunch)
            current_brunch.map(function (item) {
                if (metro_arr.indexOf(item) < 0) {
                    metro_arr.push(item)
                }
                return true;
            })
        }
        setSearchParam('metro', metro_arr);
        setSearchParam('brunches', brunches_arr);

    }
    const handleStationClick = (e) => {
        updateMultyField('metro', Number(e.target.dataset.onclickparam));
    }
    // const brunches = [];

    return (
        useMemo(() => (

            <Dialog
                fullScreen
                maxWidth={'xl'}
                keepMounted
                open={isOpen}
                scroll='paper'
                onClose={handleClose}

            >
                {console.log('metr')}

                <MetroMap
                    topDiff={topDiff}
                    leftDiff={leftDiff}
                    brunches={brunches}
                    handleBrunchClick={handleBrunchClick}
                    handleStationClick={handleStationClick}
                    formData={formData}
                    state={metro}


                />
                {/* <MetroMapSvg /> */}
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
                            onClick={dropStations}
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

        ), [metro, brunches, isOpen]))
}

export default MetroModal;