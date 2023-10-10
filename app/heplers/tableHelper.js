import { Typography } from "@mui/material";

export const secToStr = (seconds) => {
    // const seconds = 9327;
    // console.log(seconds);
    let result_string = ''

    if (seconds < 60) {
        return '1 мин.';
    }

    // 👇️ "1970-01-01T00:10:00.000Z"
    // console.log(new Date(seconds * 1000).toISOString());

    // ✅ get hh:mm:ss string
    const result = new Date(seconds * 1000).toISOString().slice(11, 19);
    // console.log(result); // 👉️ "00:10:00" (hh:mm:ss)
    const arr = result.split(':')
    // console.log(arr)

    if (Number(arr[0]) > 0) {
        result_string = result_string + Number(arr[0]) + "ч."
    }
    if (Number(arr[1]) > 0) {
        result_string = result_string + Number(arr[1]) + " мин."
    }
    return result_string
}

export const printMetro = (station) => {
    {
        station.colors.map(function (color, index) {
            // name = item.metro
            return (<span
                key={"station" + station + color + index + Math.random() + Math.random()}
                style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
        })
    }
    { station.metro }
}