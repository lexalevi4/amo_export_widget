import { Stack } from "@mui/material";
import MyTextInput from "../../MyTextInput";
import MySelect from "../../MySelect";
import MySwitch from "../../MySwitch";
import MyDivider from "../../MyDivider";
import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";
import { useObjectFormState } from "@/app/objects/create/store";

function ShoppingArea({ flat, form_data }) {

    const specialities = form_data.speciality.filter((item) => {
        return item.free === 1
    })
    const chunkedInfrastructure = chunkArray(form_data.infrastructure.sort(sortByName), Math.floor(form_data.infrastructure.length / 3))
    const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.ceil(specialities.length / 3));
    const materials = form_data.material.filter((item) => {
        return item.commercial === 1
    })
    const parkingIsFree = useObjectFormState((state) => state.flat['parkingIsFree']);
    const isOccupied = useObjectFormState((state) => state.flat['isOccupied']);
    const work_hours_24 = useObjectFormState((state) => state.flat['work_hours_24']);
    

    const heating_types = form_data.heating_type.filter((item) => {
        return item.commercial === 1
    })
    
    const conditions = form_data.condition_type.filter((item) => {
        return item.commercial === 1;
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
                required={true}
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
                required={true}
                title={'Этаж'}
            />

            <MyTextInput
                type='number'
                required={true}
                name={'floorsCount'}
            
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
             
            />

            <MyTextInput
                type="number"
                title={'Высота потолков'}

                name={'ceilingHeight'}
             
            />

            <MySwitch

                name={'hasShopWindows'}
             
                title={"Витринные окна"}

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
            <MySelect

                items={conditions}
                name={'condition'}
                required={true}
                title={"Состояние"}

            />
            <MySwitch

                name={'hasFurniture'}
             
                title={"Мебель"}

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
        <MySelect
            items={form_data.input_type}
            name={'inputType'}
            required={true}
            title={"Вход"}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"

                name={'taxNumber'}
              
                title={"Номер налоговой"}

            />
            <MySwitch
                flat={flat}
               
                name={'isLegalAddressProvided'}
               
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
                required={true}
              
            />

            <MySelect
                title={'Класс здания'}
                items={form_data.building_class_type}

                name={'buildingClass'}
              
                width={150}
            />

            <MySelect
                title={'Тип помещения'}
                items={form_data.placement_type}
                required={true}
                name={'placementType'}
              
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
                required={true}
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

            <MySelect
                items={form_data.parking}
                name={'parking'}
                title={"Парковка"}
              
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
                  
                    title={'Стоимость место/месяц'}
                 
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

        <MyTextInput
            type="number"

            name={'tenants'}
        
            title={"Арендаторы"}

        />
        <MySelect
            // width={150}

            items={form_data.shopping_center_scale_type}
            name={'shoppingCenterScaleType'}
          
            title={"Масштаб торгового центра"}
            // multiple={true}
          
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
             
                title={"Дни"}
                // multiple={true}
              
            // width={200}
            />

            {!work_hours_24 && (
                <><MyTextInput
                    width={70}
                    name={'work_hours_from'}
                  
                    title={'C'}
                   
                    type="number"
                />
                    <MyTextInput
                        width={70}
                        name={'work_hours_to'}
                      
                        title={'По'}
                       
                        type="number"
                    /></>
            )}

            <MySwitch

                name={'work_hours_24'}
                title={'Круглосуточно'}

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

export default ShoppingArea;