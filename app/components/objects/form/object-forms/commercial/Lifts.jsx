import { Stack, TextField, Typography } from "@mui/material";
import MySelect from "../../MySelect";

function Lifts({ setter, getter, form_data }) {

    // const liftTypes = getter('liftTypes');
    const liftsCount = getter('liftsCount');

    const updateLiftsCount = (id, count) => {

        let new_array = [];
        for (let i = 0; i < liftsCount.length; i++) {
            if (liftsCount[i].id === id) {
                new_array.push({
                    id: liftsCount[i].id,
                    name: liftsCount[i].name,
                    count: count
                })
            } else {
                new_array.push(
                    liftsCount[i]
                )
            }
        }
        setter('liftsCount', new_array)
    }

    return (<>
        <>

            <MySelect

                items={form_data.lift_type}
                name={'liftTypes'}
                setter={setter}
                title={"Лифты"}
                multiple={true}
                getter={getter}
            // width={200}
            />
            {liftsCount.length > 0 && (
                <>
                    <Typography
                        variant="body2"
                        width={150}
                    >
                        Количество:
                    </Typography>
                    {
                        liftsCount.map((item) => {
                            return (
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    alignItems={'center'}
                                    key={'lift_count_' + item.id}
                                >
                                    <Typography
                                        width={150}
                                    >
                                        {
                                            item.name + ":"
                                        }
                                    </Typography>
                                    <TextField
                                        // width={150}
                                        style={{width:80}}
                                        // placeholder="Количество"
                                        type="number"
                                        defaultValue={item.count}
                                        onChange={(e) => { updateLiftsCount(item.id, e.target.value) }}

                                    ></TextField>
                                </Stack>
                            )
                        }
                        )}
                </>
            )}

        </>
    </>);
}

export default Lifts;