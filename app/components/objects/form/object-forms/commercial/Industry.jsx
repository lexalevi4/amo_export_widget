import { Stack } from "@mui/material";
import MyTextInput from "../../MyTextInput";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";
import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";
import Lifts from "./Lifts";
import Cranage from "./Cranage";

function Industry({ flat, setter, getter, form_data }) {


    const infrastructures = form_data.infrastructure.filter((item) => {
        return item.industry === 1
    })
    const chunkedInfrastructure = chunkArray(infrastructures.sort(sortByName), Math.floor(infrastructures.length / 3))
    // const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.ceil(specialities.length / 3));
    const materials = form_data.material.filter((item) => {
        return item.commercial === 1
    })
    const parkingIsFree = getter('parkingIsFree');

    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })
    const isOccupied = getter('isOccupied');

    const conditions = form_data.condition.filter((item) => {
        return item.industry === 1;
    });

    return (<>
        <MyDivider
            title={'Объект'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"

                name={'totalArea'}
                value={flat.totalArea}
                setter={setter}
                title={"Общая площадь"}

            />

            <MyTextInput
                type="number"

                name={'minArea'}
                value={flat.minArea}
                setter={setter}
                title={"Минимальная площадь"}

            />

        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput

                type='number'
                name={'floor'}
                setter={setter}
                value={flat.floor}
                title={'Этаж'}
            />

            <MyTextInput
                type='number'
                name={'floorsCount'}
                setter={setter}
                value={flat.floorsCount}
                title={'Этажность'}
            />

        </Stack>


        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect

                items={conditions}
                name={'condition'}
                getter={getter}
                setter={setter}
                title={"Состояние"}

            />
            <MySelect
                // width={150}
                title={'Материал пола'}
                items={form_data.floor_material}
                name={'floorMaterialType'}
                getter={getter}
                setter={setter}
            />
        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                // width={350}
                value={flat.waterPipesCount}

                name={'waterPipesCount'}
                setter={setter}
                title={"Мокрых точек"}
                type="number"

            />
            <MyTextInput
                // width={350}
                value={flat.power}

                name={'power'}
                setter={setter}
                title={"Мощность (кВт)"}
                type="number"

            />
            
        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch


                name={'isOccupied'}
                getter={getter}
                setter={setter}
                title={isOccupied ? "Помещение занято до " : "Помещение занято"}

            />

            {isOccupied && (
                <>
                    <MySelect
                        width={150}
                        title={'Месяц'}
                        items={form_data.month}

                        name={'freeMonth'}
                        getter={getter}
                        setter={setter}
                    />

                    <MySelect
                        width={100}
                        title={'Год'}
                        items={form_data.year}

                        name={'freeYear'}
                        getter={getter}
                        setter={setter}
                    />
                </>

            )}
        </Stack>



        <Stack
            direction={"row"}
            spacing={2}
        >


            <MySelect
                // width={100}
                title={'Планировка'}
                items={form_data.layout}

                name={'layout'}
                getter={getter}
                setter={setter}
            />

            <MyTextInput
                type="number"
                title={'Высота потолков'}

                name={'ceilingHeight'}
                value={flat.ceilingHeight}
                setter={setter}
            />



        </Stack>
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch


                name={'hasSafeCustody'}
                getter={getter}
                setter={setter}
                title={"Ответ. хранение"}

            />
            <MySwitch


                name={'isCustoms'}
                getter={getter}
                setter={setter}
                title={"Таможня"}

            />
            <MySwitch


                name={'hasTransportServices'}
                getter={getter}
                setter={setter}
                title={"Транспортные услуги"}

            />
        </Stack>
        <MyTextInput
            // type="number"
            title={'Сетка колонн'}

            name={'columnGrid'}
            value={flat.columnGrid}
            setter={setter}
        />
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
                name={'buildingType'}
                getter={getter}
                setter={setter}
            />

            <MySelect
                title={'Класс здания'}
                items={form_data.building_class_type}

                name={'buildingClass'}
                getter={getter}
                setter={setter}
                width={150}
            />


        </Stack>
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect
                title={'Статус здания'}
                items={form_data.building_status_type}

                name={'buildingStatusType'}
                getter={getter}
                setter={setter}
                width={200}
            />

            <MyTextInput
                type="number"
                title={'Площадь здания'}

                name={'buildingTotalArea'}
                value={flat.buildingTotalArea}
                setter={setter}
            />
        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect

                items={materials}
                name={'material'}
                getter={getter}
                setter={setter}
                title={'Материал'}
            />

            <MyTextInput
                type="number"
                title={'Год постройки'}

                name={'buildYear'}
                value={flat.buildYear}
                setter={setter}
            />


        </Stack>


        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect

                items={heating_types}
                name={'heatingType'}
                setter={setter}
                title={"Отопление"}
                getter={getter}
                width={200}
            />

            <MySelect

                items={form_data.communication_ventilation_type}
                name={'ventilationType'}
                setter={setter}
                title={"Вентиляция"}
                getter={getter}
                width={200}
            />
            <MySelect

                items={form_data.communication_conditioning_type}
                name={'conditioningType'}
                setter={setter}
                title={"Кондиционирование"}
                getter={getter}
                width={200}
            />

            <MySelect

                items={form_data.extinguishing_system_type}
                name={'extinguishingSystemTypes'}
                setter={setter}
                title={"Пожаротушение"}
                multiple={true}
                getter={getter}
            // width={200}
            />


        </Stack>
        <MySelect
            items={form_data.access_type}
            name={'accessType'}
            getter={getter}
            setter={setter}
            title={"Вход"}
        />

       
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput

                name={'developer'}
                setter={setter}
                title={'Застройщик'}
                value={flat.developer}
                // type="number"
                width={300}

            />
            <MyTextInput

                name={'managementCompany'}
                setter={setter}
                title={'Управляющая компания'}
                value={flat.managementCompany}
                // type="number"
                width={300}

            />


        </Stack>

        <Lifts
            items={form_data.lift_type.filter(item => item.industry === 1)}
            form_data={form_data}
            getter={getter}
            setter={setter}
            show_capacity={true}

        />

        <Cranage
            // items={form_data.lift_type.filter(item => item.industry === 1)}
            form_data={form_data}
            getter={getter}
            setter={setter}
            show_capacity={true}

        />
 <MyDivider
            title={'Парковка'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect
                items={form_data.parking_location_type}
                name={'parkingLocationType'}
                title={"Расположение"}
                getter={getter}
                setter={setter}
                width={200}
            />
             <MySelect
                items={form_data.parking_purpose_type}
                name={'parkingPurposeType'}
                title={"Назначение"}
                getter={getter}
                setter={setter}
                width={200}
            />
            <MyTextInput

                name={'parkingPlacesCount'}
                setter={setter}
                title={'Количество мест'}
                value={flat.parkingPlacesCount}
                type="number"

            />

            <MySwitch

                name={'parkingIsFree'}
                title={'Бесплатная'}

                getter={getter}
                setter={setter}
            />
            {!parkingIsFree && (
                <MyTextInput

                    name={'parkingPlacesPrice'}
                    setter={setter}
                    title={'Стоимость въезда'}
                    value={flat.parkingPlacesPrice}
                    type="number"
                    // width={350}
                />
            )
            }
        </Stack>

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

        <MyDivider
            title={'Инфраструктура'}
        />
        <MultipleSwitchGroup
            getter={getter}
            items={chunkedInfrastructure}
            name={'infrastructure'}
            setter={setter}
        // maxCount={flat_object === 20 ? 1 : 5}

        />





    </>);
}

export default Industry;