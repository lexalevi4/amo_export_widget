import { Stack } from "@mui/material";
import MyDivider from "../MyDivider";
import MySwitch from "../MySwitch";

function FurnitureTechnics({
    //  setter, getter 
    }) {
    return (
        <>
            <MyDivider
                title={"Мебель/техника"}
            />


            <Stack
                direction="row" spacing={2}
            >

                <MySwitch

                    name={'hasFurniture'}
                    // getter={getter}
                    // setter={setter}
                    title={"Мебель в комнатах"}
                />
                <MySwitch

                    name={'hasKitchenFurniture'}
                    // getter={getter}
                    // setter={setter}
                    title={"Мебель на кухне"}
                />

            </Stack>
            <Stack
                direction="row" spacing={2}
            >

                <MySwitch
                    name={'hasFridge'}
                 
                    title={"Холодильник"}
                />
                <MySwitch
                    name={'hasWasher'}
                 
                    title={"Стиралка"}
                />
                <MySwitch
                    name={'hasTv'}
                 
                    title={"Телевизор"}
                />
                <MySwitch
                    name={'hasConditioner'}
                 
                    title={"Кондиционер"}
                />
                <MySwitch
                    name={'hasDishwasher'}
                 
                    title={"Посудомойка"}
                />

            </Stack >
        </>
    );
}

export default FurnitureTechnics;