import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";
import MyTextInput from "../../MyTextInput";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";

function Business({  form_data, flat_object }) {

    const specialities = form_data.speciality.filter((item) => {

        if (Number(flat_object) === 19) {
            return item.rent === 1
        }
        if (Number(flat_object) === 20) {
            return item.ready === 1
        }

    })
    const chunkedSpecialities = chunkArray(specialities.sort(sortByName), Math.floor(specialities.length / 4));
    console.log(chunkedSpecialities);

    return (<>
        <MyTextInput
            type="number"
            name={'totalArea'}
         
            title={"Общая площадь"}
        />

        <MyTextInput
            type="number"
            name={'floor'}
         
            title={"Этаж"}
        />
        <MySelect
            items={form_data.estate_type}
            name={'estateType'}
         
            title={'Недвижимость'}
            

        />

        <MyDivider
            title={'Назначение'}
        />
        <MultipleSwitchGroup
          
            items={chunkedSpecialities}
            name={'speciality'}
         
            maxCount={Number(flat_object) === 20 ? 1 : 5}

        />
        <MyTextInput
            type="number"
            name={'monthlyIncome'}
        
         
            title={"Месячная прибыль (руб.)"}
        />



    </>);
}

export default Business;