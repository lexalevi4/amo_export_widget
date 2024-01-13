import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import LeadsTableRow from "./LeadsTableRow";

function LeadsTable({ formData, leadId, leads }) {
    // console.log(leads);
    if (leads.length === 0) {
        return <></>
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

            Список звонков
        </Typography>

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