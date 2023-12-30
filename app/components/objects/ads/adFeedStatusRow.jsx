import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import Link from "next/link";
import { useState } from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function AdFeedStatusRow({ ad, feed, activeFeeds }) {

    const [showChart, setShowChart] = useState(false);
    const handleShowChart = () => setShowChart(!showChart);

    const labels = {
        views_count: 'Просмотры',
        contacts_count: 'Контакты',
        searches_сount: 'Поиски',
        shows_count: 'Показы',
        favorites_count: 'Избранное',
    };

    const dateFormater = (date) => Intl.DateTimeFormat('ru-RU').format(date);

    const feed_status = ad.statuses.filter(status => {
        return status.id === feed.id
    })[0]
    const feedActive = activeFeeds.includes(feed.id);
    // const stats = [];
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

    }
    // console.log(dates);
    // console.log(series);


    return (
        <>
            <TableRow

            >
                <TableCell>
                    <Typography>
                        {feed.name}
                        {dates.length > 0 && (
                            <IconButton
                                color={showChart ? "error" : "success"}
                                onClick={handleShowChart}

                            >
                                <QueryStatsIcon />
                            </IconButton>
                        )}
                    </Typography>
                    {/* <FormControlLabel
                                                labelPlacement="start"
                                                control={
                                                    <Switch
                                                        value={feed.id}

                                                        // name={name}
                                                        // id={name + "switch"}
                                                        checked={feedActive}
                                                    // onClick={handler}
                                                    // onChange={handleFeedActive}
                                                    />
                                                } label={feed.name} /> */}
                </TableCell>
                <TableCell>
                    {feedActive && (
                        <>
                            {/* {(feed_status.status === 0 && feedActive )&& (
                                                          <Typography
                                                        //   color={'green'}
                                                      >
                                                          Ожидает публикации

                                                      </Typography>
                                                    )} */}
                            {feed_status.status === 1 && (
                                <Typography
                                    color={'green'}
                                >
                                    Опубликовано

                                </Typography>

                            )}
                            {feed_status.status > 1 && (
                                <Typography
                                    color={'error'}
                                >
                                    Ошибка/Предупреждение
                                </Typography>
                            )}
                        </>
                    )}

                </TableCell>
                <TableCell
                    className="whitespace-pre-line"
                >
                    {feed_status.message}
                </TableCell>
                <TableCell>
                    {(feedActive && feed_status.url && feed_status.url !== '') && (
                        <Link
                            href={feed_status.url}
                            target="_blank"
                        >
                            Ссылка
                        </Link>

                    )}

                </TableCell>



                {/* <Grid
                                            key={'feed_grid_item_' + ad.id + '_' + object.id + '_' + feed.id}
                                            item
                                        >




                                        </Grid> */}
            </TableRow>
            {(dates.length > 0 && showChart) && (
                <TableRow>
                    <TableCell
                        colSpan={4}
                    >
                        {<LineChart
                            height={300}
                            xAxis={[{ data: dates, scaleType: 'time', valueFormatter: dateFormater, showMark: false }]}

                            series={series}
                            sx={{
                                '.MuiMarkElement-root': {
                                  display: 'none',
                                },
                              }}
                        />}
                        {/* <LineChart
                                                        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
                                                        series={[
                                                            {
                                                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                                                                valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
                                                            },
                                                            {
                                                                data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                                                            },
                                                            {
                                                                data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                                                                valueFormatter: (value) => (value == null ? '?' : value.toString()),
                                                            },
                                                        ]}
                                                        height={200}
                                                        margin={{ top: 10, bottom: 20 }}
                                                    /> */}


                    </TableCell>
                </TableRow>
            )}
        </>


    )
}

export default AdFeedStatusRow;