
import { useState } from "react";
import MyButtonsGroup from "../MyButtonsGroup";
import { Box, FormLabel, Stack } from "@mui/material";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import MyDivider from "../MyDivider";

function Suburban({
    flat,
    form_data,
    deal_type,
    flat_object

}) {



    const [bedroomsCount, setBedroomsCount] = useState(flat.bedroomsCount)
    const [totalArea, setTotalArea] = useState(flat.totalArea)
    const [landArea, setLandArea] = useState(flat.landArea)
    const [floorsCount, setFloorsCount] = useState(flat.floorsCount)
    const [buildYear, setBuildYear] = useState(flat.buildYear)
    const [material, setMaterial] = useState(flat.material)
    const [repair, setRepair] = useState(flat.repair)
    const [hasFridge, setHasFridge] = useState(flat.hasFridge);
    const [hasFurniture, setHasFurniture] = useState(flat.hasFurniture);
    const [hasKitchenFurniture, setHasKitchenFurniture] = useState(flat.hasKitchenFurniture);
    const [hasTv, setHasTv] = useState(flat.hasTv);
    const [hasConditioner, setHasConditioner] = useState(flat.hasConditioner);
    const [hasDishwasher, setHasDishwasher] = useState(flat.hasDishwasher);
    const [hasWasher, setHasWasher] = useState(flat.hasWasher);
    const [landType, setLandType] = useState(flat.landType);
    const [landCategory, setLandCategory] = useState(flat.landCategory);
    const [shareAmount, setShareAmount] = useState(flat.shareAmount);
    const [cadNumber, setCadNumber] = useState(flat.cadNumber);
    const [buildingCadNumber, setBuildingCadNumber] = useState(flat.buildingCadNumber);
    const [isLandWithContract, setIsLandWithContract] = useState(flat.isLandWithContract);
    const [condition, setCondition] = useState(flat.condition);
    const [wcLocationType, setWcLocationType] = useState(flat.wcLocationType);
    const [wcsCount, setWcsCount] = useState(flat.wcsCount);
    const [hasTerrace, setHasTerrace] = useState(flat.hasTerrace);
    const [hasCellar, setHasCellar] = useState(flat.hasCellar);
    const [heatingType, setHeatingType] = useState(flat.heatingType);
    const [hasSecurity, setHasSecurity] = useState(flat.hasSecurity);
    const [hasBathhouse, setHasBathhouse] = useState(flat.hasBathhouse);
    const [hasGarage, setHasGarage] = useState(flat.hasGarage);
    const [hasPool, setHasPool] = useState(flat.hasPool);
    const [hasElectricity, setHasElectricity] = useState(flat.hasElectricity);
    const [hasGas, setHasGas] = useState(flat.hasGas);
    const [gasType, setGasType] = useState(flat.gasType);
    const [hasWater, setHasWater] = useState(flat.hasWater);
    const [waterType, setWaterType] = useState(flat.waterType);
    const [hasDrainage, setHasDrainage] = useState(flat.hasDrainage);
    const [drainageType, setDrainageType] = useState(flat.drainageType);




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
        // return true;

    })

    return (<>



        <MyDivider
            title={'Участок'}
        />
        <Stack spacing={2} direction={"row"}>
            <MyTextInput
                flat={flat}
                type='number'
                name={'landArea'}
                setter={setLandArea}
                value={landArea}
                title={'Площадь участка (сот.)'}
            />

            <MyTextInput
                flat={flat}
                width={300}
                // type='number'
                name={'cadNumber'}
                setter={setCadNumber}
                value={cadNumber}
                title={'Кадастровый номер участка'}
            />
        </Stack>
        <Stack spacing={2} direction={"row"}>
            <MySelect
                title={'Разрешенное использование'}
                flat={flat}
                name={'landType'}
                items={landTypes}
                value={landType}
                setter={setLandType}
            />

            <MySelect
                title={'Категория земель'}
                flat={flat}
                name={'landCategory'}
                items={form_data.land_category}
                value={landCategory}
                setter={setLandCategory}
            />
        </Stack>
        <Stack spacing={2} direction={"row"}>
            <MySwitch
                flat={flat}
                name={'isLandWithContract'}
                value={isLandWithContract}
                setter={setIsLandWithContract}
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
                        flat={flat}
                        width={300}
                        // type='number'
                        name={'buildingCadNumber'}
                        setter={setBuildingCadNumber}
                        value={buildingCadNumber}
                        title={'Кадастровый номер дома'}
                    />
                </Stack>


                <Stack
                    direction="row" spacing={2}
                >
                    <MyTextInput
                        flat={flat}
                        type='number'
                        name={'totalArea'}
                        setter={setTotalArea}
                        value={totalArea}
                        title={'Площадь дома'}
                    />
                    <MyTextInput
                        flat={flat}
                        type='number'
                        name={'rooms'}
                        setter={setBedroomsCount}
                        value={bedroomsCount}
                        title={'Количество спален'}
                    />
                    <MyTextInput
                        flat={flat}
                        type='number'
                        name={'floorsCount'}
                        setter={setFloorsCount}
                        value={floorsCount}
                        title={'Этажность'}
                    />
                </Stack>

                {
                    (Number(flat_object) === 6) && (
                        <MyTextInput
                            flat={flat}
                            type='number'
                            name={'shareAmount'}
                            setter={setShareAmount}
                            value={shareAmount}
                            title={'Размер доли'}
                        />
                    )
                }

                <Stack
                    direction="row" spacing={2}
                >

                    <MySelect
                        flat={flat}
                        items={conditions}
                        name={'condition'}
                        setter={setCondition}
                        title={"Состояние"}
                        value={condition}
                    />

                    <MySelect
                        flat={flat}
                        items={form_data.repair}
                        name={'repair'}
                        setter={setRepair}
                        title={"Ремонт"}
                        value={repair}
                    />

                </Stack>

                <Stack
                    direction="row" spacing={2}
                >
                    <MyTextInput
                        flat={flat}
                        type='number'
                        name={'buildYear'}
                        setter={setBuildYear}
                        value={buildYear}
                        title={'Год постройки'}
                    />

                    <MySelect
                        flat={flat}
                        items={materials}
                        name={'material'}
                        setter={setMaterial}
                        title={"Материал"}
                        value={material}
                    />
                </Stack>

                <Stack
                    direction="row" spacing={2}
                >
                    <MySelect
                        flat={flat}
                        items={form_data.wc_location_type}
                        name={'wcLocationType'}
                        setter={setWcLocationType}
                        value={wcLocationType}
                        title={'Расположение санузла'}
                    />

                    <MyTextInput
                        flat={flat}
                        type='number'
                        name={'wcsCount'}
                        setter={setWcsCount}
                        value={wcsCount}
                        title={'Количество санузлов'}
                    />

                </Stack>
                <MySelect
                    flat={flat}
                    items={heating_types}
                    name={'heatingType'}
                    setter={setHeatingType}
                    value={heatingType}
                    title={'Отопление'}
                />


                <Stack
                    direction="row" spacing={2}
                >
                    <MySwitch
                        flat={flat}
                        name={'hasGarage'}
                        value={hasGarage}
                        setter={setHasGarage}
                        title={"Гараж"}
                    />

                    <MySwitch
                        flat={flat}
                        name={'hasBathhouse'}
                        value={hasBathhouse}
                        setter={setHasBathhouse}
                        title={"Баня"}
                    />
                    <MySwitch
                        flat={flat}
                        name={'hasPool'}
                        value={hasPool}
                        setter={setHasPool}
                        title={"Бассейн"}
                    />

                    <MySwitch
                        flat={flat}
                        name={'hasSecurity'}
                        value={hasSecurity}
                        setter={setHasSecurity}
                        title={"Охрана"}
                    />

                </Stack>

                <Stack
                    direction="row" spacing={2}
                >
                    <MySwitch
                        flat={flat}
                        name={'hasTerrace'}
                        value={hasTerrace}
                        setter={setHasTerrace}
                        title={"Терраса"}
                    />

                    <MySwitch
                        flat={flat}
                        name={'hasCellar'}
                        value={hasCellar}
                        setter={setHasCellar}
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
                flat={flat}
                name={'hasElectricity'}
                value={hasElectricity}
                setter={setHasElectricity}
                title={"Электричество"}
            />

        </Stack>


        <Stack direction={'row'} spacing={2}>
            <MySwitch
                flat={flat}
                name={'hasWater'}
                value={hasWater}
                setter={setHasWater}
                title={"Вода"}
            />
            {hasWater && (
                <MySelect
                    title={"Тип"}
                    items={water_types}
                    flat={flat}
                    name={'waterType'}
                    value={waterType}
                    setter={setWaterType}
                />
            )}

        </Stack>

        <Stack direction={'row'} spacing={2}>
            <MySwitch
                flat={flat}
                name={'hasGas'}
                value={hasGas}
                setter={setHasGas}
                title={"Газ"}
            />
            {hasGas && (
                <MySelect
                    title={"Тип"}
                    items={gas_types}
                    flat={flat}
                    name={'gasType'}
                    value={gasType}
                    setter={setGasType}
                />
            )}

        </Stack>



        <Stack direction={'row'} spacing={2}>
            <MySwitch
                flat={flat}
                name={'hasDrainage'}
                value={hasDrainage}
                setter={setHasDrainage}
                title={"Канализация"}
            />
            {hasDrainage && (
                <MySelect
                    title={"Тип"}
                    items={drainage_types}
                    flat={flat}
                    name={'gasType'}
                    value={drainageType}
                    setter={setDrainageType}
                />
            )}

        </Stack>

        <MyDivider
            title={"Мебель/техника"}
        />


        <Stack
            direction="row" spacing={2}
        >

            <MySwitch
                flat={flat}
                name={'hasFurniture'}
                value={hasFurniture}
                setter={setHasFurniture}
                title={"Мебель в комнатах"}
            />
            <MySwitch
                flat={flat}
                name={'hasKitchenFurniture'}
                value={hasKitchenFurniture}
                setter={setHasKitchenFurniture}
                title={"Мебель на кухне"}
            />

        </Stack>
        <Stack
            direction="row" spacing={2}
        >

            <MySwitch
                flat={flat}
                name={'hasFridge'}
                value={hasFridge}
                setter={setHasFridge}
                title={"Холодильник"}
            />
            <MySwitch
                flat={flat}
                name={'hasWasher'}
                value={hasWasher}
                setter={setHasWasher}
                title={"Стиралка"}
            />
            <MySwitch
                flat={flat}
                name={'hasTv'}
                value={hasTv}
                setter={setHasTv}
                title={"Телевизор"}
            />
            <MySwitch
                flat={flat}
                name={'hasConditioner'}
                value={hasConditioner}
                setter={setHasConditioner}
                title={"Кондиционер"}
            />
            <MySwitch
                flat={flat}
                name={'hasDishwasher'}
                value={hasDishwasher}
                setter={setHasDishwasher}
                title={"Посудомойка"}
            />

        </Stack>



    </>);
}

export default Suburban;