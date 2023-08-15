import { Grid, Stack } from "@mui/material";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";
import MyTextInput from "../../MyTextInput";
import MySwitch from "../../MySwitch";
import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitch from "../../MultipleSwitch";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";


function Garage({ flat, getter, setter, form_data }) {


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
                name={'garage_type'}
                title={"Тип"}
                setter={setter}
                getter={getter}
                required={true}
            />

            <MySelect
                items={form_data.garage_garage_type}
                name={'garage_garage_type'}
                title={"Тип гаража"}
                setter={setter}
                getter={getter}
                required={true}
            />

        </Stack>


        <MySelect
            items={form_data.material.filter((item) => { return item.garage === 1 })}
            name={'material'}
            title={"Материал"}
            setter={setter}
            getter={getter}
        />

        <MySelect
            items={form_data.garage_status}
            name={'garage_status'}
            title={"Статус"}
            setter={setter}
            getter={getter}
        />

        <MyTextInput
            type="number"
            name={'totalArea'}
            value={flat.totalArea}
            setter={setter}
            title={"Общая площадь"}
        />

        <MyDivider
            title={'Коммуникации'}
        />
        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySwitch
                getter={getter}
                setter={setter}
                name={'hasLight'}
                title={'Свет'}
            />
            <MySwitch
                getter={getter}
                setter={setter}
                name={'hasElectricity'}
                title={'Электричество'}
            />
            <MySwitch
                getter={getter}
                setter={setter}
                name={'hasHeating'}
                title={'Отопление'}
            />
            <MySwitch
                getter={getter}
                setter={setter}
                name={'hasWater'}
                title={'Вода'}
            />
            <MySwitch
                getter={getter}
                setter={setter}
                name={'hasExtinguishingSystem'}
                title={'Пожаротушение'}
            />

        </Stack>
        <MyDivider
            title={"Здание"}
        />
        <MyTextInput
            name={'buildingName'}
            value={flat.buildingName}
            setter={setter}
            title={'Название'}
            width={500}


        />
        <MySelect
            items={form_data.parking}
            name={'parking'}
            title={"Парковка"}
            getter={getter}
            setter={setter}
        // width={200}
        />
        <MyDivider
            title={'Инфраструктура'}
        />
        <MultipleSwitchGroup
            getter={getter}
            items={chunkedInfrastructure}
            name={'infrastructure'}
            setter={setter}
            maxCount={0}
        />
       


    </>);
}

export default Garage;