import { Stack } from "@mui/material";
import MyTextInput from "../../MyTextInput";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";
import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";
import Lifts from "./Lifts";
import Cranage from "./Cranage";
import { useObjectFormState } from "@/app/objects/create/store";

function Industry({ form_data }) {


    const infrastructures = form_data.infrastructure.filter((item) => {
        return item.industry === 1
    })
    const chunkedInfrastructure = chunkArray(infrastructures.sort(sortByName), Math.floor(infrastructures.length / 3))
    // const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.ceil(specialities.length / 3));
    const materials = form_data.material.filter((item) => {
        return item.commercial === 1
    })



    const parkingIsFree = useObjectFormState((state) => state.flat['parkingIsFree']);
    const isOccupied = useObjectFormState((state) => state.flat['isOccupied']);

    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })


    const conditions = form_data.condition_type.filter((item) => {
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

                title={"Общая площадь"}

            />

            <MyTextInput
                type="number"

                name={'minArea'}

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

                title={'Этаж'}
            />

            <MyTextInput
                type='number'
                name={'floorsCount'}

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

                title={"Состояние"}

            />
            <MySelect
                // width={150}
                title={'Материал пола'}
                items={form_data.floor_material}
                name={'floorMaterialType'}

            />
        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                // width={350}


                name={'waterPipesCount'}

                title={"Мокрых точек"}
                type="number"

            />
            <MyTextInput
                // width={350}


                name={'power'}

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

                title={isOccupied ? "Помещение занято до " : "Помещение занято"}

            />

            {isOccupied && (
                <>
                    <MySelect
                        width={150}
                        title={'Месяц'}
                        items={form_data.month}

                        name={'freeMonth'}

                    />

                    <MySelect
                        width={100}
                        title={'Год'}
                        items={form_data.year}

                        name={'freeYear'}

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

            />

            <MyTextInput
                type="number"
                title={'Высота потолков'}

                name={'ceilingHeight'}

            />



        </Stack>
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch


                name={'hasSafeCustody'}

                title={"Ответ. хранение"}

            />
            <MySwitch


                name={'isCustoms'}

                title={"Таможня"}

            />
            <MySwitch


                name={'hasTransportServices'}

                title={"Транспортные услуги"}

            />
        </Stack>
        <MyTextInput
            // type="number"
            title={'Сетка колонн'}

            name={'columnGrid'}


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

            />

            <MySelect
                title={'Класс здания'}
                items={form_data.building_class_type}

                name={'buildingClass'}

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

                width={200}
            />

            <MyTextInput
                type="number"
                title={'Площадь здания'}

                name={'buildingTotalArea'}

            />
        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect

                items={materials}
                name={'material'}

                title={'Материал'}
            />

            <MyTextInput
                type="number"
                title={'Год постройки'}

                name={'buildYear'}

            />


        </Stack>


        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect

                items={heating_types}
                name={'heatingType'}

                title={"Отопление"}

                width={200}
            />

            <MySelect

                items={form_data.communication_ventilation_type}
                name={'ventilationType'}

                title={"Вентиляция"}

                width={200}
            />
            <MySelect

                items={form_data.communication_conditioning_type}
                name={'conditioningType'}

                title={"Кондиционирование"}

                width={200}
            />

            <MySelect

                items={form_data.extinguishing_system_type}
                name={'extinguishingSystemTypes'}

                title={"Пожаротушение"}
                multiple={true}

            // width={200}
            />


        </Stack>
        <MySelect
            items={form_data.access_type}
            name={'accessType'}

            title={"Вход"}
        />


        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput

                name={'developer'}

                title={'Застройщик'}

                // type="number"
                width={300}

            />
            <MyTextInput

                name={'managementCompany'}

                title={'Управляющая компания'}

                // type="number"
                width={300}

            />


        </Stack>

        <Lifts
            items={form_data.lift_type.filter(item => item.industry === 1)}
            form_data={form_data}

            show_capacity={true}

        />

        <Cranage
            // items={form_data.lift_type.filter(item => item.industry === 1)}
            form_data={form_data}

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

                width={200}
            />
            <MySelect
                items={form_data.parking_purpose_type}
                name={'parkingPurposeType'}
                title={"Назначение"}

                width={200}
            />
            <MyTextInput

                name={'parkingPlacesCount'}

                title={'Количество мест'}

                type="number"

            />

            <MySwitch

                name={'parkingIsFree'}
                title={'Бесплатная'}


            />
            {!parkingIsFree && (
                <MyTextInput

                    name={'parkingPlacesPrice'}

                    title={'Стоимость въезда'}

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

                title={'Площадь участка'}

                type="number"
            />
            <MySelect
                width={150}

                items={form_data.land_area_unit_type}
                name={'landAreaUnitType'}

                title={"Единица"}
            // multiple={true}

            // width={200}
            />
            {/* landAreaUnitType */}

        </Stack>

        <MyDivider
            title={'Инфраструктура'}
        />
        <MultipleSwitchGroup

            items={chunkedInfrastructure}
            name={'infrastructure'}

        // maxCount={flat_object === 20 ? 1 : 5}

        />





    </>);
}

export default Industry;