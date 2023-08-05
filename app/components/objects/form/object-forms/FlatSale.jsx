
import { useState } from "react";
import MyButtonsGroup from "../MyButtonsGroup";
import { Box, FormLabel, Stack } from "@mui/material";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import MyDivider from "../MyDivider";

function FlatSale({
    flat,
    form_data,
    deal_type,
    flat_object

}) {



    const [rooms, setRooms] = useState(flat.rooms)
    const [totalArea, setTotalArea] = useState(flat.totalArea)
    const [livingArea, setLivingArea] = useState(flat.livingArea)
    const [kitchenArea, setKitchenArea] = useState(flat.kitchenArea)
    const [floor, setFloor] = useState(flat.floor)
    const [floorsCount, setFloorsCount] = useState(flat.floorsCount)
    const [balconiesCount, setBalconiesCount] = useState(flat.balconiesCount)
    const [loggiasCount, setLoggiasCount] = useState(flat.loggiasCount)
    const [combinedWcsCount, setCombinedWcsCount] = useState(flat.combinedWcsCount)
    const [separateWcsCount, setSeparateWcsCount] = useState(flat.separateWcsCount)
    const [hasBathtub, setHasBathtub] = useState(flat.hasBathtub)
    const [hasShower, setHasShower] = useState(flat.hasShower)
    const [windowsStreet, setWindowsStreet] = useState(flat.windowsStreet)
    const [windowsYard, setWindowsYard] = useState(flat.windowsYard)
    const [windowsSunny, setWindowsSunny] = useState(flat.windowsSunny)
    const [passengerLiftsCount, setPassengerLiftsCount] = useState(flat.passengerLiftsCount)
    const [cargoLiftsCount, setCargoLiftsCount] = useState(flat.cargoLiftsCount)
    const [buildYear, setBuildYear] = useState(flat.buildYear)
    const [material, setMaterial] = useState(flat.material)
    const [plan, setPlan] = useState(flat.plan)
    const [repair, setRepair] = useState(flat.repair)
    const [isNewBuilding, setIsNewBuilding] = useState(flat.isNewBuilding);
    const [deadlineMonth, setDeadlineMonth] = useState(flat.deadlineMonth)
    const [deadlineYear, setDeadlineYear] = useState(flat.deadlineYear)
    const [isComplete, setIsComplete] = useState(flat.isComplete)
    const [isApartments, setIsApartments] = useState(flat.isApartments);
    const [hasFridge, setHasFridge] = useState(flat.hasFridge);
    const [hasFurniture, setHasFurniture] = useState(flat.hasFurniture);
    const [hasKitchenFurniture, setHasKitchenFurniture] = useState(flat.hasKitchenFurniture);
    const [hasTv, setHasTv] = useState(flat.hasTv);
    const [hasConditioner, setHasConditioner] = useState(flat.hasConditioner);
    const [hasDishwasher, setHasDishwasher] = useState(flat.hasDishwasher);
    const [hasWasher, setHasWasher] = useState(flat.hasWasher)
    
    const [parking, setParking] = useState(flat.parking);
    const [isEuroFlat, setIsEuroFlat] = useState(flat.isEuroFlat);
    const [isPenthouse, setIsPenthouse] = useState(flat.isPenthouse);

    const [roomsForSale, setRoomsForSale] = useState(flat.roomsForSale)
    const [shareAmount, setShareAmount] = useState(flat.shareAmount)
    const [cadNumber, setCadNumber] = useState(flat.cadNumber)








    return (<>







        <MyDivider
            title={'Объект'}
        />




        <Box
            sx={{
                width: 300
            }}
        >
            <MyButtonsGroup
                flat={flat}
                title={'Тип недвижимости'}
                items={form_data.apartments}
                name={'isApartments'}
                setter={setIsApartments}
                value={isApartments}

            />
        </Box>

        <MyButtonsGroup
            flat={flat}
            classname='mt-5'
            title='Количество комнат'
            items={form_data.rooms}
            setter={setRooms}
            value={rooms}
            name={'rooms'}
            multipe={false}
        />


        {(Number(flat_object) === 2) && (
            <MyTextInput
                flat={flat}
                type='number'
                name={'roomsForSale'}
                setter={setRoomsForSale}
                value={roomsForSale}
                title={'Комнат продаётся'}
            />
        )}

        {(Number(flat_object) === 3) && (
            <MyTextInput
                flat={flat}
                type='number'
                name={'shareAmount'}
                setter={setShareAmount}
                value={shareAmount}
                title={'Размер доли'}
            />
        )}
        <MyTextInput
            flat={flat}
            // type='number'
            name={'cadNumber'}
            setter={setCadNumber}
            value={cadNumber}
            title={'Кадастровый номер'}
        />

        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                flat={flat}
                type='number'
                name={'totalArea'}
                setter={setTotalArea}
                value={totalArea}
                title={'Общая площадь'}
            />

            <MyTextInput
                flat={flat}
                type='number'
                name={'livingArea'}
                setter={setLivingArea}
                value={livingArea}
                title={'Жилая площадь'}
            />
            <MyTextInput
                flat={flat}
                type='number'
                name={'kitchenArea'}
                setter={setKitchenArea}
                value={kitchenArea}
                title={'Площадь кухни'}
            />

        </Stack>

        <Stack
            direction="row" spacing={2}
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

            <MySwitch
                flat={flat}
                name={'isPenthouse'}
                value={isPenthouse}
                setter={setIsPenthouse}
                title={"Пентхаус"}
            />


        </Stack>
        <Stack
            direction="row" spacing={2}
        >
            <MySelect
                flat={flat}
                items={form_data.plan}
                name={'plan'}
                setter={setPlan}
                title={"Планировка"}
                value={plan}
            />
            <MySwitch
                flat={flat}
                name={'isEuroFlat'}
                value={isEuroFlat}
                setter={setIsEuroFlat}
                title={"ЕвроПланировка"}
            />

        </Stack>
        <MySelect
            flat={flat}
            items={form_data.repair}
            name={'repair'}
            setter={setRepair}
            title={"Ремонт"}
            value={repair}
        />



        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                flat={flat}
                type='number'
                name={'balconiesCount'}
                setter={setBalconiesCount}
                value={balconiesCount}
                title={'Балконы'}
            />

            <MyTextInput
                flat={flat}
                type='number'
                name={'loggiasCount'}
                setter={setLoggiasCount}
                value={loggiasCount}
                title={'Лоджии'}
            />


        </Stack>

        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                flat={flat}
                type='number'
                name={'combinedWcsCount'}
                setter={setCombinedWcsCount}
                value={combinedWcsCount}
                title={'Совмешённые СУ'}
            />

            <MyTextInput
                flat={flat}
                type='number'
                name={'separateWcsCount'}
                setter={setSeparateWcsCount}
                value={separateWcsCount}
                title={'Раздельные СУ'}
            />
            <MySwitch
                flat={flat}
                name={'hasBathtub'}
                value={hasBathtub}
                setter={setHasBathtub}
                title={"Ванна"}
            />
            <MySwitch
                flat={flat}
                name={'setHasShower'}
                value={hasShower}
                setter={setHasShower}
                title={"Душ"}
            />

        </Stack>


        <FormLabel>Окна</FormLabel>
        <Stack
            direction="row" spacing={2}
        // className="flex"
        // className="content-center"
        // style={{
        //     display:"flex"
        // }}
        >

            {/* <Typography>Окна</Typography> */}

            <MySwitch
                flat={flat}
                name={'windowsYard'}
                value={windowsYard}
                setter={setWindowsYard}
                title={"Во двор"}
            />
            <MySwitch
                flat={flat}
                name={'windowsStreet'}
                value={windowsStreet}
                setter={setWindowsStreet}
                title={"На улицу"}
            />
            <MySwitch
                flat={flat}
                name={'windowsSunny'}
                value={windowsSunny}
                setter={setWindowsSunny}
                title={"На солнечную сторону"}
            />


        </Stack>


        <MyDivider
            title={"Дом"}
        />

        {Number(deal_type) === 1 && (
            <Box
                sx={{
                    width: 300
                }}
            >
                <MyButtonsGroup
                    flat={flat}
                    title={'Готовность'}
                    items={form_data.newBuilding}
                    name={'isNewBuilding'}
                    setter={setIsNewBuilding}
                    value={isNewBuilding}

                />
            </Box>
        )}


        {Number(isNewBuilding) === 0 && (
            <MyTextInput
                flat={flat}
                type='number'
                name={'buildYear'}
                setter={setBuildYear}
                value={buildYear}
                title={'Год постройки'}
            />

        )}

        {Number(isNewBuilding) === 1 && (

            <>
                <Stack
                    direction="row" spacing={2}
                // width={500}
                >

                    <MySelect
                        width={100}
                        flat={flat}
                        items={form_data.deadlineMounth}
                        // type='number'
                        name={'deadlineMounth'}
                        setter={setDeadlineMonth}
                        value={deadlineMonth}
                        title={'Квартал'}
                    />

                    <MySelect
                        flat={flat}
                        width={300}
                        items={form_data.deadlineYear}
                        // type='number'
                        name={'deadlineYear'}
                        setter={setDeadlineYear}
                        value={deadlineYear}
                        title={'Год'}
                    />

                    <MySwitch
                        flat={flat}
                        name={'isComplete'}
                        value={isComplete}
                        setter={setIsComplete}
                        title={"Сдан"}
                    />

                </Stack>
            </>

        )}


        <MySelect
            flat={flat}
            items={form_data.material.filter((item) => item.main === 1)}
            name={'material'}
            setter={setMaterial}
            title={"Материал"}
            value={material}
        />

        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                flat={flat}
                type='number'
                name={'passengerLiftsCount'}
                setter={setPassengerLiftsCount}
                value={passengerLiftsCount}
                title={'Пассажирские лифты'}
            />

            <MyTextInput
                flat={flat}
                type='number'
                name={'cargoLiftsCount'}
                setter={setCargoLiftsCount}
                value={cargoLiftsCount}
                title={'Грузовые лифты'}
            />


        </Stack>

        <MySelect
            flat={flat}
            items={form_data.parking}
            name={'parking'}
            setter={setParking}
            title={"Парковка"}
            value={parking}
        />

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

{/* 
        <MyDivider title={'Условия'} />


        {Number(deal_type) === 1 && (
            <Box
                sx={{
                    width: 300
                }}
            >
                <MyButtonsGroup
                    flat={flat}
                    title={'Тип продажи'}
                    items={form_data.sale_type}
                    name={'saleType'}
                    setter={setSaleType}
                    value={saleType}

                />
            </Box>
        )}

        {Number(deal_type) === 2 && (
            <Stack
                direction="row" spacing={2}
            >

                <MySwitch
                    flat={flat}
                    name={'childrenAllowed'}
                    value={childrenAllowed}
                    setter={setChildrenAllowed}
                    title={"Можно с детьми"}
                />
                <MySwitch
                    flat={flat}
                    name={'petsAllowed'}
                    value={petsAllowed}
                    setter={setPetsAllowed}
                    title={"Можно с животными"}
                />

            </Stack>
        )}


        <Stack
            direction="row" spacing={2}
        >
            <MyTextInput
                type='number'
                value={price}
                setter={setPrice}
                name={'price'}
                title={'Цена'}
                flat={flat}
            />
            <MySelect
                flat={flat}
                items={form_data.currency}
                name={'currency'}
                setter={setCurrency}
                title={'Валюта'}
                value={currency}
                width={150}
            />
            <MySwitch
                flat={flat}
                name={'mortgageAllowed'}
                value={mortgageAllowed}
                setter={setMortgageAllowed}
                title={"Возможна ипотека"}
            />
        </Stack>

        {Number(deal_type) === 2 && (
            <>
                <MyTextInput
                    type='number'
                    value={deposit}
                    setter={setDeposit}
                    name={'deposit'}
                    title={'Депозит'}
                    flat={flat}
                />

                <MyTextInput
                    type='number'
                    value={fee}
                    setter={setFee}
                    name={'fee'}
                    title={'Комиссия'}
                    flat={flat}
                />
            </>
        )} */}

    </>);
}

export default FlatSale;