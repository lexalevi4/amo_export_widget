import { Typography } from "@mui/material";
import MetroLink from "./MetroLink";

function MetroMap({ brunches, handleBrunchClick, handleStationClick ,formData, state }) {
    return (
        <div
            className='m-3 p-2 pt-5 pb-5'
            style={{

            }}
        >
            <div

                className='m-3 p-2 mt-5 mb-5'
                style={{
                    // transform: 'scale(1.5)'
                    // cursor: '-webkit-grab',
                    width: '1235px',
                    marginTop: 109,
                    marginBottom: 80,
                    marginLeft: 39,

                }}
            >
                <table>
                    <tbody>
                        <tr>
                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography

                                    // className="select_brunch"
                                    className={!brunches.includes(1) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={1}
                                    style={{
                                        "color": "#EF1E25",
                                        cursor: 'pointer'
                                    }}
                                >Красная
                                    верх</Typography>
                                <Typography
                                    className={!brunches.includes(13) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={13}

                                    style={{
                                        "color": "#EF1E25",
                                        cursor: 'pointer'
                                    }}
                                >Красная
                                    низ</Typography>
                            </td>
                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(2) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={2}


                                    style={{
                                        "color": "#029A55",
                                        cursor: 'pointer'
                                    }}
                                >Зелёная
                                    верх</Typography>
                                <Typography
                                    className={!brunches.includes(14) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={14}
                                    style={{
                                        "color": "#029A55",
                                        cursor: 'pointer'
                                    }}
                                >Зелёная
                                    низ</Typography>

                            </td>
                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(3) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={3}


                                    style={{
                                        "color": "#0252A2",
                                        cursor: 'pointer'
                                    }}
                                >Синяя
                                    запад</Typography>
                                <Typography
                                    className={!brunches.includes(15) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={15}
                                    style={{
                                        "color": "#0252A2",
                                        cursor: 'pointer'
                                    }}
                                >Синяя
                                    восток</Typography>
                                <Typography
                                    className={!brunches.includes(4) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={4}


                                    style={{
                                        "color": "#019EE0",
                                        cursor: 'pointer'
                                    }}
                                >Филёвская</Typography>
                            </td>

                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(6) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={6}

                                    style={{
                                        "color": "#FBAA33",
                                        cursor: 'pointer'
                                    }}
                                >Оранжевая верх</Typography>
                                <Typography
                                    className={!brunches.includes(16) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={16}

                                    style={{
                                        "color": "#FBAA33",
                                        cursor: 'pointer'
                                    }}
                                >Оранжевая
                                    низ</Typography>
                                <Typography
                                    className={!brunches.includes(11) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={11}

                                    style={{
                                        "color": "#85D4F3",
                                        cursor: 'pointer'
                                    }}
                                >Бутовская</Typography>
                            </td>

                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(8) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                    onClick={handleBrunchClick}
                                    data-onclickparam={8}
                                    style={{
                                        "color": "#ACADAF",
                                        cursor: 'pointer'
                                    }}


                                >Серая верх</Typography>
                                <Typography
                                    className={!brunches.includes(17) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={17}
                                    style={{
                                        "color": "#ACADAF",
                                        cursor: 'pointer'
                                    }}


                                >Серая низ</Typography>
                            </td>

                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(9) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={9}


                                    style={{
                                        "color": "#B1D332",
                                        cursor: 'pointer'
                                    }}
                                >Салатовая верх</Typography>
                                <Typography
                                    className={!brunches.includes(18) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={18}


                                    style={{
                                        "color": "#B1D332",
                                        cursor: 'pointer'
                                    }}
                                >Салатовая низ</Typography>
                            </td>

                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(12) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={12}


                                    style={{
                                        "color": "#AB258C",
                                        cursor: 'pointer'
                                    }}
                                >Фиолетовая верх</Typography>
                                <Typography
                                    className={!brunches.includes(19) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={19}


                                    style={{
                                        "color": "#AB258C",
                                        cursor: 'pointer'
                                    }}
                                >Фиолетовая низ</Typography>

                                <Typography
                                    className={!brunches.includes(45) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={45}


                                    style={{
                                        "color": "#DE63A1",
                                        cursor: 'pointer'
                                    }}
                                >Некрасовская</Typography>


                            </td>

                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(7) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={7}


                                    style={{
                                        "color": "#FFD803",
                                        cursor: 'pointer'
                                    }}
                                >Калининская</Typography>
                                <Typography
                                    className={!brunches.includes(40) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={40}


                                    style={{
                                        "color": "#FFD803",
                                        cursor: 'pointer'
                                    }}
                                >Солнцевская</Typography>
                            </td>

                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography
                                    className={!brunches.includes(5) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={5}

                                    style={{
                                        "color": "#8D7A55",
                                        cursor: 'pointer'
                                    }}
                                >Кольцевая</Typography>
                                <Typography
                                    className={!brunches.includes(35) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={35}

                                    style={{
                                        "color": "#FFA8AF",
                                        cursor: 'pointer'
                                    }}
                                >МЦК</Typography>
                                <Typography
                                    className={!brunches.includes(44) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                    onClick={handleBrunchClick}
                                    data-onclickparam={44}
                                    style={{
                                        "color": "#7FBEBB",
                                        cursor: 'pointer'
                                    }}
                                >Большое кольцо</Typography>


                            </td>
                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                <Typography>
                                    <span
                                        className={!brunches.includes(20) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={20}

                                        style={{
                                            "color": "#8D7A55",
                                            cursor: 'pointer'
                                        }}
                                    >Внутри кольца</span><br />
                                    От кольца:<br /> <span
                                        className={!brunches.includes(21) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={21}
                                        style={{

                                            cursor: 'pointer'
                                        }}

                                    >+1</span>
                                    <span
                                        className={!brunches.includes(22) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={22}
                                        style={{

                                            cursor: 'pointer'
                                        }}
                                    >+2</span>
                                    <span
                                        className={!brunches.includes(23) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={23}
                                        style={{

                                            cursor: 'pointer'
                                        }}
                                    >+3</span>
                                    <span
                                        className={!brunches.includes(24) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                        onClick={handleBrunchClick}
                                        data-onclickparam={24}
                                        style={{

                                            cursor: 'pointer'
                                        }}
                                    >+4</span>
                                </Typography>
                            </td>


                        </tr>
                    </tbody>
                </table>

                <img
                    style={{

                        marginLeft: '100px'
                    }
                    }
                    src='https://pyxi.pro/metromap_new.png'
                />
            </div>
            {

                formData.metro.map(function (station) {
                    return (
                        <MetroLink
                            key={station.id}
                            state={state}
                            station={station}
                            handleStationClick={handleStationClick}

                        />
                    );
                })}


        </div>
    );
}

export default MetroMap;