import { Grid, Stack } from "@mui/material";
import MultipleSwitch from "./MultipleSwitch";
import { useObjectFormState } from "@/app/objects/create/store";

function MultipleSwitchGroup({ name, setter, items
    // , getter
    , maxCount = 0 }) {
    const updateMultyField = useObjectFormState((state) => state.updateMultyField)


    // const state = getter(name)

    const state = useObjectFormState((state) => state.flat[name]);
    // const updateFlat = useObjectFormState((state) => state.updateFlat);

    const handler = (name, e) => {
        updateMultyField(name, Number(e.target.value))
    }


    return (<>
        <Grid container>
            {
                items.map((arr, index) => {
                    return (
                        <Grid xs={12} md={4} lg={3}
                            key={name + '_col' + index}
                            item
                            alignItems={'start'}
                        >
                            <Stack
                                alignItems={"start"}
                                spacing={2}
                                direction={"column"}
                            >
                                {arr.map((item, index) => {

                                    return (
                                        <MultipleSwitch
                                            disabled={maxCount > 0 ? (state.length >= maxCount && maxCount > 0 && (!state.includes(item.id))) : false}
                                            checked={state.includes(item.id)}
                                            key={name + '_switch_' + item.id}
                                            state={state}
                                            item={item}
                                            name={name}
                                            handler={handler}
                                            setter={setter}
                                        />
                                    )

                                })}

                            </Stack>
                        </Grid>
                    )
                })
            }
        </Grid>
    </>);
}

export default MultipleSwitchGroup;