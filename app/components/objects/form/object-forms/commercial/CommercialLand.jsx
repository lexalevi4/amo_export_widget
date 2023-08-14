import { FormControl, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import MyDivider from "../../MyDivider";
import MyTextInput from "../../MyTextInput";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";

function CommercialLand({ flat, setter, getter, form_data }) {





    const communications = getter('communications')
    const landTypes = form_data.land_use_type.filter((item) => {
        return item.commercial === 1
    })


    const updateCommunicationLocation = (id, location) => {

        let new_array = communications.filter((item) => { item.id !== id });

        for (let i = 0; i < form_data.communication_type.length; i++) {


        }

        setter('communications', new_array)
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
                // multiple={true}
                getter={getter}
            // width={200}
            />
            {/* landAreaUnitType */}

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

                let current = communications.filter((communication) => { return communication.type === item.id })
                if (current.length === 0) {
                    current = {
                        id: item.id,
                        location: '',
                        capacity: '',
                        possibleToConnect: false
                    }
                }
                return (

                    <Stack
                        key={'communication_' + item.id}
                        direction={'row'}
                    >
                        <Typography
                            style={{
                                alignItems: "center",
                                justifyContent:"start",
                                display:'grid'
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

                                // displayEmpty={true}
                                labelId={'location' + item.id + "-name-label"}
                                id={'location' + item.id + '-select'}
                                // name={name}
                                value={current.location}
                                // onChange={handleChange}
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
                        <FormControl
                            style={
                                {
                                    width: 115
                                }}
                        >
                            {/* <InputLabel
                    htmlFor={name + '-input'}
                    id={name + "-name-label"}>{title}</InputLabel> */}
                            < TextField
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                type='numeric'
                                // InputLabelProps={{ shrink: true }}
                                // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                // error
                                label={'Мощность'}

                                id={item + 'capacity-input'}
                                value={current.capacity}
                            // onChange={handler}
                            />
                        </FormControl>
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Switch

                                    name="name"
                                    id={item + "switch"}
                                    checked={current.possibleToConnect}
                                // onClick={handler}
                                // onChange={handler}
                                />
                            } label={'Можно подключить'} />


                    </Stack>
                )

            })
        }





    </>);
}

export default CommercialLand;