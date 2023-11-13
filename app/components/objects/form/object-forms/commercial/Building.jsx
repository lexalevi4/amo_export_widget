import { Stack } from "@mui/material";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";
import MyTextInput from "../../MyTextInput";
import MyDivider from "../../MyDivider";
import { sortByName } from "@/app/heplers/heplers";
import Lifts from "./Lifts";
import { useObjectFormState } from "@/app/objects/create/store";

function Building({ flat,
    //  setter, getter,
      form_data, flat_object }) {

    // const parkingIsFree = getter('parkingIsFree');
    const parkingIsFree = useObjectFormState((state) => state.flat['parkingIsFree']);
    const conditions = form_data.condition_type.filter((item) => {
        return item.commercial === 1
    })
    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })


    return (<>
        <MySelect

            items={conditions}
            name={'condition'}
            // getter={getter}
            // setter={setter}
            title={"Состояние"}

        />

        <Stack direction={"row"} spacing={2}>
            <MySelect
                // width={100}
                title={'Планировка'}
                items={form_data.layout}

                name={'layout'}
                // getter={getter}
                // setter={setter}
            />
            <MySwitch

                // getter={getter}
                // setter={setter}
                name={'hasFurniture'}
                title={"Мебель"}
            />
        </Stack>

        <MySelect
            title={'Вход'}
            items={form_data.input_type}
            name={'inputType'}
            // getter={getter}
            // setter={setter}
        />
        <MyTextInput
            width={500}
            name={'availableFrom'}
            // setter={setter}
            value={flat.availableFrom}
            flat={flat}
            title={"Дата освобождения"}
        />

        <MyTextInput
            type="number"
            name={'taxNumber'}
            // setter={setter}
            value={flat.taxNumber}
            flat={flat}
            title={"Номер налоговой"}
        />




        <MyDivider
            title={'Здание'}
        />
        <MyTextInput
            width={500}
            // type="number"
            name={'buildingName'}
            // setter={setter}
            value={flat.buildingName}
            flat={flat}
            title={"Название"}
        />

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect
                title={'Тип здания'}
                items={form_data.building_type.sort(sortByName)}
                name={'buildingType'}
                // getter={getter}
                // setter={setter}
            />


            <MySelect
                title={'Статус здания'}
                items={form_data.building_status_type}

                name={'buildingStatusType'}
                // getter={getter}
                // setter={setter}
                width={200}
            />



        </Stack>
        <Stack
            direction={"row"}
            spacing={2}
        >


            <MySelect
                title={'Класс здания'}
                items={form_data.building_class_type.filter((item) => { return item.name !== 'D' })}

                name={'buildingClass'}
                // getter={getter}
                // setter={setter}
                width={150}
            />

            <MySelect

                items={form_data.house_line_type}
                name={'houseLineType'}
                title={"Линия домов"}
                // getter={getter}
                // setter={setter}
                width={200}
            />

        </Stack>


        <Stack direction={"row"} spacing={2} >
            <MyTextInput
                // width={500}
                type="number"
                name={'floorsCount'}
                // setter={setter}
                value={flat.floorsCount}

                title={"Количество этажей"}
            />

            <MyTextInput
                // width={500}
                type="number"
                name={'totalArea'}
                // setter={setter}
                // value={flat.totalArea}

                title={"Площадь здания"}
            />
        </Stack>

        <MyDivider
            title={'Парковка'}
        />

        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect
                items={form_data.parking}
                name={'parking'}
                title={"Парковка"}
                // getter={getter}
                // setter={setter}
                width={200}
            />
            <MyTextInput

                name={'parkingPlacesCount'}
                // setter={setter}
                title={'Количество мест'}
                // value={flat.parkingPlacesCount}
                type="number"

            />

            <MySwitch

                name={'parkingIsFree'}
                title={"Бесплатная"}

                // getter={getter}
                // setter={setter}
            />
            {!parkingIsFree && (
                <MyTextInput

                    name={'parkingPlacesPrice'}
                    // setter={setter}
                    title={'Стоимость место/месяц'}
                    // value={flat.parkingPlacesPrice}
                    type="number"
                    width={350}
                />
            )
            }
        </Stack>


        <MyDivider
            title={'Коммуникации'}
        />

        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect

                items={heating_types}
                name={'heatingType'}
                // setter={setter}
                title={"Отопление"}
                // getter={getter}
                width={200}
            />

            <MySelect

                items={form_data.communication_ventilation_type}
                name={'ventilationType'}
                // setter={setter}
                title={"Вентиляция"}
                // getter={getter}
                width={200}
            />
            <MySelect

                items={form_data.communication_conditioning_type}
                name={'conditioningType'}
                // setter={setter}
                title={"Кондиционирование"}
                // getter={getter}
                width={200}
            />

            <MySelect

                items={form_data.extinguishing_system_type}
                name={'extinguishingSystemTypes'}
                // setter={setter}
                title={"Пожаротушение"}
                multiple={true}
                // getter={getter}
            // width={200}
            />


        </Stack>

        <Lifts
            form_data={form_data}
            // getter={getter}
            // setter={setter}
        />

        <MyDivider
            title={'Земля'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                name={'landArea'}
                // setter={setter}
                title={'Площадь участка'}
                // value={flat.landArea}
                type="number"
            />
            <MySelect
            width={150}

                items={form_data.land_area_unit_type}
                name={'landAreaUnitType'}
                // setter={setter}
                title={"Единица"}
                // multiple={true}
                // getter={getter}
            // width={200}
            />
            {/* landAreaUnitType */}

        </Stack>


    </>);
}

export default Building;