import { Box, Grid, Stack } from "@mui/material";
import MemoCheckbox from "./MemoCheckbox";

function Highways({ chunkedHighways, search_highways, handleClick = () => { } }) {
    return (<>
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
    </>);
}

export default Highways;