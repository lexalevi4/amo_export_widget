import { useState } from "react";
import MyDivider from "../MyDivider";
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import { Box, Stack } from "@mui/material";
import MyButtonsGroup from "../MyButtonsGroup";

function Price({
    flat,
    deal_type,
    form_data
}) {

    const [childrenAllowed, setChildrenAllowed] = useState(flat.childrenAllowed);
    const [petsAllowed, setPetsAllowed] = useState(flat.petsAllowed);
    const [mortgageAllowed, setMortgageAllowed] = useState(flat.mortgageAllowed);
    const [price, setPrice] = useState(flat.price);
    const [currency, setCurrency] = useState(flat.currency);
    const [deposit, setDeposit] = useState(flat.deposit);
    const [fee, setFee] = useState(flat.fee);
    const [saleType, setSaleType] = useState(flat.saleType)

    return (<>

        <MyDivider title={'Условия'} />


        {Number(deal_type) === 1 && (
            <Box
                sx={{
                    width: 300
                }}
            >
                <MyButtonsGroup
                    flat={flat}
                    title={'Тип продажи'}
                    items={form_data.sale_type}
                    name={'saleType'}
                    setter={setSaleType}
                    value={saleType}

                />
            </Box>
        )}

        {Number(deal_type) === 2 && (
            <Stack
                direction="row" spacing={2}
            >

                <MySwitch
                    flat={flat}
                    name={'childrenAllowed'}
                    value={childrenAllowed}
                    setter={setChildrenAllowed}
                    title={"Можно с детьми"}
                />
                <MySwitch
                    flat={flat}
                    name={'petsAllowed'}
                    value={petsAllowed}
                    setter={setPetsAllowed}
                    title={"Можно с животными"}
                />

            </Stack>
        )}


        <Stack
            direction="row" spacing={2}
        >
            <MyTextInput
                type='number'
                value={price}
                setter={setPrice}
                name={'price'}
                title={'Цена'}
                flat={flat}
            />
            <MySelect
                flat={flat}
                items={form_data.currency}
                name={'currency'}
                setter={setCurrency}
                title={'Валюта'}
                value={currency}
                width={150}
            />
            <MySwitch
                flat={flat}
                name={'mortgageAllowed'}
                value={mortgageAllowed}
                setter={setMortgageAllowed}
                title={"Возможна ипотека"}
            />
        </Stack>

        {Number(deal_type) === 2 && (
            <>
                <MyTextInput
                    type='number'
                    value={deposit}
                    setter={setDeposit}
                    name={'deposit'}
                    title={'Депозит'}
                    flat={flat}
                />

                <MyTextInput
                    type='number'
                    value={fee}
                    setter={setFee}
                    name={'fee'}
                    title={'Комиссия'}
                    flat={flat}
                />
            </>
        )}
    </>);
}

export default Price;