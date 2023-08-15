import { FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import MyDivider from "../../MyDivider";
import MyTextInput from "../../MyTextInput";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";
import { useObjectFormState } from "@/app/objects/create/store";
import { useEffect } from "react";

function CommercialLand({ flat, setter, getter, form_data }) {
    const updateArrayField = useObjectFormState((state) => state.updateArrayField)
    const communications = getter('communications')
    const landTypes = form_data.land_use_type.filter((item) => {
        return item.commercial === 1
    })
    useEffect(() => {
        console.log(communications);
    }, [communications])

    const handleArrayField = (name, id, field, value) => {
        updateArrayField(
            name,
            id,
            field,
            value,
            {
                capacity: '',
                possibleToConnect: false,
                type: ''
            }
        )

    }

    return (<>


        <MyDivider
            title={'Земля'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                name={'landArea'}
                setter={setter}
                title={'Площадь участка'}
                value={flat.landArea}
                type="number"
            />
            <MySelect
                width={150}
                items={form_data.land_area_unit_type}
                name={'landAreaUnitType'}
                setter={setter}
                title={"Единица"}
                getter={getter}
            />


        </Stack>
        <Stack spacing={2} direction={"row"}>
            <MySelect
                title={'Разрешенное использование'}

                name={'landType'}
                items={landTypes}
                getter={getter}
                setter={setter}
            />
            <MySwitch
                name={'possibleToChangePermitedUseType'}
                getter={getter}
                setter={setter}
                title={'Можно сменить'}
            />

        </Stack>
        <Stack spacing={2} direction={"row"}>

            <MySelect
                title={'Категория земель'}
                name={'landCategory'}
                items={form_data.land_category}
                getter={getter}
                setter={setter}
            />
            <MySwitch
                name={'possibleToChangeStatus'}
                getter={getter}
                setter={setter}
                title={'Можно сменить'}
            />
        </Stack>

        <MyDivider
            title={'Коммуникации'}
        />
        {
            form_data.communication_type.map((item) => {
                return (

                    <Stack
                        key={'communication_' + item.id}
                        direction={'row'}
                        spacing={2}
                    >
                        <Typography
                            style={{
                                alignItems: "center",
                                justifyContent: "start",
                                display: 'grid'
                            }}
                            width={120}
                        >
                            {item.name}
                        </Typography>
                        <FormControl
                            style={
                                {
                                    width: 200
                                }

                            }
                        >
                            <InputLabel id={'location' + item.id + "-name-label"}>Локация</InputLabel>
                            <Select
                                labelId={'location' + item.id + "-name-label"}
                                id={'location' + item.id + '-select'}
                                value={communications.filter((communication) => { return communication.id === item.id }).length > 0
                                    ? communications.filter((communication) => { return communication.id === item.id })[0].location
                                    : ''}
                                onChange={(e) => handleArrayField('communications', item.id, 'location', e.target.value)}
                                input={<OutlinedInput label={'Локация'} />}
                            >



                                {
                                    form_data.communication_location_type.
                                        map((location_type) => (
                                            <MenuItem
                                                key={'location_type' + '_' + location_type.id}
                                                value={location_type.id}
                                                // instanceId={'object-item-' + item.id}
                                                id={'location_type' + '-item-' + location_type.id}
                                            >
                                                {location_type.name}
                                            </MenuItem>
                                        ))
                                }
                            </Select>
                        </FormControl >

                        {communications.filter((communication) => { return communication.id === item.id }).length > 0 && (

                            <>
                                {communications.filter((communication) => { return communication.id === item.id })[0].location === 3 && (
                                    <FormControlLabel
                                        labelPlacement="start"
                                        control={
                                            <Switch
                                                name="name"
                                                id={item + "switch"}
                                                checked={communications.filter((communication) => { return communication.id === item.id })[0].possibleToConnect}
                                                onClick={(e) => handleArrayField('communications', item.id, 'possibleToConnect', !communications.filter((communication) => { return communication.id === item.id })[0].possibleToConnect)}
                                            />
                                        } label={'Можно подключить'} />
                                )}
                                {(communications.filter((communication) => { return communication.id === item.id })[0].location < 3
                                ) &&
                                    (<>
                                        <FormControl
                                            style={
                                                {
                                                    width: 185
                                                }}
                                        >
                                            < TextField
                                                label={item.units}

                                                id={item.id + 'capacity-input'}
                                                value={communications.filter((communication) => { return communication.id === item.id })[0].capacity}
                                                onChange={(e) => handleArrayField('communications', item.id, 'capacity', e.target.value)}
                                            />
                                        </FormControl>
                                        {item.type_title !== '' && (
                                            <>


                                                <FormControl
                                                    style={
                                                        {
                                                            width: 200
                                                        }

                                                    }
                                                >
                                                    <InputLabel id={'type_title' + item.id + "-name-label"}>{item.type_title}</InputLabel>
                                                    <Select
                                                        labelId={'type_title' + item.id + "-name-label"}
                                                        id={'type_title' + item.id + '-select'}
                                                        value={communications.filter((communication) => { return communication.id === item.id }).length > 0
                                                            ? communications.filter((communication) => { return communication.id === item.id })[0].type
                                                            : ''}
                                                        onChange={(e) => handleArrayField('communications', item.id, 'type', e.target.value)}
                                                        input={<OutlinedInput label={item.type_title} />}
                                                    >



                                                        {
                                                            form_data['communication_' + item.cian_value + '_type'].filter((type) => { return type.commercial === 1 }).
                                                                map((location_type) => (
                                                                    <MenuItem
                                                                        key={'location_type' + '_' + location_type.id}
                                                                        value={location_type.id}
                                                                        // instanceId={'object-item-' + item.id}
                                                                        id={'location_type' + '-item-' + location_type.id}
                                                                    >
                                                                        {location_type.name}
                                                                    </MenuItem>
                                                                ))
                                                        }
                                                    </Select>
                                                </FormControl >


                                            </>

                                        )}
                                    </>
                                    )}


                            </>
                        )}




                    </Stack>
                )

            })
        }





    </>);
}

export default CommercialLand;