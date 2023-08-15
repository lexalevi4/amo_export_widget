import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";
import MyTextInput from "../../MyTextInput";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";

function Business({ flat, getter, setter, form_data, flat_object }) {

    const specialities = form_data.speciality.filter((item) => {

        if (flat_object === 19) {
            return item.rent === 1
        }
        if (flat_object === 20) {
            return item.ready === 1
        }

    })
    const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.floor(specialities.length / 4));

    return (<>
        <MyTextInput
            type="number"
            name={'totalArea'}
            value={flat.totalArea}
            setter={setter}
            title={"Общая площадь"}
        />

        <MyTextInput
            type="number"
            name={'floor'}
            value={flat.floor}
            setter={setter}
            title={"Этаж"}
        />
        <MySelect
            items={form_data.estate_type}
            name={'estateType'}
            setter={setter}
            title={'Недвижимость'}

        />

        <MyDivider
            title={'Назначение'}
        />
        <MultipleSwitchGroup
            getter={getter}
            items={chunkedSpecialities}
            name={'speciality'}
            setter={setter}
            maxCount={flat_object === 20 ? 1 : 5}

        />
        <MyTextInput
            type="number"
            name={'monthlyIncome'}
            value={flat.floor}
            setter={setter}
            title={"Месячная прибыль (руб.)"}
        />



    </>);
}

export default Business;