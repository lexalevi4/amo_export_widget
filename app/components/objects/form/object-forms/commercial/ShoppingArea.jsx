import { Stack } from "@mui/material";
import MyTextInput from "../../MyTextInput";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";
import MyDivider from "../../MyDivider";
import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";

function ShoppingArea({ flat, setter, getter, form_data }) {

    const specialities = form_data.speciality.filter((item) => {
        return item.free === 1
    })
    const chunkedInfrastructure = chunkArray(form_data.infrastructure.sort(sortByName), Math.floor(form_data.infrastructure.length / 3))
    const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.ceil(specialities.length / 3));
    const materials = form_data.material.filter((item) => {
        return item.commercial === 1
    })
    const parkingIsFree = getter('parkingIsFree');

    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })
    const isOccupied = getter('isOccupied');
    const conditions = form_data.condition.filter((item) => {
        return item.commercial === 1;
    });
    const work_hours_24 = getter('work_hours_24');

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

            <MySwitch

                name={'hasShopWindows'}
                getter={getter}
                setter={setter}
                title={"Витринные окна"}

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
            <MySelect

                items={conditions}
                name={'condition'}
                getter={getter}
                setter={setter}
                title={"Состояние"}

            />
            <MySwitch

                name={'hasFurniture'}
                getter={getter}
                setter={setter}
                title={"Мебель"}

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
        <MySelect
            items={form_data.input_type}
            name={'inputType'}
            getter={getter}
            setter={setter}
            title={"Вход"}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"

                name={'taxNumber'}
                value={flat.taxNumber}
                setter={setter}
                title={"Номер налоговой"}

            />
            <MySwitch
                flat={flat}
                getter={getter}
                name={'isLegalAddressProvided'}
                setter={setter}
                title={"Юридический адрес предоставляется"}

            />
        </Stack>




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

            <MySelect
                title={'Тип помещения'}
                items={form_data.placement_type}

                name={'placementType'}
                getter={getter}
                setter={setter}
            // width={150}
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

            <MySelect
                items={form_data.parking}
                name={'parking'}
                title={"Парковка"}
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
                    title={'Стоимость место/месяц'}
                    value={flat.parkingPlacesPrice}
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

        <MyTextInput
            type="number"

            name={'tenants'}
            value={flat.tenants}
            setter={setter}
            title={"Арендаторы"}

        />
        <MySelect
            // width={150}

            items={form_data.shopping_center_scale_type}
            name={'shoppingCenterScaleType'}
            setter={setter}
            title={"Масштаб торгового центра"}
            // multiple={true}
            getter={getter}
        // width={200}
        />


        <MyDivider
            title={'Часы работы'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect
                // width={150}

                items={form_data.working_days_type}
                name={'workingDaysType'}
                setter={setter}
                title={"Дни"}
                // multiple={true}
                getter={getter}
            // width={200}
            />

            {!work_hours_24 && (
                <><MyTextInput
                    width={70}
                    name={'work_hours_from'}
                    setter={setter}
                    title={'C'}
                    value={flat.landArea}
                    type="number"
                />
                    <MyTextInput
                        width={70}
                        name={'work_hours_to'}
                        setter={setter}
                        title={'По'}
                        value={flat.landArea}
                        type="number"
                    /></>
            )}

            <MySwitch

                name={'work_hours_24'}
                title={'Круглосуточно'}

                getter={getter}
                setter={setter}
            />

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

export default ShoppingArea;