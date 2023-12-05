import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import LeadsTableRow from "./LeadsTableRow";

function LeadsTable({ formData, leadId, leads }) {
    console.log(leads);
    return (<>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>

                        <TableCell>
                            Название
                        </TableCell>
                        <TableCell>
                            Источник
                        </TableCell>

                        <TableCell>
                            Статус
                        </TableCell>
                        <TableCell>
                            История
                        </TableCell>

                    </TableRow>

                </TableHead>
                <TableBody>
                    {
                        leads.map(function (item, index) {
                            return (
                                // key={'client' + index
                                <LeadsTableRow
                                    item={item}
                                    index={index}

                                    key={'lead_' + index} />
                            )
                        })
                    }


                </TableBody>

            </Table>

        </TableContainer>

    </>);
}

export default LeadsTable;