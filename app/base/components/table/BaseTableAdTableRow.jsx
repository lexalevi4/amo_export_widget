import { Button, IconButton, Link, Typography } from "@mui/joy";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';

import { useState } from "react";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { LineChart } from "@mui/x-charts";
function BaseTableAdTableRow({ ad, feed, objectId }) {

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




    const feedActive = ad.activeFeeds.includes(feed.id);
    let color = 'primary'
    if (!feedActive) {
        color = 'primary'
    }
    if (feed_status.status == 1 && Boolean(ad.active)) {
        color = 'success'
    }
    if (feed_status.status > 1 && Boolean(ad.active)) {
        color = 'danger'
    }



    return (
        <>
            <tr

            >
                <td

                >
                    <Button
                        style={{ textTransform: 'none' }}
                        variant="plain"
                        // disabled={!feedActive}
                        // onClick={handleShowFull}
                        color={color}


                    >


                        {!Boolean(ad.active) && (
                            <CheckBoxOutlineBlankIcon />
                        )}

                        {(feed_status.status == 0 && !feedActive && Boolean(ad.active)) && (
                            <CheckBoxOutlineBlankIcon />
                        )}
                        {(feed_status.status == 0 && feedActive && Boolean(ad.active)) && (
                            <CheckIcon />
                        )}
                        {(feed_status.status == 1 && feedActive && Boolean(ad.active)) && (
                            <DoneAllIcon />
                        )}
                        {(feed_status.status > 1 && Boolean(ad.active)) && (
                            <ErrorIcon />
                        )}
                        {feed.name}


                    </Button>

                    {dates.length > 0 && (
                        <IconButton
                            color={showChart ? "danger" : "success"}
                            onClick={handleShowChart}

                        >
                            <QueryStatsIcon />
                        </IconButton>
                    )}
                </td>
                <td>

                    {feedActive && (
                        <>

                            {feed_status.status === 1 && (
                                <Typography
                                    component={'div'}
                                    color={'success'}
                                >
                                    Опубликовано

                                </Typography>

                            )}
                            {feed_status.status > 1 && (
                                <Typography
                                    component={'div'}
                                    color={'error'}
                                >
                                    Ошибка/Предупреждение
                                </Typography>
                            )}
                        </>
                    )}
                </td>
                <td
                    className="whitespace-pre-line"
                >
                    {feed_status.message}
                </td>
                <td>
                    {(feedActive && feed_status.url && feed_status.url !== '') && (
                        <Link
                            href={feed_status.url}
                            target="_blank"
                        >
                            Ссылка
                        </Link>

                    )}
                </td>
            </tr>

            {(dates.length > 0 && showChart) && (
                <tr>
                    <td
                        colSpan={4}
                    >
                        <LineChart
                            height={300}
                            xAxis={[{ data: dates, scaleType: 'time', valueFormatter: dateFormater, showMark: false }]}

                            series={series}
                            sx={{
                                '.MuiMarkElement-root': {
                                    display: 'none',
                                },
                            }}

                        />


                    </td>
                </tr>
            )}
        </>

    )
}

export default BaseTableAdTableRow;