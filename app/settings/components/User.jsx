import { Box, Button, FormControl, Grid, Stack, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import UserSettings from "./UserSettings";
import AccessRights from "./AccessRights";

function User({ user }) {
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => {
        setShowSettings(!showSettings)
    }
    const rights = {
        create: user.access_create,
        read: user.access_read,
        update: user.access_update,
        publish: user.access_publish,
        delete: user.access_delete
    }
    return (<>
        <TableRow

        >
            <TableCell>
                <Button
                    style={{
                        minWidth: 0,
                        textTransform: 'none'
                    }}
                    id={"showuserinfo" + user.id}
                    onClick={handleShow}
                >
                    {user.name}
                </Button>
            </TableCell>

            {/* <TableCell> */}
            <AccessRights
                id={user.id}
                value={rights}
            />
            {/* </TableCell> */}
        </TableRow>
        <TableRow
            style={{
                display: showSettings ? '' : 'none'
            }}
        // className="p-5"


        >
            <TableCell

                colSpan={6}
                className="p-10"
            >
                <UserSettings
                    handleShow={handleShow}
                    user={user} />
            </TableCell>
        </TableRow>
    </>);
}

export default User;