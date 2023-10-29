import { Button, Dialog, DialogActions, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";

function ObjectParamsTable({ object, formData }) {
    const [descOpen, setDescOpen] = useState(false);
    const handleDescOpen = () => {
        setDescOpen(!descOpen);
    }


    return (<>

        <TableContainer
            style={{
                overflow: 'hidden'
            }}
            component={Paper} className="my-3"  >
            <Table
                style={{
                    overflow: 'hidden'
                }}
                // sx={{
                //     width: 'max-content'
                // }}

                size="small" aria-label="a dense table"

            >
                {/* <TableHead>
                            <TableRow>
                                <TableCell
                                    className='pre_line'
                                >
                                    Параметр
                                </TableCell>

                                <TableCell
                                    className='pre_line'
                                >
                                    Значение
                                </TableCell>


                            </TableRow>

                        </TableHead> */}
                <TableBody>




                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            Площадь
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {object.totalArea} / {object.livingArea} / {object.kitchenArea}


                        </TableCell>


                    </TableRow>

                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            Этаж
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {object.floor}/{object.floorsCount}


                        </TableCell>


                    </TableRow>


                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            Материал
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {

                                formData.material.filter(item => Number(item.id) === Number(object.materialType))[0]?.name

                            }

                        </TableCell>


                    </TableRow>

                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            Год постройки
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {(
                                object.buildYear > 0
                            )
                                ?
                                object.buildYear
                                :
                                "не указано"
                            }

                        </TableCell>


                    </TableRow>

                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            Планировка
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {
                                (Number(object.plan) > 0
                                    ?
                                    formData.plan.filter(item => item.val === Number(object.plan))[0]?.name
                                    :
                                    "")
                            }

                        </TableCell>


                    </TableRow>

                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            {"С/У (разд/совм)"}
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {object.separateWcsCount}/{object.combinedWcsCount}

                        </TableCell>


                    </TableRow>

                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            {"Балконы/Лоджии"}
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            {object.balconiesCount}/{object.loggiasCount}

                        </TableCell>


                    </TableRow>



                    <TableRow>
                        <TableCell
                            className='pre_line'
                        >
                            {"Текстовое описание"}
                        </TableCell>

                        <TableCell
                            className='pre_line'
                        >

                            <Button
                                className='p-0'
                                onClick={handleDescOpen}
                                // size="small"
                                style={{
                                    textTransform: 'none',
                                }}
                            >
                                Показать
                            </Button>

                        </TableCell>


                    </TableRow>



                </TableBody>


            </Table>

        </TableContainer >

        <Dialog
            open={descOpen}
            onClose={() => setDescOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className="p-1">
                <Paper
                    className="p-1"
                    style={{
                        width: '80vw',
                        height: '65vh',
                        overflowY: 'auto'
                    }}
                >
                    <Typography>
                        {object.description?.split('\n').map(function (item, index) {
                            return (
                                <span key={'flat_desc_' + object.id + '_' + index}>
                                    {item}
                                    < br />
                                </span>
                            )
                        })}

                    </Typography>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDescOpen}
                    autoFocus
                >
                    Закрыть
                </Button>

            </DialogActions>
        </Dialog >

    </>);
}

export default ObjectParamsTable;