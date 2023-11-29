import { FormControlLabel, Switch, TextField, Stack, Select, MenuItem, Paper, Typography } from "@mui/material";

import { useEffect,  useState } from "react";

function AdFormFeed({ feed, activeFeeds, handleFeedActive, feedSettings, setFeedSettings, currentFeed }) {




    const promoTypes = {
        1: [
            { value: 'noPromotion', name: 'Без продвижения' },
            { value: 'standard', name: 'Стандарт' },
            { value: 'premium', name: 'Премиум' },
            { value: 'top', name: 'Топ' },
        ],

        2: [
            { value: 'Free', name: 'Обычное размещение' },
            { value: 'Highlight', name: 'Выделение цветом' },
            { value: 'XL', name: 'XL объявление' },
            { value: 'x2_1', name: 'До 2 раз больше просмотров на 1 день' },
            { value: 'x2_7', name: 'До 2 раз больше просмотров на 7 дней' },
            { value: 'x5_1', name: 'До 5 раз больше просмотров на 1 день' },
            { value: 'x5_7', name: 'До 5 раз больше просмотров на 7 день' },
            { value: 'x10_1', name: 'До 10 раз больше просмотров на 1 день' },
            { value: 'x10_7', name: 'До 10 раз больше просмотров на 7 день' },
            { value: 'x15_1', name: 'До 15 раз больше просмотров на 1 день' },
            { value: 'x15_7', name: 'До 15 раз больше просмотров на 7 день' },
            { value: 'x20_1', name: 'До 20 раз больше просмотров на 1 день' },
            { value: 'x20_7', name: 'До 20 раз больше просмотров на 7 день' },
        ],
        3: [
            { value: 'no', name: 'Обычное размещение' },
            { value: 'premium', name: 'Премиум' },
            { value: 'raise', name: 'Поднятие' },
            { value: 'promotion', name: 'Продвижение' },

        ],
        4: [
            { value: 'noPromotion', name: 'Без продвижения' },
            { value: 'standard', name: 'Стандарт' },
            { value: 'premium', name: 'Премиум' },
            { value: 'top', name: 'Топ' },
        ],

    }

    const [promo, setPromo] = useState(currentFeed?.promo || '');
    const [bet, setBet] = useState(currentFeed?.bet || '')
    const [title, setTitle] = useState(currentFeed?.title || '')


    // const updateFeedSettings = useMemo(
    //     () =>
    //         debounce(async () => {
    //             let newSettings = [];
    //             let settings = {
    //                 bet: bet,
    //                 promo: promo,
    //                 title: title
    //             }
    //             feedSettings.map(item => {
    //                 if (item.id === feed.id) {
    //                     newSettings.push({ id: item.id, ...settings })
    //                 } else {
    //                     newSettings.push(item)
    //                 }
    //             })
    //             setFeedSettings(newSettings)

    //         }, 200),
    //     [],
    // );

    const updateFeedSettings = () => {
        let newSettings = [];
        let settings = {
            bet: bet,
            promo: promo,
            title: title
        }
        feedSettings.map(item => {
            if (item.id === feed.id) {
                newSettings.push({ id: item.id, ...settings })
            } else {
                newSettings.push(item)
            }
        })
        setFeedSettings(newSettings)
    }

    useEffect(() => {
        updateFeedSettings()
        // console.log(promo)
        // console.log(feed)
    }, [bet, promo, title])






    return (<>
        <Paper
            className="p-2 my-2"
            elevation={2}>
            <FormControlLabel
                labelPlacement="start"
                control={
                    <Switch
                        value={feed.id}

                        // name={name}
                        // id={name + "switch"}
                        checked={activeFeeds.includes(feed.id)}
                        // onClick={handler}
                        onChange={handleFeedActive}
                    />
                } label={feed.name} />




            {activeFeeds.includes(feed.id) && (
                <>
                    <Stack>


                        {promoTypes[feed.format] && (
                            <Stack direction={'row'} spacing={2}>
                                <Select
                                    // label='Продвижение'
                                    style={{
                                        width: 400
                                    }}
                                    value={promo}
                                    onChange={(e) => setPromo(e.target.value)}
                                >
                                    {promoTypes[String(feed.format)].map(item => {
                                        return (
                                            <MenuItem
                                                key={'promo_type' + Math.random()}
                                                value={item.value}
                                            >
                                                {item.name}

                                            </MenuItem>
                                        )
                                    })}

                                </Select>
                                {promo === 'top' && feed.format === 1 && (
                                    <TextField
                                        style={{
                                            width: 300
                                        }}
                                        label='Ставка'
                                        value={bet}
                                        onChange={(e) => setBet(e.target.value)}

                                    />
                                )}
                            </Stack>


                        )}

                        {
                            (feed.format === 1 && (promo === 'top' || promo === 'premium')) && (<>
                                <TextField
                                    className="my-2"
                                    style={{
                                        width: 450
                                    }}
                                    
                                    label='Загаловок'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                                {title.length > 0 && (title.length > 33 || title.length < 8) && (
                                    <Typography
                                        color={'error'}
                                    >
                                        Длина заголовка должна быть от 8 до 33 символов

                                    </Typography>
                                )}

                            </>)
                        }


                    </Stack>
                </>
            )}
        </Paper>

    </>);
}

export default AdFormFeed;