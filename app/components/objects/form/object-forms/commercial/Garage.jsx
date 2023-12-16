import { Grid, Stack } from "@mui/material";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";
import MyTextInput from "../../MyTextInput";
import MySwitch from "../../MySwitch";
import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitch from "../../MultipleSwitch";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";


function Garage({ form_data }) {


    const garageInfrastructure = form_data.infrastructure.filter((item) => { return item.garage === 1 });
    const chunkedInfrastructure = chunkArray(garageInfrastructure.sort(sortByName), Math.floor(garageInfrastructure.length / 4))

    return (<>
        <MyDivider
            title={'Гараж'}
        />

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect
                items={form_data.garage_type}
                name={'garageType'}
                title={"Тип"}


                required={true}
            />

            <MySelect
                items={form_data.garage_garage_type}
                name={'garageGarageType'}
                title={"Тип гаража"}

                required={true}
            />

        </Stack>


        <MySelect
            items={form_data.material.filter((item) => { return item.garage === 1 })}
            name={'material'}
            title={"Материал"}
            required={true}

        />

        <MySelect
            items={form_data.garage_status}
            name={'garageStatus'}
            title={"Статус"}

        />

        <MyTextInput
            type="number"
            name={'totalArea'}

            title={"Общая площадь"}
            required={true}
        />

        <MyDivider
            title={'Коммуникации'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch

                name={'hasLight'}
                title={'Свет'}
            />
            <MySwitch

                name={'hasElectricity'}
                title={'Электричество'}
            />
            <MySwitch

                name={'hasHeating'}
                title={'Отопление'}
            />
            <MySwitch

                name={'hasWater'}
                title={'Вода'}
            />
            <MySwitch

                name={'hasExtinguishingSystem'}
                title={'Пожаротушение'}
            />


        </Stack>
        <MyDivider
            title={"Здание"}
        />
        <MyTextInput
            name={'buildingName'}

            title={'Название'}
            width={500}


        />
        <MySelect
            items={form_data.parking}
            name={'parking'}
            title={"Парковка"}
            required={true}
            requiredMessage="Для машиномест на авито"

        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch

                name={'hasSecurity'}
                title={'Охрана'}
            />
        </Stack>

        <MyDivider
            title={'Инфраструктура'}
        />
        <MultipleSwitchGroup

            items={chunkedInfrastructure}
            name={'infrastructure'}

            maxCount={0}
        />



    </>);
}

export default Garage;