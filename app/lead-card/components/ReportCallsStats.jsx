import { Divider, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

function ReportCallsStats({ stats }) {
    const dates = [];
    const series = [];

    const dateFormater = (date) => Intl.DateTimeFormat('ru-RU').format(date);

    if (stats?.dates?.length > 0) {
        stats.dates.map((date_item, index) => {
            // dates.push(date_item);
            // testX.push(index);
            // const date_arr = date_item.split('-');
            // console.log(date_arr);
            dates.push(new Date(date_item))
            return true;
        })

        for (var key of Object.keys(stats.data)) {
            // console.log(key + " -> " + feed_status.stats.stats.data[key])
            series.push({
                data: stats.data[key],
                // id: key,
                label: key,
                // valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
            })
        }

    } else {
        return (<></>)
    }


    return (<>
        <Divider
            className="my-10"
        />
        <Typography
            className="my-10"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}

            variant='h5'
        >

            Статистика звонков
        </Typography>
        <LineChart
            height={300}
            yAxis={[{ tickMinStep: 1 }]}
            xAxis={[{ data: dates, scaleType: 'time', valueFormatter: dateFormater, showMark: false }]}

            series={series}
            sx={{
                '.MuiMarkElement-root': {
                    display: 'none',
                },
            }}

        />
    </>);
}

export default ReportCallsStats;