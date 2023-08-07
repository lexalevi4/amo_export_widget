
import {  Stack } from "@mui/material";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import MyDivider from "../MyDivider";
import FurnitureTechnics from "./FurnitureTechnics";

function Suburban({
    flat,
    form_data,
    setter,
    getter,
    // deal_type,
    flat_object

}) {


    const hasWater = getter('hasWater');
    const hasGas = getter('hasGas');
    const hasDrainage = getter('hasDrainage');



    const landTypes = form_data.land_use_type.filter((item) => {
        return item.suburban === 1
    })
    const conditions = form_data.condition.filter((item) => {
        return item.suburban === 1
    })

    const materials = form_data.material.filter((item) => {
        return item.suburban === 1
    })
    const heating_types = form_data.heating_type.filter((item) => {
        return item.suburban === 1
    })

    const water_types = form_data.communication_water_type.filter((item) => {
        return item.suburban === 1
    })

    const gas_types = form_data.communication_gas_type.filter((item) => {
        // return item.suburban === 1
        return true;

    })
    const drainage_types = form_data.communication_drainage_type.filter((item) => {
        return item.suburban === 1

    })

    return (<>



        <MyDivider
            title={'Участок'}
        />
        <Stack spacing={2} direction={"row"}>
            <MyTextInput
                type='number'
                name={'landArea'}
                setter={setter}
                value={flat.landArea}
                title={'Площадь участка (сот.)'}
            />

            <MyTextInput

                width={300}
                // type='number'
                name={'cadNumber'}
                setter={setter}
                value={flat.cadNumber}
                title={'Кадастровый номер участка'}
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
            <MySelect
                title={'Категория земель'}
                name={'landCategory'}
                items={form_data.land_category}
                getter={getter}
                setter={setter}
            />
        </Stack>
        <Stack spacing={2} direction={"row"}>
            <MySwitch

                name={'isLandWithContract'}
                getter={getter}
                setter={setter}
                title={"Участок с подрядом"}
            />
        </Stack >



        {(Number(flat_object) !== 8) && (
            <>
                <MyDivider
                    title={'Дом'}
                />

                <Stack spacing={2} direction={"row"}>

                    <MyTextInput

                        width={300}
                        // type='number'
                        name={'buildingCadNumber'}
                        setter={setter}
                        value={flat.buildingCadNumber}
                        title={'Кадастровый номер дома'}
                    />
                </Stack>


                <Stack
                    direction="row" spacing={2}
                >
                    <MyTextInput
                        type='number'
                        name={'totalArea'}
                        setter={setter}
                        value={flat.totalArea}
                        title={'Площадь дома'}
                    />
                    <MyTextInput
                        type='number'
                        name={'rooms'}
                        setter={setter}
                        value={flat.bedroomsCount}
                        title={'Количество спален'}
                    />
                    <MyTextInput

                        type='number'
                        name={'floorsCount'}
                        setter={setter}
                        value={flat.floorsCount}
                        title={'Этажность'}
                    />
                </Stack>

                {
                    (Number(flat_object) === 6) && (
                        <MyTextInput
                            // flat={flat}
                            type='number'
                            name={'shareAmount'}
                            setter={setter}
                            value={flat.shareAmount}
                            title={'Размер доли'}
                        />
                    )
                }

                <Stack
                    direction="row" spacing={2}
                >

                    <MySelect
                        items={conditions}
                        name={'condition'}
                        title={"Состояние"}
                        getter={getter}
                        setter={setter}
                    />

                    <MySelect
                        items={form_data.repair}
                        name={'repair'}
                        getter={getter}
                        setter={setter}
                        title={"Ремонт"}
                    />

                </Stack>

                <Stack
                    direction="row" spacing={2}
                >
                    <MyTextInput
                        type='number'
                        name={'buildYear'}
                        setter={setter}
                        value={flat.buildYear}
                        title={'Год постройки'}
                    />

                    <MySelect
                        items={materials}
                        name={'material'}
                        setter={setter}
                        title={"Материал"}
                        getter={getter}
                    />
                </Stack>

                <Stack
                    direction="row" spacing={2}
                >
                    <MySelect
                        items={form_data.wc_location_type}
                        name={'wcLocationType'}
                        setter={setter}
                        getter={getter}
                        title={'Расположение санузла'}
                    />

                    <MyTextInput

                        type='number'
                        name={'wcsCount'}
                        setter={setter}
                        value={flat.wcsCount}
                        title={'Количество санузлов'}
                    />

                </Stack>
                <MySelect
                    items={heating_types}
                    name={'heatingType'}
                    setter={setter}
                    getter={getter}
                    title={'Отопление'}
                />


                <Stack
                    direction="row" spacing={2}
                >
                    <MySwitch

                        name={'hasGarage'}
                        getter={getter}
                        setter={setter}
                        title={"Гараж"}
                    />

                    <MySwitch

                        name={'hasBathhouse'}
                        getter={getter}
                        setter={setter}
                        title={"Баня"}
                    />
                    <MySwitch

                        name={'hasPool'}
                        getter={getter}
                        setter={setter}
                        title={"Бассейн"}
                    />

                    <MySwitch

                        name={'hasSecurity'}
                        getter={getter}
                        setter={setter}
                        title={"Охрана"}
                    />

                </Stack>

                <Stack
                    direction="row" spacing={2}
                >
                    <MySwitch
                        name={'hasTerrace'}
                        getter={getter}
                        setter={setter}
                        title={"Терраса"}
                    />

                    <MySwitch

                        name={'hasCellar'}
                        getter={getter}
                        setter={setter}
                        title={"Погреб"}
                    />

                </Stack>


            </>
        )}

        <MyDivider
            title={"Коммуникации"}
        />

        <Stack direction={'row'} spacing={2}>
            <MySwitch

                name={'hasElectricity'}
                getter={getter}
                setter={setter}
                title={"Электричество"}
            />

        </Stack>


        <Stack direction={'row'} spacing={2}>
            <MySwitch

                name={'hasWater'}
                getter={getter}
                setter={setter}
                title={"Вода"}
            />
            {hasWater && (
                <MySelect
                    title={"Тип"}
                    items={water_types}
                    flat={flat}
                    name={'waterType'}
                    getter={getter}
                    setter={setter}
                />
            )}

        </Stack>

        <Stack direction={'row'} spacing={2}>
            <MySwitch

                name={'hasGas'}
                getter={getter}
                setter={setter}
                title={"Газ"}
            />
            {hasGas && (
                <MySelect
                    title={"Тип"}
                    items={gas_types}
                    flat={flat}
                    name={'gasType'}
                    getter={getter}
                    setter={setter}
                />
            )}

        </Stack>



        <Stack direction={'row'} spacing={2}>
            <MySwitch

                name={'hasDrainage'}
                getter={getter}
                setter={setter}
                title={"Канализация"}
            />
            {hasDrainage && (
                <MySelect
                    title={"Тип"}
                    items={drainage_types}

                    name={'drainageType'}
                    getter={getter}
                    setter={setter}
                />
            )}

        </Stack>

        <FurnitureTechnics
            setter={setter}
            getter={getter}
        />



    </>);
}

export default Suburban;