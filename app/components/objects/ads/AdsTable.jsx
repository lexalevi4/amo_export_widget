import { Button, Divider, FormControlLabel, IconButton, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import AdForm from "./AdForm";
import { useState } from "react";

import AdsTableRow from "./AdsTableRow";

function AdsTable({ object, feeds, formData }) {


    // console.log(object.ads);
    const [showForm, setShowForm] = useState(false)
    const [ads, setAds] = useState(object.ads);
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


    const newAd = {
        id: 0,
        objectId: object.id,
        startDate: null,
        endDate: null,
        activeFeeds: [],
        feedFormatSettings:
            formData.feed_format.map((feedFormat) => {
                let newFeed = {
                    zhk: null,
                    house: null,
                    title:'',
                    id: feedFormat.id
                };

                if (feedFormat.id === 1) {
                    let new_metro = [];
                    let new_highways = [];

                    object.metro_distances.map((metro) => {
                        // console.log(metro)
                        let distance = '';
                        let distance_type = '';
                        if (Number(metro.foot) < 1800) {
                            distance = Math.round(metro.foot / 60);
                            distance_type = 1;
                        } else {
                            distance = Math.round(metro.car / 60);
                            distance_type = 2;
                        }
                        new_metro.push({
                            id: metro.id,
                            distance: distance,
                            distance_type: distance_type
                        })
                        return true;
                    })

                    object.highway_distances.map((highway) => {
                        if (new_highways.length < 2) {
                            new_highways.push({
                                id: highway.id,
                                distance: Math.round(highway.distance / 1000),
                            })
                        }
                        return true;
                    })

                    newFeed.metro = new_metro;
                    newFeed.highways = new_highways;
                }
                return newFeed;


            })

        ,
        feedSettings: feeds.map(feed => {
            let promo = promoTypes[feed.format] ? promoTypes[feed.format][0].value : ''
            let newFeed = {
                zhk: null,
                house: null,
                promo: promo,
                id: feed.id
            };

            if (feed.format === 1) {
                newFeed.bet = ''
                let new_metro = [];
                let new_highways = [];

                object.metro_distances.map((metro) => {
                    // console.log(metro)
                    let distance = '';
                    let distance_type = '';
                    if (Number(metro.foot) < 1800) {
                        distance = Math.round(metro.foot / 60);
                        distance_type = 1;
                    } else {
                        distance = Math.round(metro.car / 60);
                        distance_type = 2;
                    }
                    new_metro.push({
                        id: metro.id,
                        distance: distance,
                        distance_type: distance_type
                    })
                    return true;
                })

                object.highway_distances.map((highway) => {
                    if (new_highways.length < 2) {
                        new_highways.push({
                            id: highway.id,
                            distance: Math.round(highway.distance / 1000),
                        })
                    }
                    return true;
                })

                newFeed.metro = new_metro;
                newFeed.highways = new_highways;
            }
            return newFeed;

        })

    }

    const handleShowForm = () => {
        setShowForm(!showForm)
    }

    return (<>


        {ads.length > 0 && (
            <>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {ads.map(ad => {
                                return (
                                    <AdsTableRow
                                        key={'ad_table_row_' + ad.id}
                                        feeds={feeds}
                                        formData={formData}
                                        object={object}
                                        ad={ad}
                                        setAds={setAds}
                                    />

                                )

                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )}



        {!showForm && (
            <Button
                onClick={handleShowForm}
                className="my-2"
                variant="contained"
            >Создать объявление</Button>
        )}

        <Divider
            className="my-10"
        />

        {showForm && (
            <AdForm
                setAds={setAds}
                feeds={feeds}
                formData={formData}
                object={object}
                ad={newAd}
                handleShowForm={handleShowForm}

            />
        )}

    </>);
}

export default AdsTable;