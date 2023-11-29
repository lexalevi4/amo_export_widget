
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import { Box, Stack } from "@mui/material";
import MyButtonsGroup from "../MyButtonsGroup";
import { useObjectFormState } from "@/app/objects/create/store";
import { useEffect } from "react";

function Price({
    flat,
    // deal_type,
    form_data
}) {

    // console.log(form_data)

    // const [childrenAllowed, setChildrenAllowed] = useState(flat.childrenAllowed);
    // const [petsAllowed, setPetsAllowed] = useState(flat.petsAllowed);
    // const [mortgageAllowed, setMortgageAllowed] = useState(flat.mortgageAllowed);
    // const [price, setPrice] = useState(flat.price);
    // const [currency, setCurrency] = useState(flat.currency);
    // const [deposit, setDeposit] = useState(flat.deposit);
    // const [fee, setFee] = useState(flat.fee);
    // const [saleType, setSaleType] = useState(flat.saleType)
    // const utilitiesTermsIncludedInPrice = useObjectFormState(state => state.flat.utilitiesTermsIncludedInPrice)
    // console.log(flat);
    const utilitiesTermsIncludedInPrice = useObjectFormState((state) => state.flat.utilitiesTermsIncludedInPrice);
    const category = useObjectFormState((state) => state.flat.category);
    const deal_type = useObjectFormState((state) => state.flat.deal_type);
    useEffect(() => {
        console.log(utilitiesTermsIncludedInPrice)

    }, [utilitiesTermsIncludedInPrice])


    console.log(utilitiesTermsIncludedInPrice)


    return (<>




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
                // setter={setSaleType}
                // value={saleType}

                />
            </Box>
        )}

        {Number(deal_type) === 2 && Number(category) !== 3 && (
            <Stack
                direction="row" spacing={2}
            >

                <MySwitch
                    flat={flat}
                    name={'childrenAllowed'}
                    // value={childrenAllowed}
                    // setter={setChildrenAllowed}
                    title={"Можно с детьми"}
                />
                <MySwitch
                    flat={flat}
                    name={'petsAllowed'}
                    // value={petsAllowed}
                    // setter={setPetsAllowed}
                    title={"Можно с животными"}
                />

            </Stack>
        )}


        <Stack
            direction="row" spacing={2}
        >
            <MyTextInput
                type='number'
                // value={price}
                // setter={setPrice}
                name={'price'}
                title={'Цена'}
                flat={flat}
            />
            {/* <MySelect
                // flat={flat}
                items={form_data.currency}
                name={'currency'}
                // setter={setCurrency}
                title={'Валюта'}
                // value={currency}
                width={150}
            /> */}
            {Number(deal_type) == 1 && (Number(category) == 1 || Number(category) == 2) && (
                <MySwitch
                    // flat={flat}
                    name={'mortgageAllowed'}
                    // value={mortgageAllowed}
                    // setter={setMortgageAllowed}
                    title={"Возможна ипотека"}
                />
            )}

        </Stack>

        {Number(deal_type) == 2 && (Number(category) == 1 || Number(category) == 2) && (
            <Stack
                direction={'row'}
                spacing={2}
            >
                <MySwitch
                    name={'utilitiesTermsIncludedInPrice'}
                    title={'Коммуналка включена'}
                />
                {!utilitiesTermsIncludedInPrice && (
                    <MyTextInput
                        type='number'
                        // value={deposit}
                        // setter={setDeposit}
                        name={'utilitiesTermsPrice'}
                        title={'Коммуналка'}
                    // flat={flat}
                    />
                )}
                <MySwitch
                    name={'flowMetersNotIncludedInPrice'}
                    title={'+ счётчики'}
                />
                {/* utilitiesTermsIncludedInPrice: true,
: '',
: false, */}

            </Stack>
        )}

        {Number(deal_type) == 2 && (Number(category) == 3) && (
            <>
                <MySelect
                    // flat={flat}
                    items={form_data.vat_type}
                    name={'vatType'}
                    // setter={setCurrency}
                    title={'НДС'}
                // value={currency}
                // width={150}
                />
                <MyTextInput
                    type='number'
                    // value={deposit}
                    // setter={setDeposit}
                    name={'minLeaseTerm'}
                    title={'Минимальный срок аренды'}
                    width={300}
                // flat={flat}
                />

                < Stack
                    direction={'row'}
                    spacing={2}
                >
                    <MySwitch
                        name={'hasGracePeriod'}
                        title={'Арендные каникулы'}
                    />
                </Stack>
                < Stack
                    direction={'row'}
                    spacing={2}
                >
                    <MySwitch
                        name={'utilitiesTermsIncludedInPrice'}
                        title={'Коммуналка включена'}
                    />

                    <MySwitch
                        name={'includedOptionsUtilityCharges'}
                        title={'Операционные расходы включены'}
                    />
                    {/* utilitiesTermsIncludedInPrice: true,
: '',
: false, */}

                </Stack >
            </>
        )
        }


        {
            Number(deal_type) === 2 && (
                <>
                    <Stack
                        spacing={2}
                        direction={'row'}
                    >
                        <MyTextInput
                            type='number'
                            // value={deposit}
                            // setter={setDeposit}
                            name={'deposit'}
                            title={'Депозит'}
                        // flat={flat}
                        />

                        <MyTextInput
                            type='number'
                            // value={fee}
                            // setter={setFee}
                            name={'fee'}
                            title={'Комиссия'}
                        // flat={flat}
                        />
                    </Stack>
                    <Stack
                        spacing={2}
                        direction={'row'}
                    >
                        <MySelect
                            // flat={flat}
                            items={form_data.lease_term_type}
                            name={'leaseTermType'}
                            // setter={setCurrency}
                            title={'Срок аренды'}
                        // value={currency}
                        // width={150}
                        />
                        <MyTextInput
                            type='number'
                            // value={fee}
                            // setter={setFee}
                            name={'prepayMonths'}
                            title={'Предоплата месяцев'}
                        // flat={flat}
                        />
                        {Number(category) === 3 && (
                            <MySelect
                                // flat={flat}
                                items={form_data.lease_type}
                                name={'leaseType'}
                                // setter={setCurrency}
                                title={'Тип аренды'}
                            // value={currency}
                            // width={150}
                            />
                        )}
                    </Stack>




                </>
            )
        }

        <Stack
            direction={'row'}
            spacing={2}
        >
            <MyTextInput
                type='number'
                // value={price}
                // setter={setPrice}
                name={'agentBonus'}
                title={'Бонус агенту'}
                flat={flat}
            />
            <MySelect
                // flat={flat}
                items={form_data.agent_bonus_payment_type}
                name={'agentBonusPaymentType'}
                // setter={setCurrency}
                title={'Тип оплаты'}
            // value={currency}
            // width={150}
            />
        </Stack>


    </>);
}

export default Price;