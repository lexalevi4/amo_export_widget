
import MyTextInput from "../MyTextInput";
import MySwitch from "../MySwitch";
import MySelect from "../MySelect";
import { Box, Stack, Typography } from "@mui/material";
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
    const isNewBuilding = useObjectFormState((state) => state.flat.isNewBuilding)
    const cplModerationPersonType = useObjectFormState((state) => state.flat.cplModerationPersonType)
    useEffect(() => {
        console.log(utilitiesTermsIncludedInPrice)

    }, [utilitiesTermsIncludedInPrice])

    const cplItems = [
        { id: 1, "name": "Частное лицо" },
        { id: 2, "name": "Юридическое лицо" },
    ]


    console.log(utilitiesTermsIncludedInPrice)


    return (<>




        {Number(deal_type) === 1 && (
            <Box
                sx={{
                    width: 300
                }}
            >

                {/*  */}
                {Number(category) !== 3 && (
                    <MyButtonsGroup
                        flat={flat}
                        title={'Тип продажи'}
                        items={form_data.sale_type}
                        name={'saleType'}
                    // setter={setSaleType}
                    // value={saleType}

                    />
                )}

                {Number(category) === 3 && (
                    <MyButtonsGroup
                        flat={flat}
                        title={'Тип продажи'}
                        items={form_data.contract_type}
                        name={'contractType'}
                        required={true}
                    // setter={setSaleType}
                    // value={saleType}

                    />
                )}

            </Box>
        )}

        {isNewBuilding && (<>
            <Typography>Данные собственника</Typography>
            <Box
                sx={{
                    width: 500
                }}
            >
                <MyButtonsGroup
                    // flat={flat}
                    title={'Тип'}
                    items={cplItems}
                    name={'cplModerationPersonType'}
                    required={true}
                    requiredMessage="Для циана"
                // setter={setSaleType}
                // value={saleType}

                />
            </Box>
            <Stack
                direction={'row'}
                spacing={2}
            >
                {Number(cplModerationPersonType) === 1 && (
                    <>
                        <MyTextInput
                            name={'cplModerationFirstName'}
                            title={'Имя'}
                            required={true}
                            requiredMessage="Для циана"
                        />
                        <MyTextInput
                            name={'cplModerationSecondName'}
                            title={'Отчество'}
                            required={true}
                            requiredMessage="Для циана"
                        />
                        <MyTextInput
                            name={'cplModerationLastName'}
                            title={'Фамилия'}
                            required={true}
                            requiredMessage="Для циана"
                        />
                    </>
                )}
                {Number(cplModerationPersonType) === 2 && (
                    <>
                        <MyTextInput
                            name={'cplModerationInn'}
                            title={'ИНН'}
                            required={true}
                            requiredMessage="Для циана"
                        />
                    </>
                )}

            </Stack>


            <MyTextInput

                width={500}
                name={'cplModerationRosreestrRegistrationNumber'}
                title={'Номер регистрации ДДУ в Росреестре'}
                required={true}
                requiredMessage="Для циана для объектов, купленных после 1 марта 2023 года"
            />


        </>)}

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
                required={true}
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
                    required={true}
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
                            title={'Депозит (рублей)'}
                            required={true}
                        // flat={flat}
                        />

                        <MyTextInput
                            type='number'
                            // value={fee}
                            // setter={setFee}
                            name={'fee'}
                            required={true}
                            requiredMessage="авито от 0 до 200, циан до 100"
                            title={'Комиссия (%) '}
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
                            required={true}
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
                                required={true}
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