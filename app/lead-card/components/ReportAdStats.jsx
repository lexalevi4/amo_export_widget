import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { BarChart, LineChart } from "@mui/x-charts";
import { useState } from "react";

function ReportAdStats({ ad, feeds }) {


    const [finalBarSeries, setFinalBarSeries] = useState([]);

    const labels = {
        searches_сount: 'Поиски',
        shows_count: 'Показы',
        views_count: 'Просмотры',
        contacts_count: 'Контакты',
        favorites_count: 'Избранное',
    };
    const total = [];

    const bar = [];

    const dateFormater = (date) => Intl.DateTimeFormat('ru-RU').format(date);
    const getBarItem = (key, total) => {
        let current = { stat: labels[key] }
        // current.stat = key;
        total.map(item => {
            // console.log(item);
            current[item.name] = Number(item.data[key]);

            return true;
        })
        return current;

    }
    const barSeries = [];

    return (<>


        <Typography
            className="my-10"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}

            variant='h5'
        >

            Статистика объявлений
        </Typography>

        {feeds.map(feed => {

            const feed_status = ad.statuses.filter(status => {
                return status.id === feed.id
            })[0]

            const dates = [];
            const series = [];
            const testX = [];
            if (feed_status?.stats?.stats?.date?.length > 0) {
                feed_status.stats.stats.date.map((date_item, index) => {
                    // dates.push(date_item);
                    testX.push(index);
                    // const date_arr = date_item.split('-');
                    // console.log(date_arr);
                    dates.push(new Date(date_item))
                    return true;
                })

                for (var key of Object.keys(feed_status.stats.stats.data)) {
                    // console.log(key + " -> " + feed_status.stats.stats.data[key])
                    series.push({
                        data: feed_status.stats.stats.data[key],
                        // id: key,
                        label: labels[key],
                        // valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                    })
                }

            } else {
                // console.log('empty')
                return false;
            }
            total.push({
                name: feed.name,
                data: feed_status.stats.total
            })


            // console.log(bar);


            return (<Paper
                className="my-2"
                key={'report_ad_stats_' + ad.id + "_" + feed.id}
            >
                <Typography
                    className="mt-1 py-1"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {feed.name}
                </Typography>
                <LineChart
                    // onClick={(e, k, l) => {
                    //     console.log(k);
                    //     console.log(l);
                    // }}
                    margin={series.length > 2 ? { top: 80 } : null}
                    height={300}
                    slotProps={{

                        legend: {


                            // seriesToDisplay:[]
                        }
                    }}
                    xAxis={[{
                        data: dates,
                        scaleType: 'time',
                        valueFormatter: dateFormater,
                        showMark: false,
                        // tickLabelStyle: {
                        //     angle: 45,
                        //     textAnchor: 'start',
                        //     fontSize: 12,
                        // },

                    }]}

                    series={series}
                    sx={{
                        '.MuiMarkElement-root': {
                            display: 'none',
                        },
                    }}

                />

            </Paper>)
        })}
        {[1].map(item => {
            if (total.length > 0) {


                for (var key of Object.keys(labels)) {
                    bar.push(getBarItem(key, total))
                }
                total.map(item => {
                    barSeries.push({ dataKey: item.name, label: item.name, stack: 'total', type: 'bar' })
                    return true;
                })


                return true;
            }

        })}

        {total.length > 0 && (
            <>
                <TableContainer
                    component={Paper}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Источник
                                </TableCell>
                                <TableCell>
                                    Просмотров
                                </TableCell>
                                <TableCell>
                                    Контактов
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {total.map((item, index) => {
                                return (
                                    <TableRow
                                        key={'ad_stats' + Math.random() + Math.random()}
                                    >
                                        <TableCell>
                                            {item.name}
                                        </TableCell>
                                        <TableCell>
                                            {item.data.views_count}
                                        </TableCell>
                                        <TableCell>
                                            {item.data.contacts_count}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
                <Paper
                    className="my-2"
                >
                    <BarChart

                        dataset={bar}
                        margin={{ left: 80, bottom: 100 }}
                        // layout="horizontal"
                        xAxis={[{

                            scaleType: 'band', dataKey: 'stat',
                            tickLabelStyle: {
                                angle: 45,
                                textAnchor: 'start',
                                fontSize: 14,
                            },
                        }]}
                        series={
                            barSeries
                            //     [
                            //     { dataKey: 'Циан', label: 'Циан' },
                            //     { dataKey: 'Авито', label: 'Авито' },
                            //     { dataKey: 'Яндекс', label: 'Яндекс' },
                            //     // { dataKey: 'favorites_count', label: 'favorites_count' },
                            //     // { dataKey: 'searches_сount', label: 'searches_сount' },

                            // ]
                        }
                        height={500}
                    // {...chartSetting}
                    />
                </Paper>
            </>
        )}

    </>);

}

export default ReportAdStats;

