import { Box, Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import DistrictCheckbox from "./DistrictCheckbox";

function Districts({ districts, search_okrugs, handleOkrugClick = () => { }, search_districts, handleClick = () => { } }) {
    return (
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
        </div>
    );
}

export default Districts;