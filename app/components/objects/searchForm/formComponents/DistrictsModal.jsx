'use client'
import { useObjectSearchFormState } from "@/app/objects/store";
import { AppBar, Toolbar, Box, Button, Checkbox, Dialog, FormControlLabel, Grid, Paper, Stack } from "@mui/material";
import DistrictCheckbox from "./DistrictCheckbox";
import { useEffect, useMemo, useState } from "react";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import CheckIcon from '@mui/icons-material/Check';
import Districts from "./Districts";



function DistrictsModal({ isOpen, setIsOpen }) {

    const districts = useObjectSearchFormState((state) => state.formData.districts);
    const search_okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    const search_districts = useObjectSearchFormState((state) => state.search.districts);
    // const okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);
    const updateOkrug = useObjectSearchFormState((state) => state.updateOkrug);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const [updatedDistrict, setUpdatedDistrict] = useState(0);


    const handleClose = () => {
        setIsOpen(false);
    }
    const dropDistricts = () => {
        setSearchParam('districts', []);
        setSearchParam('okrugs', [])
    }

    useEffect(() => {

        if (updatedDistrict > 0) {
            let current_district = districts.filter(d => d.id === updatedDistrict)
            updateOkrug(current_district[0].parent);
        }

    }, [updatedDistrict])

    const handleOkrugClick = (e) => {
        let okrug = Number(e.target.value)
        let current_okrug = districts.filter(d => d.parent === okrug)
        let okrugs_arr = [];
        let districts_arr = [];
        search_okrugs.map(function (item, index) {
            okrugs_arr.push(item);
            return true;
        })
        search_districts.map(function (item, index) {
            districts_arr.push(item);
            return true;
        })
        if (okrugs_arr.indexOf(okrug) > -1) {
            okrugs_arr.splice(okrugs_arr.indexOf(okrug), 1)
            current_okrug.map(function (item) {
                if (districts_arr.indexOf(item.id) > -1) {
                    districts_arr.splice(districts_arr.indexOf(item.id), 1)
                }
                return true;
            })
        } else {
            okrugs_arr.push(okrug)
            current_okrug.map(function (item) {
                if (districts_arr.indexOf(item.id) < 0) {
                    districts_arr.push(Number(item.id))
                }
                return true;
            })
        }
        setSearchParam('districts', districts_arr);
        setSearchParam('okrugs', okrugs_arr)
    }

    const handleClick = async (e) => {
        let district = Number(e.target.value)
        // console.log(district)
        let current_district = districts.filter(d => d.id === district)

        let okrugs_arr = [];
        let districts_arr = [];
        search_okrugs.map(function (item, index) {
            okrugs_arr.push(item);
            return true;
        })
        search_districts.map(function (item, index) {
            districts_arr.push(item);
            return true;
        })
        // console.log(districts_arr);

        updateMultyField('districts', district)
        setUpdatedDistrict(district)

    }

    return (
        useMemo(() => (
            <Dialog
                fullScreen
                // maxWidth={'xl'}
                keepMounted
                open={isOpen}
                scroll='paper'
                onClose={handleClose}

            >
                <Districts
                    districts={districts}
                    search_districts={search_districts}
                    search_okrugs={search_okrugs}
                    handleClick={handleClick}
                    handleOkrugClick={handleOkrugClick}
                />
                {/* <div
                    className='m-3 p-2 pt-5 pb-5'
                    style={{

                    }}
                >
                    <Box>
                        <Grid
                            container
                        >

                            {
                                districts.filter(d => d.type === 'Okrug').map(function (okrug, index) {
                                    return (
                                        <Grid
                                            key={'okrug' + '_col' + index}
                                            item
                                            alignItems={'start'}
                                        >
                                            <Stack
                                                alignItems={"start"}
                                                spacing={2}
                                                direction={"column"}
                                            >
                                                <div
                                                    style={{
                                                        marginBottom: 20,
                                                        marginTop: 30,
                                                        marginLeft: 20
                                                    }}
                                                >
                                                    <FormControlLabel
                                                        label={okrug.name + ":"}
                                                        control={
                                                            <Checkbox
                                                                checked={search_okrugs.includes(okrug.id)}
                                                                // indeterminate={checked[0] !== checked[1]}
                                                                value={okrug.id}
                                                                onChange={handleOkrugClick}
                                                            />}
                                                    />
                                                    {districts.filter(d => d.parent === okrug.id).map(function (district) {
                                                        return (
                                                            <DistrictCheckbox
                                                                key={'district_' + district.id}
                                                                district={district}
                                                                handleClick={handleClick}
                                                                districts={search_districts}
                                                            />
                                                        )
                                                    })}
                                                </div>
                                            </Stack>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </div> */}
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
                            onClick={dropDistricts}
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

        ), [search_okrugs, search_districts, isOpen]))
}

export default DistrictsModal;