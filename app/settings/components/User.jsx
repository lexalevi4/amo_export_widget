import { Box, Button, FormControl, Grid, Stack, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import UserSettings from "./UserSettings";

function User({ user }) {
    const [showSettings, setShowSettings] = useState(false);
    const handleShow = () => {
        setShowSettings(!showSettings)
    }
    return (<>
        <TableRow

        >
            <TableCell>
                <Button
                    style={{
                        textTransform: 'none'
                    }}
                    id={"showuserinfo" + user.id}
                    onClick={handleShow}
                >
                    {user.name}
                </Button>
            </TableCell>

            <TableCell>
                Права
            </TableCell>
        </TableRow>
        <TableRow
            style={{
                display: showSettings ? '' : 'none'
            }}
        // className="p-5"


        >
            <TableCell

                colSpan={2}
            >
                <UserSettings
                    handleShow={handleShow}
                    user={user} />
            </TableCell>
        </TableRow>
    </>);
}

export default User;