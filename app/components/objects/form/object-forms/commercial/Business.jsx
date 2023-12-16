import { chunkArray, sortByName } from "@/app/heplers/heplers";
import MultipleSwitchGroup from "../../MultipleSwitchGroup";
import MyTextInput from "../../MyTextInput";
import MyDivider from "../../MyDivider";
import MySelect from "../../MySelect";
import { Box, Stack, Typography } from "@mui/material";
import { useObjectFormState } from "@/app/objects/create/store";

function Business({ form_data, flat_object }) {

    const specialities = form_data.speciality.filter((item) => {

        if (Number(flat_object) === 19) {
            return item.rent === 1
        }
        if (Number(flat_object) === 20) {
            return item.ready === 1
        }

    })
    const title = useObjectFormState((state) => state.flat.title)
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
        <Stack
            direction={'row'}
            spacing={2}
        >
            <MySelect
                items={form_data.avito_bussiness_type}
                name={'avitoBussinessType'}
                title={"Тип бизнеса (Авито)"}
                required
                requiredMessage="Для авито"
            />
            <Box>
                <MyTextInput
                    name={"title"}
                    width={500}
                    title={"Заголовок объявления (Авито)"}
                    required
                    requiredMessage="Для авито"

                />
                {title.length > 50 && (
                    <Typography
                        color={'error'}
                    >
                        Не более 50 символов
                    </Typography>
                )}
            </Box>
        </Stack>
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