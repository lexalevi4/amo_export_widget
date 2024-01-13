import { Button, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import ActivitiesTableRow from "./ActivitiesTableRow";

function ActivitiesTable({ activities }) {

    if (activities.length === 0) {
        return (<></>)
    }


    return (<>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Статус
                        </TableCell>
                        <TableCell>
                            Название
                        </TableCell>
                        <TableCell>
                            Цена
                        </TableCell>
                        <TableCell>

                        </TableCell>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {activities.map(activity => {
                        return (
                            <ActivitiesTableRow
                                key={'activity_row_' + activity.id}
                                activity={activity}
                            />
                        )
                    })}

                </TableBody>

            </Table>
        </TableContainer>

    </>);
}

export default ActivitiesTable;