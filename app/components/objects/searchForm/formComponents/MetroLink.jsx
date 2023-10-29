import { Typography } from "@mui/material";
import { useMemo } from "react";

function MetroLink({
    handleStationClick,
    state,
    station,
    topDiff,
    leftDiff

}) {
    // console.log(state);

    const checked = useMemo(() => {
        let id = Number(station.id)
        return state.includes(id)
    }, [station.id, state])

    let width = null;
    const images = [];
    if (station?.div_options !== '' && station?.div_options !== null) {
        console.log(station.div_options);
        let options = JSON.parse(station.div_options);
        width = options.width;
        station.metro = station.metro.split(' ').join('\n')
    }
    if (station?.images !== '' && station?.images !== null) {
        JSON.parse(station.images).map(image => {
            images.push(image);
            return true;
        })
    }

    console.log(width);


    return (
        useMemo(() => {
            // console.log('sdfsdf');
            return (
                <>
                    <img
                        key={station.id + "img"}
                        src='https://img.pyxi.pro/tchk.gif'
                        id={'metro_img' + station.id}
                        alt={'tchk'}
                        // className={(checked) ? '' : "station_img_hidden"}
                        style={{
                            display: (checked) ? null : "none",
                            position: 'absolute',
                            left: (Number(station.img_left) - 100 + leftDiff) + "px",
                            top: (Number(station.img_top) + 24 + topDiff) + "px",


                        }}
                    />

                    {images.map((image, index) => {
                        console.log(image);
                        return (

                            <img
                                key={station.id + '_' + index + "add_img"}
                                src='https://img.pyxi.pro/tchk.gif'
                                // id={'metro_img' + station.id}
                                alt={'tchk'}
                                // className={(checked) ? '' : "station_img_hidden"}
                                style={{
                                    display: (checked) ? null : "none",
                                    position: 'absolute',
                                    left: (Number(image.left) - 100 + leftDiff) + "px",
                                    top: (Number(image.top) + 24 + topDiff) + "px",

                                }}
                            />
                        )
                    })}






                    <div
                        key={station.id + "div"}
                        className={'metro_div'}
                        style={{
                            position: 'absolute',
                            left: (Number(station.div_left) - 100 + leftDiff) + "px",
                            top: (Number(station.div_top) + 24 + topDiff) + "px",

                            lineHeight: 11


                        }}
                    >
                        <Typography
                            key={station.id + "link"}
                            className={checked ? 'station_link_active' : "station_link"}
                            onClick={handleStationClick}
                            data-onclickparam={station.id}
                            style={{
                                cursor: 'pointer',
                                fontSize: '10px',
                                width: width,
                                lineHeight: 1
                            }
                            }
                        >{station.metro}</Typography>
                    </div>
                </>
            )
        }, [checked, station.id, station.img_left, station.div_left, station.div_top, station.img_top, station.metro])

    );
}

export default MetroLink;