'use client'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ObjectsTableRow from "./ObjectsTableRow";

function ObjectsTable({ objects, formData }) {

    return (<>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                {/* <TableHead>
                    <TableRow>
                        <TableCell />
                        
                        <TableCell align="right">Объект</TableCell>
                        
                        <TableCell align="right">Цена</TableCell>
                        <TableCell align="right">Контакты</TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>

                    {
                        objects.map((flat) => {
                            return (
                                <ObjectsTableRow
                                    flat={flat}
                                    formData={formData}
                                    key={'flat-row-' + flat.id}
                                />
                            )
                        })
                    }

                </TableBody>
            </Table>
        </TableContainer>
    </>);
}

export default ObjectsTable;