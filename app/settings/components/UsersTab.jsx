import { useState } from "react";
import { useSettingsState } from "../store";
// import {  Table } from "@mui/joy";
import { Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Table } from "@mui/material";
import UsersTable from "./UsersTable";
function UsersTab({ }) {
    const users = useSettingsState((state) => state.settings.users);
    const groups = useSettingsState((state) => state.settings.groups);
    // const newAccordionOpen

    const [pipelinesButtonDisabled, setPipelinesButtonDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);

    const saveRights = async () => {
        setPipelinesButtonDisabled(true);
        const data = new FormData();
        data.append('users', JSON.stringify(
            (users.map((item) => {
                return {
                    id: item.id,
                    access_create: item.access_create,
                    access_read: item.access_read,
                    access_update: item.access_update,
                    access_publish: item.access_publish,
                    access_delete: item.access_delete,
                }
            }))
        ))
        data.append('groups', JSON.stringify(
            (groups.map((item) => {
                return {
                    id: item.id,
                    access_create: item.access_create,
                    access_read: item.access_read,
                    access_update: item.access_update,
                    access_publish: item.access_publish,
                    access_delete: item.access_delete,
                }
            }))
        ))
        try {
            const res = await fetch('/api/settings/users/access', {
                method: "POST",
                body: data
            })
            const response_data = await res.json()
            console.log(response_data);

            if (response_data.status === 'ok') {
                setSnackbarOpen(true);
            } else {
                setFailSnackbarOpen(true);
            }
        } catch (e) {
            setFailSnackbarOpen(true);
        }
        setPipelinesButtonDisabled(false);
    }
    return (<>

        <TableContainer>
            <Table
                sx={{
                    width: 'max-content'
                }}
                className="text-center"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Пользователь
                        </TableCell>
                        <TableCell
                            className="text-center"
                            width={100}
                        >
                            Создание
                        </TableCell>
                        <TableCell
                            className="text-center"
                        >Чтение</TableCell>
                        <TableCell
                            className="text-center"
                        >Изменение</TableCell>
                        <TableCell
                            className="text-center"
                        >Публикация</TableCell>
                        <TableCell
                            className="text-center"
                        >Удаление</TableCell>

                        {/* <TableCell> */}
                        {/* <AccessRights /> */}
                        {/* </TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map((group) => {

                        return (
                            <UsersTable
                                key={'grp+' + group.id}
                                group={group}
                                users={users.filter((user) => { return user.group_id === group.amo_group_id })}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <Button
            onClick={saveRights}
            className="mt-5"
            variant="contained"
        >
            Сохранить права
        </Button>


    </>);
}

export default UsersTab;