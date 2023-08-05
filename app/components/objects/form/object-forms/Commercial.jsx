
import { use, useEffect, useState } from "react";
import MyButtonsGroup from "../MyButtonsGroup";
import { Box, FormControlLabel, FormLabel, Grid, Stack, Switch, TextField, Typography } from "@mui/material";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import MyDivider from "../MyDivider";
// import compare from '../../../../heplers/heplers.js'
import { sortByName, chunkArray } from "@/app/heplers/heplers";
import MultipleSwitch from "../MultipleSwitch";

function Commercial({
    flat,
    form_data,
    deal_type,
    flat_object

}) {



    const [totalArea, setTotalArea] = useState(flat.totalArea)
    const [floor, setFloor] = useState(flat.floor)
    const [floorsCount, setFloorsCount] = useState(flat.floorsCount)
    const [buildYear, setBuildYear] = useState(flat.buildYear)
    const [material, setMaterial] = useState(flat.material)
    const [repair, setRepair] = useState(flat.repair)
    const [isNewBuilding, setIsNewBuilding] = useState(flat.isNewBuilding);
    const [deadlineMonth, setDeadlineMonth] = useState(flat.deadlineMonth)
    const [deadlineYear, setDeadlineYear] = useState(flat.deadlineYear)
    const [isComplete, setIsComplete] = useState(flat.isComplete)
    const [isApartments, setIsApartments] = useState(flat.isApartments);
    const [hasFridge, setHasFridge] = useState(flat.hasFridge);
    const [hasFurniture, setHasFurniture] = useState(flat.hasFurniture);
    const [mortgageAllowed, setMortgageAllowed] = useState(flat.mortgageAllowed);
    const [price, setPrice] = useState(flat.price);
    const [currency, setCurrency] = useState(flat.currency);
    const [deposit, setDeposit] = useState(flat.deposit);
    const [fee, setFee] = useState(flat.fee);
    const [parking, setParking] = useState(flat.parking);
    const [saleType, setSaleType] = useState(flat.saleType);
    const [roomsForSale, setRoomsForSale] = useState(flat.roomsForSale);
    const [shareAmount, setShareAmount] = useState(flat.shareAmount);
    const [cadNumber, setCadNumber] = useState(flat.cadNumber);
    const [buildingType, setBuildingType] = useState(flat.buildingType);
    const [buildingClass, setBuildingClass] = useState(flat.buildingClass);
    const [buildingTotalArea, setBuildingTotalArea] = useState(flat.buildingTotalArea);
    const [parkingPlacesCount, setParkingPlacesCount] = useState(flat.parkingPlacesCount);
    const [parkingPlacesPrice, setParkingPlacesPrice] = useState(flat.parkingPlacesPrice);
    const [parkingIsFree, setParkingIsFree] = useState(flat.parkingIsFree);
    const [ceilingHeight, setCeilingHeight] = useState(flat.ceilingHeight);
    const [accessType, setAccessType] = useState(flat.accessType);
    const [houseLineType, setHouseLineType] = useState(flat.houseLineType);
    const [heatingType, setHeatingType] = useState(flat.heatingType);
    const [ventilationType, setVentilationType] = useState(flat.ventilationType);
    const [conditioningType, setConditioningType] = useState(flat.conditioningType);
    const [extinguishingSystemTypes, setExtinguishingSystemTypes] = useState(flat.extinguishingSystemTypes);
    const [liftTypes, setLiftTypes] = useState(flat.liftTypes);
    const [liftsCount, setLiftsCount] = useState(flat.liftsCount);
    const [buildingStatusType, setBuildingStatusType] = useState(flat.buildingStatusType);
    const [infrastructure, setInfrastructure] = useState(flat.infrastructure)
    const [taxNumber, setTaxNumber] = useState(flat.taxNumber);
    const [isLegalAddressProvided, setIsLegalAddressProvided] = useState(flat.isLegalAddressProvided);
    const [isOccupied, setIsOccupied] = useState(flat.isOccupied);
    const [freeMonth, setFreeMonth] = useState(flat.freeMonth);
    const [freeYear, setFreeYear] = useState(flat.freeYear);
    const [layout, setLayout] = useState(flat.layout);
    const [waterPipesCount, setWaterPipesCount] = useState(flat.waterPipesCount)
    const [power, setPower] = useState(flat.power);
    const [condition, setCondition] = useState(flat.condition)
    const [speciality, setSpeciality] = useState(flat.speciality)

    useEffect(() => {
        console.log(speciality)
    }, [speciality])



    const specialitiesHandler = (e) => {
        // let value = Number(e.target.value)
        console.log(e);

        if (speciality.includes(Number(e.target.value))) {
            setSpeciality(speciality.filter(item => item !== Number(e.target.value)));
        } else {
            setSpeciality(speciality => [...speciality, Number(e.target.value)])
        }

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

        setLiftsCount(new_array);
        flat.liftsCount = new_array;
    }, [liftTypes])

    // useEffect(() => {
    // console.log(liftsCount)
    // }, [liftsCount])

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
        setLiftsCount(new_array);
        flat.liftsCount = new_array;



    }

    const materials = form_data.material.filter((item) => {
        return item.commercial === 1
    })

    // objs.sort(compare);

    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })

    const conditions = form_data.condition.filter((item) => {
        return item.commercial === 1
    })

    const specialities = form_data.speciality.filter((item) => {
        if (flat_object === 11 || flat_object === 13) {
            return item.free === 1
        }
        if (flat_object === 19) {
            return item.rent === 1
        }
        if (flat_object === 20) {
            return item.ready === 1
        }

    })
    var max_specialities = 0;
    // max_specialities
    // const max_specialities = 5
    if (flat_object === 19) {
        max_specialities = 5
        // console.log(5);
    } else if (flat_object === 20) {
        max_specialities = 1
        // console.log(1);
    } else {
        max_specialities = 0
        // console.log(0);
    }
    // console.log(max_specialities)

    const getLiftName = (item) => {
        let currentLift = form_data.lift_type.filter((lift) => {
            // console.log(lift);
            // console.log(item);
            return Number(lift.id) === Number(item);

        })
        return currentLift[0].name;

    }

    const chunkedInfrastructure = chunkArray(form_data.infrastructure.sort(sortByName), Math.ceil(form_data.infrastructure.length / 4))
    // console.log(chunkedInfrastructure)
    const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.ceil(specialities.length / 4));
    // console.log(chunkedSpecialities);

    return (<>


        <MyDivider
            title={'Объект'}
        />
        <MyTextInput
            flat={flat}
            name={'cadNumber'}
            value={cadNumber}
            setter={setCadNumber}
            title={"Кадастровый номер"}

        />

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"
                flat={flat}
                name={'taxNumber'}
                value={taxNumber}
                setter={setTaxNumber}
                title={"Номер налоговой"}

            />
            <MySwitch
                flat={flat}
                value={isLegalAddressProvided}
                name={'isLegalAddressProvided'}
                setter={setIsLegalAddressProvided}
                title={"Юридический адрес предоставляется"}

            />
        </Stack>

        <MyTextInput
            type="number"
            flat={flat}
            name={'totalArea'}
            value={totalArea}
            setter={setTotalArea}
            title={"Общая площадь"}

        />



        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                flat={flat}
                type='number'
                name={'floor'}
                setter={setFloor}
                value={floor}
                title={'Этаж'}
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

        <Stack
            direction={"row"}
            spacing={2}
        >


            <MySelect
                // width={100}
                title={'Планировка'}
                items={form_data.layout}
                flat={flat}
                name={'layout'}
                value={layout}
                setter={setLayout}
            />

            <MyTextInput
                type="number"
                title={'Высота потолков'}
                flat={flat}
                name={'ceilingHeight'}
                value={ceilingHeight}
                setter={setCeilingHeight}
            />

        </Stack>




        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                // width={350}
                value={waterPipesCount}
                flat={flat}
                name={'waterPipesCount'}
                setter={setWaterPipesCount}
                title={"Мокрых точек"}
                type="number"

            />
            <MyTextInput
                // width={350}
                value={power}
                flat={flat}
                name={'power'}
                setter={setPower}
                title={"Мощность (кВт)"}
                type="number"

            />
        </Stack>


        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect
                flat={flat}
                items={conditions}
                name={'condition'}
                value={condition}
                setter={setCondition}
                title={"Состояние"}

            />
            <MySwitch
                flat={flat}
                value={hasFurniture}
                name={'hasFurniture'}
                setter={setHasFurniture}
                title={"Мебель"}

            />
        </Stack>
        <MySelect

            flat={flat}
            items={form_data.access_type}
            name={'accessType'}
            setter={setAccessType}
            title={"Вход"}
            value={accessType}
        // width={200}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect
                flat={flat}
                items={form_data.parking}
                name={'parking'}
                setter={setParking}
                title={"Парковка"}
                value={parking}
                width={200}
            />
            <MyTextInput
                flat={flat}
                name={'parkingPlacesCount'}
                setter={setParkingPlacesCount}
                title={'Количество мест'}
                value={parkingPlacesCount}
                type="number"

            />

            <MySwitch
                flat={flat}
                name={'parkingIsFree'}
                setter={setParkingIsFree}
                title={'Бесплатная'}
                value={parkingIsFree}
            />
            {!parkingIsFree && (
                <MyTextInput
                    flat={flat}
                    name={'parkingPlacesPrice'}
                    setter={setParkingPlacesPrice}
                    title={'Стоимость место/месяц'}
                    value={parkingPlacesPrice}
                    type="number"
                    width={350}
                />
            )
            }
        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch
                flat={flat}
                value={isOccupied}
                name={'isOccupied'}
                setter={setIsOccupied}
                title={isOccupied ? "Помещение занято до " : "Помещение занято"}

            />

            {isOccupied && (
                <>
                    <MySelect
                        width={150}
                        title={'Месяц'}
                        items={form_data.month}
                        flat={flat}
                        name={'freeMonth'}
                        value={freeMonth}
                        setter={setFreeMonth}
                    />

                    <MySelect
                        width={100}
                        title={'Год'}
                        items={form_data.year}
                        flat={flat}
                        name={'freeYear'}
                        value={freeYear}
                        setter={setFreeYear}
                    />
                </>

            )}
        </Stack>




        <MyDivider
            title={'Назначение'}
        />
        <Grid container>
            {
                chunkedSpecialities.map((arr, index) => {
                    return (
                        <Grid xs={12} md={4} lg={3}
                            key={'speciality_col' + index}
                            item
                            alignItems={'start'}
                        >
                            <Stack
                                alignItems={"start"}
                                spacing={2}
                                direction={"column"}
                            >
                                {arr.map((item, index) => {

                                    // console.log(speciality.length >= max_specialities && max_specialities > 0 && (!speciality.includes(item.id)))
                                    return (
                                        <MultipleSwitch
                                            disabled={speciality.length >= max_specialities && max_specialities > 0 && (!speciality.includes(item.id))}
                                            checked={speciality.includes(item.id)}
                                            key={'speciality_switch_' + item.id}
                                            state={speciality}
                                            item={item}
                                            handler={specialitiesHandler}
                                            setter={setSpeciality}
                                        // getState={() => speciality}
                                        />
                                    )

                                })}

                            </Stack>
                        </Grid>
                    )
                })
            }
        </Grid>

        <MyDivider
            title={'Инфраструктура'}
        />
        <Grid container>
            {
                chunkedInfrastructure.map((arr, index) => {
                    return (
                        <Grid xs={12} md={4} lg={3}
                            key={'infrastructure_col' + index}
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
                                            checked={infrastructure.includes(item.id)}
                                            key={'infrastructure_switch_' + item.id}
                                            state={infrastructure}
                                            item={item}
                                            setter={setInfrastructure}
                                        />
                                    )

                                })}

                            </Stack>
                        </Grid>
                    )
                })
            }
        </Grid>






        <MyDivider
            title={'Здание'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect
                title={'Тип здания'}
                items={form_data.building_type.sort(sortByName)}
                flat={flat}
                name={'buildingType'}
                value={buildingType}
                setter={setBuildingType}
            />

            <MySelect
                title={'Класс здания'}
                items={form_data.building_class_type}
                flat={flat}
                name={'buildingClass'}
                value={buildingClass}
                setter={setBuildingClass}
                width={150}
            />
            <MySelect
                title={'Статус здания'}
                items={form_data.building_status_type}
                flat={flat}
                name={'buildingStatusType'}
                value={buildingStatusType}
                setter={setBuildingStatusType}
                width={200}
            />

            <MyTextInput
                type="number"
                title={'Площадь здания'}
                flat={flat}
                name={'buildingTotalArea'}
                value={buildingTotalArea}
                setter={setBuildingTotalArea}
            />

        </Stack>
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect
                flat={flat}
                items={form_data.house_line_type}
                name={'houseLineType'}
                setter={setHouseLineType}
                title={"Линия домов"}
                value={houseLineType}
                width={200}
            />

        </Stack>
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"
                title={'Этажность'}
                flat={flat}
                name={'floorsCount'}
                value={floorsCount}
                setter={setFloorsCount}
            />
            <MySelect
                flat={flat}
                items={materials}
                name={'material'}
                value={material}
                setter={setMaterial}
                title={'Материал'}
            />

            <MyTextInput
                type="number"
                title={'Год постройки'}
                flat={flat}
                name={'buildYear'}
                value={buildYear}
                setter={setBuildYear}
            />


        </Stack>


        <MySelect
            flat={flat}
            items={form_data.infrastructure}
            name={'infrastructure'}
            setter={setInfrastructure}
            title={"Инфраструктура"}
            multiple={true}
            value={infrastructure}
        // width={200}
        />

        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect
                flat={flat}
                items={heating_types}
                name={'heatingType'}
                setter={setHeatingType}
                title={"Отопление"}
                value={heatingType}
                width={200}
            />

            <MySelect
                flat={flat}
                items={form_data.communication_ventilation_type}
                name={'ventilationType'}
                setter={setVentilationType}
                title={"Вентиляция"}
                value={ventilationType}
                width={200}
            />
            <MySelect
                flat={flat}
                items={form_data.communication_conditioning_type}
                name={'conditioningType'}
                setter={setConditioningType}
                title={"Кондиционирование"}
                value={conditioningType}
                width={200}
            />

            <MySelect
                flat={flat}
                items={form_data.extinguishing_system_type}
                name={'conditioningType'}
                setter={setExtinguishingSystemTypes}
                title={"Пожаротушение"}
                multiple={true}
                value={extinguishingSystemTypes}
            // width={200}
            />


        </Stack>

        <MySelect
            flat={flat}
            items={form_data.lift_type}
            name={'liftTypes'}
            setter={setLiftTypes}
            title={"Лифты"}
            multiple={true}
            value={liftTypes}
        // width={200}
        />

        {

            (liftsCount.length > 0)
            &&
            (
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
                                        defaultValue={item.count}
                                        onChange={(e) => { updateLiftsCount(item.id, e.target.value) }}

                                    ></TextField>
                                </Stack>
                            )
                        }
                        )}
                </>
            )
        }

        <MyDivider
            title={'Коммуникации'}
        />





    </>);
}

export default Commercial;