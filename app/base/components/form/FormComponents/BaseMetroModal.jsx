import MetroLink from "@/app/components/objects/searchForm/formComponents/MetroLink";
import MetroMap from "@/app/components/objects/searchForm/formComponents/MetroMap";
import { useObjectSearchFormState } from "@/app/objects/store";
import { Button, DialogActions, Modal, ModalClose, ModalDialog, Sheet, Table, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

function BaseMetroModal({ isOpen, setIsOpen }) {


    const [metroImage, setMetroImage] = useState('')
    const [topDiff, setTopDiff] = useState(0)
    const [leftDiff, setLeftDiff] = useState(0)

    const region = useObjectSearchFormState((state) => state.search.region);

    const formMetro = useObjectSearchFormState((state) => state.metro);
    const formDistricts = useObjectSearchFormState((state) => state.districts);

    const formData = useObjectSearchFormState((state) => state.formData);
    const metro = useObjectSearchFormState((state) => state.search.metro);
    const brunches = useObjectSearchFormState((state) => state.search.brunches);
    // const districts = useObjectSearchFormState((state) => state.search.districts);
    // const okrugs = useObjectSearchFormState((state) => state.search.okrugs);
    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField);
    const setSearchParam = useObjectSearchFormState((state) => state.setSearchParam);


    console.log(formMetro);

    useEffect(() => {
        if (Number(region) === 1) {
            setMetroImage('/metro.png')
            setTopDiff(-252);
            setLeftDiff(-67)

            // const topDiff = -252;
            // const leftDiff = -67;
        }
        if (Number(region) === 2) {
            setTopDiff(-24);
            setLeftDiff(100)
            setMetroImage('/spb_metro.png')
        }
    }, [region])

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



    return (<>


        <Modal
            open={isOpen}
            onClose={() => { setIsOpen(false) }}

        >
            <ModalDialog>
                <ModalClose />
                <div
                    style={{
                        minWidth: 800,
                        minHeight: 500,
                        maxHeight: '80svh',
                        maxWidth: '60svw',
                        overflowX: 'auto',
                        overflowY: 'auto'
                    }}
                >
                    <Sheet>
                        <Sheet>
                            {Number(region) === 1 && (
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                                <Typography
                                                    component={'div'}

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
                                                    component={'div'}
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
                                                    component={'div'}
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
                                                    component={'div'}
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
                                                    component={'div'}
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
                                                    component={'div'}
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
                                                    component={'div'}
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
                                                    component={'div'}
                                                    className={!brunches.includes(6) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={6}

                                                    style={{
                                                        "color": "#FBAA33",
                                                        cursor: 'pointer'
                                                    }}
                                                >Оранжевая верх</Typography>
                                                <Typography
                                                    component={'div'}
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
                                                    component={'div'}
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
                                                    component={'div'}
                                                    className={!brunches.includes(8) ? 'select_brunch ' : "select_brunch brunch_link_active"}

                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={8}
                                                    style={{
                                                        "color": "#ACADAF",
                                                        cursor: 'pointer'
                                                    }}


                                                >Серая верх</Typography>
                                                <Typography
                                                    component={'div'}
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
                                                    component={'div'}
                                                    className={!brunches.includes(9) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={9}


                                                    style={{
                                                        "color": "#B1D332",
                                                        cursor: 'pointer'
                                                    }}
                                                >Салатовая верх</Typography>
                                                <Typography
                                                    component={'div'}
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
                                                    component={'div'}
                                                    className={!brunches.includes(12) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={12}


                                                    style={{
                                                        "color": "#AB258C",
                                                        cursor: 'pointer'
                                                    }}
                                                >Фиолетовая верх</Typography>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(19) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={19}


                                                    style={{
                                                        "color": "#AB258C",
                                                        cursor: 'pointer'
                                                    }}
                                                >Фиолетовая низ</Typography>

                                                <Typography
                                                    component={'div'}
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
                                                    component={'div'}
                                                    className={!brunches.includes(7) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={7}


                                                    style={{
                                                        "color": "#FFD803",
                                                        cursor: 'pointer'
                                                    }}
                                                >Калининская
                                                </Typography>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(40) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={40}


                                                    style={{
                                                        "color": "#FFD803",
                                                        cursor: 'pointer'
                                                    }}
                                                >Солнцевская
                                                </Typography>
                                            </td>

                                            <td valign="top" style={{ "paddingLeft": "10px" }}>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(5) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={5}

                                                    style={{
                                                        "color": "#8D7A55",
                                                        cursor: 'pointer'
                                                    }}
                                                >Кольцевая</Typography>

                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(20) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={20}
                                                    style={{
                                                        "color": "#8D7A55",
                                                        cursor: 'pointer'
                                                    }}
                                                >Внутри кольца</Typography>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(35) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={35}

                                                    style={{
                                                        "color": "#FFA8AF",
                                                        cursor: 'pointer'
                                                    }}
                                                >МЦК</Typography>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(44) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={44}
                                                    style={{
                                                        "color": "#7FBEBB",
                                                        cursor: 'pointer'
                                                    }}
                                                >БКЛ</Typography>




                                            </td>

                                            <td>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(46) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={46}

                                                    style={{
                                                        "color": "#DE9C4E",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    МЦД-1
                                                </Typography>

                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(47) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={47}

                                                    style={{
                                                        "color": "#BD748F",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    МЦД-2
                                                </Typography>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(48) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={48}

                                                    style={{
                                                        "color": "#E15D29",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    МЦД-3
                                                </Typography>
                                                <Typography
                                                    component={'div'}

                                                    className={!brunches.includes(49) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={49}

                                                    style={{
                                                        "color": "#3CB183",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    МЦД-4
                                                </Typography>



                                            </td>


                                        </tr>
                                    </tbody>
                                </Table>
                            )}
                            {Number(region) === 2 && (
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(50) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={50}

                                                    style={{
                                                        "color": "#DA2128",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Первая
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(51) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={51}

                                                    style={{
                                                        "color": "#0078BF",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Вторая
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(52) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={52}

                                                    style={{
                                                        "color": "#48B85E",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Третья
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(53) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={53}

                                                    style={{
                                                        "color": "#F58220",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Четвёртая
                                                </Typography>
                                            </td>
                                            <td>
                                                <Typography
                                                    component={'div'}
                                                    className={!brunches.includes(54) ? 'select_brunch ' : "select_brunch brunch_link_active"}
                                                    onClick={handleBrunchClick}
                                                    data-onclickparam={54}

                                                    style={{
                                                        "color": "#8E479B",
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Пятая
                                                </Typography>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )}

                        </Sheet>
                        <Sheet>

                            <img
                                style={{

                                    // marginLeft: '100px',
                                    display: 'block',
                                }
                                }
                                // src='https://pyxi.pro/metromap_new.png'
                                src={metroImage}

                            />
                            {

                                formMetro.map(function (station) {
                                    return (
                                        <MetroLink
                                            topDiff={topDiff}
                                            leftDiff={leftDiff}
                                            key={station.id}
                                            state={metro}
                                            station={station}
                                            handleStationClick={handleStationClick}

                                        />
                                    );
                                })
                            }
                        </Sheet>
                    </Sheet>
                </div>
                {/* <DialogActions
                    className='flex'
                // buttonFlex

                > */}
                <Sheet
                    className='text-center'
                >
                    <Button
                        className="mx-2"
                    >Сохранить
                    </Button>
                    <Button
                        onClick={dropStations}
                        color='danger'
                        className="mx-2"
                    >Сбросить
                    </Button>
                </Sheet>

                {/* </DialogActions> */}
            </ModalDialog>



        </Modal>
    </>);
}

export default BaseMetroModal;