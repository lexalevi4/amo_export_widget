'use client'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ObjectsTableRow from "./ObjectsTableRow";
import LoadingTb from "../../Loading";
import { useMemo } from "react";
import ReportPlotModal from "./ReportPlotModal";

function ObjectsTable({ objects, formData, isLoading = false, isFilter = false, filterId = 0, setObjectStatus = () => { } }) {
    console.log(formData);



    if (objects?.status === 'error') {
        return (
            <Typography variant="h2">
                {objects?.error}

            </Typography>
        )
    }

    if (isLoading) {
        return (
            <>
                <Paper
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <LoadingTb />
                    &nbsp;


                </Paper >
            </>
        )
    }
    if (objects.length === 0) {
        return (
            <Typography
                variant="h6"
            >
                Ничего не найдено

            </Typography>
        )

    }


    return (
        // useMemo(() => (

        <>

            <TableContainer component={Paper} elevation={4}
                style={{
                    // overflow:'unset'
                    // maxWidth: 1000
                }}
            >
                <Table aria-label="collapsible table"
                    style={{
                        // width: 'max-content'
                        maxWidth: '80svw',
                        boxSizing: 'border-box'
                    }}
                >

                    {/* <TableHead>
                    <TableRow>
                        <TableCell />
                        
                        <TableCell align="right">Объект</TableCell>
                        
                        <TableCell align="right">Цена</TableCell>
                        <TableCell align="right">Контакты</TableCell>
                    </TableRow>
                </TableHead> */}
                    {/* {console.log(objects)} */}
                    <TableBody>

                        {
                            objects.map((flat) => {
                                return (
                                    <ObjectsTableRow
                                        flat={flat}
                                        formData={formData}
                                        key={'flat-row-' + flat.id}
                                        isFilter={isFilter}
                                        filterId={filterId}
                                        setObjectStatus={setObjectStatus}
                                    />
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
            <ReportPlotModal />
        </>
    )
    // , [objects]))
}

export default ObjectsTable;