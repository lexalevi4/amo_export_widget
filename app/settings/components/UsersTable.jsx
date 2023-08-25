'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import User from "./User";

function UsersTable({ users, group }) {
    return (<>
        <Typography
            // className="mt-10"
        >{group}</Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography
                                variant="body2"
                                style={{

                                }}
                            >Имя</Typography>
                        </TableCell>

                        <TableCell>
                            Права
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    {users.map((user, index) => {
                        return (
                            <User
                                user={user}
                                key={'user_table_row' + user.id}
                            />

                        )

                    })}

                </TableBody>

            </Table>

        </TableContainer>
    </>);
}

export default UsersTable;