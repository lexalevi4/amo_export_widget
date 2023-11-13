import { Stack, TextField, Typography } from "@mui/material";
import MySelect from "../../MySelect";
import { useEffect } from "react";
import { useObjectFormState } from "@/app/objects/create/store";

function Cranage({   form_data, items = form_data.cranage_type, show_capacity = true }) {



    const setter = useObjectFormState((state) => state.updateFlat);
    const cranCount = useObjectFormState((state) => state.flat['cranCount']);
    const cranTypes = useObjectFormState((state) => state.flat['cranTypes']);

    const update = (id, field, value) => {

        let new_array = [];
        for (let i = 0; i < cranCount.length; i++) {
            if (cranCount[i].id === id) {
                new_array.push({
                    ...cranCount[i],
                    [field]: value
                })
            } else {
                new_array.push(
                    cranCount[i]
                )
            }
        }
        setter('cranCount', new_array)
    }
    const getName = (item) => {
        let current = items.filter((lift) => {
            return Number(lift.id) === Number(item);
        })
        return current[0].name;
    }


    useEffect(() => {

        let new_array = [];
        for (let i = 0; i < cranTypes.length; i++) {
            // console.log(liftTypes[i]);
            let filtered = cranTypes.filter((item) => {
                // console.log(item.id);
                return Number(item.id) === Number(cranTypes[i]);
            })
            if (filtered.length === 0) {
                new_array.push({
                    id: cranTypes[i],
                    count: '',
                    name: getName(cranTypes[i])
                })
            } else {
                new_array.push(
                    filtered[0]
                )
            }
        }

        setter('cranCount', new_array)
    }, [cranTypes])
    return (<>
        <>
            <MySelect
                items={items}
                name={'cranTypes'}
            
                title={"Крановое оборудование"}
                multiple={true}
              
            // width={200}
            />
            {cranCount.length > 0 && (
                <>
                    <Typography
                        variant="body2"
                        width={150}
                    >
                        Количество:
                    </Typography>
                    {
                        cranCount.map((item) => {
                            return (
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    alignItems={'center'}
                                    key={'cran_count_' + item.id}
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
                                        style={{ width: 80 }}
                                        label='кол-во'
                                        // placeholder="Количество"
                                        type="number"
                                        defaultValue={item.count}
                                        onChange={(e) => { update(item.id, 'count', e.target.value) }}

                                    ></TextField>
                                    {show_capacity && (
                                        <TextField
                                            // width={150}
                                            // style={{ width: 80 }}
                                            label='грузоподъёмность'
                                            // placeholder="Количество"
                                            type="number"
                                            defaultValue={item.capacity}
                                            onChange={(e) => { update(item.id, 'capacity', e.target.value) }}

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

export default Cranage;