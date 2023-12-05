
import MyButtonsGroup from "../MyButtonsGroup";
import { Box, FormLabel, Stack, Typography } from "@mui/material";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import MyDivider from "../MyDivider";
import { useObjectFormState } from "@/app/objects/create/store";
import FurnitureTechnics from "./FurnitureTechnics";

function FlatSale({
    form_data,
    // object,
    setter,
    getter,
    flat
}) {


    const object = useObjectFormState((state) => state.flat['object']);
    const deal_type = useObjectFormState((state) => state.flat.deal_type)
    const isNewBuilding = useObjectFormState((state) => state.flat.isNewBuilding)

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
                // flat={flat}
                title={'Тип недвижимости'}
                items={form_data.apartments}
                name={'isApartments'}
            // setter={setter}
            // value={flat.isApartments}
            // getter={getter}

            />
        </Box>

        <MyButtonsGroup
            // flat={flat}
            classname='mt-5'
            title='Количество комнат *'
            items={form_data.rooms}
            // setter={setter}
            // value={flat.rooms}
            name={'rooms'}
            // getter={getter}
            multipe={false}
            required={true}
        />


        {(Number(object) === 2) && (
            <MyTextInput
                // flat={flat}
                type='number'
                name={'roomsForSale'}
                // setter={setter}
                // value={flat.roomsForSale}
                title={'Комнат продаётся'}
                required={true}
            />
        )}

        {(Number(object) === 3) && (
            <MyTextInput
                // flat={flat}
                type='number'
                name={'shareAmount'}
                // setter={setter}
                // value={flat.shareAmount}
                title={'Размер доли'}
                required={true}
            />
        )}
        <MyTextInput
            flat={flat}
            // type='number'
            name={'cadNumber'}
            // setter={setter}
            // value={flat.cadNumber}
            title={'Кадастровый номер'}
        />

        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                type='number'
                name={'totalArea'}
                // setter={setter}
                // value={flat.totalArea}
                title={'Общая площадь'}
                required={true}
            />

            <MyTextInput
                type='number'
                name={'livingArea'}
                // setter={setter}
                // value={flat.livingArea}
                title={'Жилая площадь'}
            />
            <MyTextInput
                type='number'
                name={'kitchenArea'}
                // setter={setter}
                // value={flat.kitchenArea}
                title={'Площадь кухни'}
                required={true}
                requiredMessage={"Обязательное кроме студий"}
            />

            <Typography>
                Сумма жилой и кухни должна быть<br />
                 меньше общей минимум на 6кв.
            </Typography>

        </Stack>
        <Stack
            direction={'row'}
            spacing={2}
        >
            <MyTextInput

                name={'roomsArea'}
                // setter={setter}
                // value={flat.roomsArea}
                title={'Площадь комнат'}
            />
            <Typography>
                + для обозначения смежных комнат<br />
                - для раздельных комнат.
            </Typography>
        </Stack>


        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                type='number'
                name={'floor'}
                // setter={setter}
                // value={flat.floor}
                title={'Этаж'}
                required={true}
            />

            <MyTextInput
                type='number'
                name={'floorsCount'}
                // setter={setter}
                // value={flat.floorsCount}
                title={'Этажность'}
                required={true}
            />

            <MySwitch
                getter={getter}
                name={'isPenthouse'}
                // value={flat.isPenthouse}
                // setter={setter}
                title={"Пентхаус"}
            />


        </Stack>
        <Stack
            direction="row" spacing={2}
        >
            <MySelect
                items={form_data.plan}
                name={'plan'}
                // setter={setter}
                // getter={getter}
                title={"Планировка"}
                required={true}
                requiredMessage={"Обязательное от 2к"}
            // value={plan}
            />
            <MySwitch
                // flat={flat}
                name={'isEuroFlat'}
                // value={isEuroFlat}
                // setter={setter}
                // getter={getter}
                title={"ЕвроПланировка"}
            />

        </Stack>
        <MySelect
            // flat={flat}
            items={form_data.repair}
            name={'repair'}
            // setter={setter}
            // getter={getter}
            title={"Ремонт"}
            required={true}
        // value={repair}
        />



        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                // flat={flat}
                type='number'
                name={'balconiesCount'}
                // setter={setter}
                // value={flat.balconiesCount}
                title={'Балконы'}
            />

            <MyTextInput
                // flat={flat}
                type='number'
                name={'loggiasCount'}
                // setter={setter}
                // value={flat.loggiasCount}
                title={'Лоджии'}
            />


        </Stack>

        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                // flat={flat}
                type='number'
                name={'combinedWcsCount'}
                // setter={setter}
                // value={flat.combinedWcsCount}
                title={'Совмешённые СУ'}
            />

            <MyTextInput
                // flat={flat}
                type='number'
                name={'separateWcsCount'}
                // setter={setter}
                // value={flat.separateWcsCount}
                title={'Раздельные СУ'}
            />
            <MySwitch
                // flat={flat}
                name={'hasBathtub'}
                // value={hasBathtub}
                // getter={getter}
                // setter={setter}
                title={"Ванна"}
            />
            <MySwitch
                // flat={flat}
                name={'hasShower'}
                // value={hasShower}
                // getter={getter}
                // setter={setter}
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



            <MySwitch
                // flat={flat}
                name={'windowsYard'}
                // getter={getter}
                // setter={setter}
                title={"Во двор"}
            />
            <MySwitch
                // flat={flat}
                name={'windowsStreet'}
                // getter={getter}
                // setter={setter}
                title={"На улицу"}
            />
            <MySwitch
                // flat={flat}
                name={'windowsSunny'}
                // getter={getter}
                // setter={setter}
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
                    // flat={flat}
                    title={'Готовность'}
                    items={form_data.newBuilding}
                    name={'isNewBuilding'}
                // setter={setter}
                // getter={getter}

                />
            </Box>
        )}


        {Number(isNewBuilding) === 0 && (
            <MyTextInput
                // flat={flat}
                type='number'
                name={'buildYear'}
                // setter={setter}
                // value={flat.buildYear}
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
                        items={form_data.deadlineQuarter}
                        name={'deadlineQuarter'}
                        // setter={setter}
                        // getter={getter}
                        title={'Квартал'}
                    />

                    <MySelect
                        width={300}
                        items={form_data.deadlineYear}
                        name={'deadlineYear'}
                        // setter={setter}
                        // getter={getter}
                        title={'Год'}
                    />

                    <MySwitch
                        name={'isComplete'}
                        // setter={setter}
                        // getter={getter}
                        title={"Сдан"}
                    />

                </Stack>
            </>

        )}


        <MySelect
            items={form_data.material.filter((item) => item.main === 1)}
            name={'material'}
            // setter={setter}
            // getter={getter}
            title={"Материал"}
            required={true}

        />

        <Stack
            direction="row" spacing={2}
        >

            <MyTextInput
                type='number'
                name={'passengerLiftsCount'}
                // setter={setter}
                value={flat.passengerLiftsCount}
                title={'Пассажирские лифты'}
            />

            <MyTextInput

                type='number'
                name={'cargoLiftsCount'}
                // setter={setter}
                value={flat.cargoLiftsCount}
                title={'Грузовые лифты'}
            />


        </Stack>

        <MySelect

            items={form_data.parking}
            name={'parking'}
            // setter={setter}
            // getter={getter}
            title={"Парковка"}

        />

        <FurnitureTechnics
        // setter={setter}
        // getter={getter}
        />


    </>);
}

export default FlatSale;