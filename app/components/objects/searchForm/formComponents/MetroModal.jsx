import { AppBar, Button, Dialog, Toolbar, Typography } from "@mui/material";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import CheckIcon from '@mui/icons-material/Check';
import { useObjectSearchFormState } from "@/app/objects/store";
import MetroLink from "./MetroLink";

function MetroModal({ isOpen, handleClose }) {


    // const handleClose = () => {

    // }
    const formData = useObjectSearchFormState((state) => state.formData);
    const metro = useObjectSearchFormState((state) => state.search.metro);
    const brunches = useObjectSearchFormState((state) => state.search.brunches);
    // const districts = useObjectSearchFormState((state) => state.search.districts);
    // const okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);

    const dropStations = () => {
        setSearchParam('metro', []);
        setSearchParam('brunches', []);

    }
    const handleBrunchClick = (e) => {
        // console.log(formData.brunches);
        const brunch = Number(e.target.dataset.onclickparam);

        let current_brunch = formData.brunches[brunch]
        // console.log(bruch);
        // console.log(current_brunch);
        let brunches_arr = [];
        let metro_arr = [];
        brunches.map(function (item, index) {

            brunches_arr.push(item);
            return true;
        })
        metro.map(function (item, index) {
            metro_arr.push(item);
            return true;
        })
        if (brunches_arr.indexOf(brunch) > -1) {
            brunches_arr.splice(brunches_arr.indexOf(brunch), 1)
            current_brunch.map(function (item) {
                if (metro_arr.indexOf(item) > -1) {
                    metro_arr.splice(metro_arr.indexOf(item), 1)
                }
                return true;
            })
        } else {
            // console.log('добавляем')
            brunches_arr.push(brunch)
            current_brunch.map(function (item) {
                if (metro_arr.indexOf(item) < 0) {
                    metro_arr.push(item)
                }
                return true;
            })
        }
        setSearchParam('metro', metro_arr);
        setSearchParam('brunches', brunches_arr);

    }
    const handleStationClick = (e) => {
        updateMultyField('metro', Number(e.target.dataset.onclickparam));
    }
    // const brunches = [];

    return (<>

        <Dialog
            // fullScreen
            maxWidth={'xl'}
            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={handleClose}

        >

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
                                state={metro}
                                station={station}
                                handleStationClick={handleStationClick}

                            />
                        );
                    })}


            </div>
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >

                    <Button
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        onClick={dropStations}
                        color="error"
                    >
                        Сбросить
                    </Button>
                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                        Сохранить
                    </Button>


                </Toolbar>
            </AppBar>
        </Dialog>

    </>);
}

export default MetroModal;