import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

function LeadsTableRow({ item, index }) {


    const types = {
        'call_in': 'Входящий звонок',
        'call_out': 'Иcходящий звонок',
        'note': 'Примечание',
    }
    const [show_history, setShow_history] = useState(false)

    return (<>
        <TableRow >

            <TableCell>
                {item.name}
            </TableCell>
            <TableCell>
                {item.src}
            </TableCell>
            <TableCell>
                {item.status}
                {item.comment && (
                    <>:
                        <br />
                        {/* <br /> */}
                        {item.comment}
                    </>
                )}






            </TableCell>
            <TableCell>
                <Button
                    onClick={() => setShow_history(!show_history)}
                >
                    История
                </Button>
            </TableCell>


        </TableRow>
        <TableRow




            style={
                !show_history ?
                    {
                        display: 'none'
                    } :
                    {

                    }
            }

            key={'client_+events' + index}
        >

            <TableCell
                colSpan={4}
            >
                {show_history && (
                    <TableContainer
                        component={Paper}
                    >
                        <Table
                        // component={'paper'}
                        >
                            <TableHead>
                                <TableRow>

                                    <TableCell>
                                        Дата
                                    </TableCell>
                                    <TableCell>
                                        Тип
                                    </TableCell>

                                    <TableCell>
                                        Инфо
                                    </TableCell>

                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {
                                    item.calls.map(function (event, index) {
                                        // console.log(event.created_at)
                                        // console.log(Date(Number(event.created_at)))
                                        // var s =dayjs(endDate * 1000).format('DD/MM/YYYY HH:mm')}
                                        var s = new Date(Number(event.created_at * 1000)).toLocaleDateString("ru-RU")
                                        // console.log(s)
                                        return (
                                            <TableRow key={'event_' + index}>

                                                <TableCell>
                                                    {
                                                        s
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        types[event.type]
                                                    }
                                                </TableCell>

                                                <TableCell>
                                                    {
                                                        event.record === '' ? event.text : (
                                                            <ReactAudioPlayer
                                                                src={event.record}
                                                                autoPlay={false}
                                                                controls
                                                            />
                                                        )
                                                    }
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })

                                }

                            </TableBody>

                        </Table>
                    </TableContainer>
                )}





            </TableCell>



        </TableRow >
    </>);
}

export default LeadsTableRow;