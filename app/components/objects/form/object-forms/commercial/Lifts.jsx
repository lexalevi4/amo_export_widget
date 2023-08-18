import { Stack, TextField, Typography } from "@mui/material";
import MySelect from "../../MySelect";
import { useEffect } from "react";

function Lifts({ setter, getter, form_data, items = form_data.lift_type, show_capacity = false }) {

    const liftsCount = getter('liftsCount');
    const liftTypes = getter('liftTypes');

    
    const getLiftName = (item) => {
        let currentLift = form_data.lift_type.filter((lift) => {
            return Number(lift.id) === Number(item);
        })
        return currentLift[0].name;

    }
    const updateLiftsCount = (id, field, value) => {

        let new_array = [];
        for (let i = 0; i < liftsCount.length; i++) {
            if (liftsCount[i].id === id) {
                new_array.push({
                    ...liftsCount[i],
                    [field]: value
                })
            } else {
                new_array.push(
                    liftsCount[i]
                )
            }
        }
        setter('liftsCount', new_array)
    }


    useEffect(() => {

        let new_array = [];
        for (let i = 0; i < liftTypes.length; i++) {
            // console.log(liftTypes[i]);
            let filtered = liftsCount.filter((item) => {
                // console.log(item.id);
                return Number(item.id) === Number(liftTypes[i]);
            })
            if (filtered.length === 0) {
                new_array.push({
                    id: liftTypes[i],
                    count: '',
                    name: getLiftName(liftTypes[i])
                })
            } else {
                new_array.push(
                    filtered[0]
                )
            }
        }

        setter('liftsCount', new_array)
    }, [liftTypes])

    return (<>
        <>
            <MySelect
                items={items}
                name={'liftTypes'}
                setter={setter}
                title={"Лифты"}
                multiple={true}
                getter={getter}
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
                                        style={{ width: 80 }}
                                        label='кол-во'
                                        type="number"
                                        defaultValue={item.count}
                                        onChange={(e) => { updateLiftsCount(item.id, 'count', e.target.value) }}

                                    ></TextField>
                                    {show_capacity && (
                                        <TextField
                                            label='грузоподъёмность'
                                            type="number"
                                            defaultValue={item.capacity}
                                            onChange={(e) => { updateLiftsCount(item.id, 'capacity', e.target.value) }}

                                        ></TextField>
                                    )}
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