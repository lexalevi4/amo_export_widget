'use client'
import { useObjectSearchFormState } from "@/app/objects/store";
import { Grid, Stack } from "@mui/material";
import AddrobjsChip from "./AddrobjsChip";

function Addrobjs() {



    const addrobjs = useObjectSearchFormState((state) => state.search.addrobjs)
    // console.log(addrobjs)
    return (<>
        <Grid
            className="my-3"
            direction="row"
            container
            spacing={1}
            alignContent={"flex-start"}
            alignItems={"unset"}
            style={{ width: '100%' }}
        >
            {
                addrobjs.map((item) => {
                    return (


                        <AddrobjsChip
                            key={item}
                            addrobj={item}
                        />
                    )

                })
            }
        </Grid>
    </>);
}

export default Addrobjs;