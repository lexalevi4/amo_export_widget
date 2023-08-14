function Old() {
    return (<>
        <MyDivider
            title={'старое'}
        />


        <MyDivider
            title={'Объект'}
        />
        <MyTextInput

            name={'cadNumber'}
            value={flat.cadNumber}
            setter={setter}
            title={"Кадастровый номер"}

        />

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"

                name={'taxNumber'}
                value={flat.taxNumber}
                setter={setter}
                title={"Номер налоговой"}

            />
            <MySwitch
                flat={flat}
                getter={getter}
                name={'isLegalAddressProvided'}
                setter={setter}
                title={"Юридический адрес предоставляется"}

            />
        </Stack>

        <MyTextInput
            type="number"

            name={'totalArea'}
            value={flat.totalArea}
            setter={setter}
            title={"Общая площадь"}

        />



        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput

                type='number'
                name={'floor'}
                setter={setter}
                value={flat.floor}
                title={'Этаж'}
            />

            <MyTextInput
                type='number'
                name={'floorsCount'}
                setter={setter}
                value={floorsCount}
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
                getter={getter}
                setter={setter}
            />

            <MyTextInput
                type="number"
                title={'Высота потолков'}

                name={'ceilingHeight'}
                value={flat.ceilingHeight}
                setter={setter}
            />
          
        </Stack>




        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                // width={350}
                value={flat.waterPipesCount}

                name={'waterPipesCount'}
                setter={setter}
                title={"Мокрых точек"}
                type="number"

            />
            <MyTextInput
                // width={350}
                value={flat.power}

                name={'power'}
                setter={setter}
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
                getter={getter}
                setter={setter}
                title={"Состояние"}

            />
            <MySwitch

                name={'hasFurniture'}
                getter={getter}
                setter={setter}
                title={"Мебель"}

            />
        </Stack>

        <MySelect
            items={form_data.access_type}
            name={'accessType'}
            getter={getter}
            setter={setter}
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
                getter={getter}
                setter={setter}
                width={200}
            />
            <MyTextInput

                name={'parkingPlacesCount'}
                setter={setter}
                title={'Количество мест'}
                value={flat.parkingPlacesCount}
                type="number"

            />

            <MySwitch

                name={'parkingIsFree'}

                getter={getter}
                setter={setter}
            />
            {!parkingIsFree && (
                <MyTextInput

                    name={'parkingPlacesPrice'}
                    setter={setter}
                    title={'Стоимость место/месяц'}
                    value={flat.parkingPlacesPrice}
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
            <MySwitch


                name={'isOccupied'}
                getter={getter}
                setter={setter}
                title={isOccupied ? "Помещение занято до " : "Помещение занято"}

            />

            {isOccupied && (
                <>
                    <MySelect
                        width={150}
                        title={'Месяц'}
                        items={form_data.month}

                        name={'freeMonth'}
                        getter={getter}
                        setter={setter}
                    />

                    <MySelect
                        width={100}
                        title={'Год'}
                        items={form_data.year}

                        name={'freeYear'}
                        getter={getter}
                        setter={setter}
                    />
                </>

            )}
        </Stack>




        <MyDivider
            title={'Назначение'}
        />
        <Grid container>
            {
                chunkedSpecialities.map((arr, index) => {
                    return (
                        <Grid xs={12} md={4} lg={3}
                            key={'speciality_col' + index}
                            item
                            alignItems={'start'}
                        >
                            <Stack
                                alignItems={"start"}
                                spacing={2}
                                direction={"column"}
                            >
                                {arr.map((item, index) => {

                                    // console.log(speciality.length >= max_specialities && max_specialities > 0 && (!speciality.includes(item.id)))
                                    return (
                                        <MultipleSwitch
                                            disabled={speciality.length >= max_specialities && max_specialities > 0 && (!speciality.includes(item.id))}
                                            checked={speciality.includes(item.id)}
                                            key={'speciality_switch_' + item.id}
                                            state={speciality}
                                            item={item}
                                            handler={multiHandler}
                                            // flat={flat}
                                            name='speciality'
                                            setter={setter}
                                        // getState={() => speciality}
                                        />
                                    )

                                })}

                            </Stack>
                        </Grid>
                    )
                })
            }
        </Grid>

        <MyDivider
            title={'Инфраструктура'}
        />
        <Grid container>
            {
                chunkedInfrastructure.map((arr, index) => {
                    return (
                        <Grid xs={12} md={4} lg={3}
                            key={'infrastructure_col' + index}
                            item
                            alignItems={'start'}
                        >
                            <Stack
                                alignItems={"start"}
                                spacing={2}
                                direction={"column"}
                            >
                                {arr.map((item, index) => {

                                    return (
                                        <MultipleSwitch

                                            disabled={false}
                                            checked={infrastructure.includes(item.id)}
                                            key={'infrastructure_switch_' + item.id}
                                            state={infrastructure}
                                            item={item}
                                            name='infrastructure'
                                            handler={multiHandler}

                                            setter={setter}

                                        />
                                    )

                                })}

                            </Stack>
                        </Grid>
                    )
                })
            }
        </Grid>






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
                getter={getter}
                setter={setter}
            />

            <MySelect
                title={'Класс здания'}
                items={form_data.building_class_type}

                name={'buildingClass'}
                getter={getter}
                setter={setter}
                width={150}
            />
            <MySelect
                title={'Статус здания'}
                items={form_data.building_status_type}

                name={'buildingStatusType'}
                getter={getter}
                setter={setter}
                width={200}
            />

            <MyTextInput
                type="number"
                title={'Площадь здания'}

                name={'buildingTotalArea'}
                value={flat.buildingTotalArea}
                setter={setter}
            />

        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MySelect

                items={form_data.house_line_type}
                name={'houseLineType'}
                title={"Линия домов"}
                getter={getter}
                setter={setter}
                width={200}
            />

        </Stack>

        <Stack
            direction={"row"}
            spacing={2}
        >
            <MyTextInput
                type="number"
                title={'Этажность'}

                name={'floorsCount'}
                value={floorsCount}
                setter={setter}
            />
            <MySelect

                items={materials}
                name={'material'}
                getter={getter}
                setter={setter}
                title={'Материал'}
            />

            <MyTextInput
                type="number"
                title={'Год постройки'}

                name={'buildYear'}
                value={flat.buildYear}
                setter={setter}
            />


        </Stack>



        <Stack
            direction={"row"}
            spacing={2}
        >

            <MySelect

                items={heating_types}
                name={'heatingType'}
                setter={setter}
                title={"Отопление"}
                getter={getter}
                width={200}
            />

            <MySelect

                items={form_data.communication_ventilation_type}
                name={'ventilationType'}
                setter={setter}
                title={"Вентиляция"}
                getter={getter}
                width={200}
            />
            <MySelect

                items={form_data.communication_conditioning_type}
                name={'conditioningType'}
                setter={setter}
                title={"Кондиционирование"}
                getter={getter}
                width={200}
            />

            <MySelect

                items={form_data.extinguishing_system_type}
                name={'extinguishingSystemTypes'}
                setter={setter}
                title={"Пожаротушение"}
                multiple={true}
                getter={getter}
            // width={200}
            />


        </Stack>

        <MySelect

            items={form_data.lift_type}
            name={'liftTypes'}
            setter={setter}
            title={"Лифты"}
            multiple={true}
            getter={getter}
        // width={200}
        />

        {

            (liftsCount.length > 0)
            &&
            (
                <>
                    <Typography
                        variant="body2"
                        width={150}
                    >
                        Количество:
                    </Typography>
                    {
                        liftsCount.map((item) => {
                            return (
                                <Stack
                                    direction={"row"}
                                    spacing={2}
                                    alignItems={'center'}
                                    key={'lift_count_' + item.id}
                                >
                                    <Typography
                                        width={150}
                                    >
                                        {
                                            item.name + ":"
                                        }
                                    </Typography>
                                    <TextField
                                        defaultValue={item.count}
                                        onChange={(e) => { updateLiftsCount(item.id, e.target.value) }}

                                    ></TextField>
                                </Stack>
                            )
                        }
                        )}
                </>
            )
        }

        {/* <MyDivider
            title={'Коммуникации'}
        /> */}


    </>);
}

export default Old;