'use client'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import User from "./User";
import AccessRights from "./AccessRights";

function UsersTable({ users, group }) {
    const rights = {
        create: group.access_create,
        read: group.access_read,
        update: group.access_update,
        publish: group.access_publish,
        delete: group.access_delete
    }
    return (<>
        <TableRow
            style={{
                backgroundColor: 'lightgray'
            }}

        >
            <TableCell
                className="pt-5"
            >

                {group.name}

            </TableCell>

            {/* <TableCell> */}
            <AccessRights value={rights} isGroup={true} id={group.id} />
            {/* </TableCell> */}
        </TableRow>


        {users.map((user, index) => {
            return (
                <User
                    user={user}
                    key={'user_table_row' + user.id}
                />

            )

        })}


    </>);
}

export default UsersTable;