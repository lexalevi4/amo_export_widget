import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function SummaryLeadsTable({ clients }) {

    // const [summaryData,setSummaryData]=useSta

    const [summary, setSummary] = useState([]);


    useEffect(() => {


        let table = [];
        let all_srcs = [];
        let all_statuses = [];
        clients.map(function (item) {
            all_srcs.push(item.src)
            all_statuses.push(item.status)
        })
        let total_count = clients.length;
        let total_statuses = [];



        let unique_srcs = [...new Set(all_srcs)];
        let unique_statuses = [...new Set(all_statuses)];
        // console.log(unique_srcs); // unique is ['a', 1, 2, '1']

        unique_srcs.map(function (item) {
            let current_statuses = []
            let src_clients = clients.filter(function (client) {
                return client.src === item;
            })
            let count = src_clients.length;
            unique_statuses.map(function (status) {
                let status_clients = clients.filter(function (client) {
                    return client.src === item && client.status === status;
                });
                if (status_clients.length > 0) {
                    current_statuses.push({
                        'status': status,
                        'count': status_clients.length
                    })
                }
            })
            table.push({
                src: item,
                count: count,
                statuses: current_statuses
            })
        })

        unique_statuses.map(function (status) {
            let status_clients = clients.filter(function (client) {
                return client.status === status;
            });
            total_statuses.push({
                'status': status,
                'count': status_clients.length
            })
        })
        table.push({
            src: "Итого",
            count: total_count,
            statuses: total_statuses
        })



        setSummary(table);
        // console.log(table);


    }, [clients]
    )

    if (clients.length === 0) {
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

                Звонков нет
            </Typography>
        </>)
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

            Сводная таблица по звонкам
        </Typography>
        <TableContainer
            component={Paper}
            style={{
                overflowX: 'auto'
            }}
        >
            <Table

            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            style={{
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Иточник
                        </TableCell>
                        {/* <TableCell
                                style={{
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Количество
                            </TableCell> */}
                        <TableCell
                            style={{
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Статус
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        summary.map(function (item, index) {
                            return (
                                <TableRow
                                    key={'clients_summary' + index}
                                >
                                    <TableCell
                                        style={{
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {/* <Typography> */}
                                        {item.src}
                                        {/* </Typography> */}
                                    </TableCell>
                                    {/* <TableCell
                                            style={{
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                           
                                            {item.count}
                                        </TableCell> */}
                                    <TableCell
                                        style={{
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {/* <Typography> */}
                                        {item.statuses.map(function (status) {
                                            return (
                                                <span key={'status_' + item.id + '_' + status.status}>
                                                    {status.status + ": " + status.count}
                                                    <br />
                                                </span>
                                            )

                                        })}
                                        {/* </Typography> */}
                                    </TableCell>
                                </TableRow>
                            )

                        })
                    }

                </TableBody>
            </Table>

        </TableContainer>
    </>);
}

export default SummaryLeadsTable;