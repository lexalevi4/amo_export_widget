import { Button, ButtonGroup, TableCell } from "@mui/material";
import { useSettingsState } from "../store";

function AccessRights({ value, isGroup = false, id }) {
    const updateRights = useSettingsState((state) => state.updateAccessRights);
    // id, group, name, value
    const handler = async (name, value) => {
        updateRights(id, isGroup, name, value)
    }

    return (<>
        {/* <TableContainer>
            <Table 
            style={{
                width:150
            }}
            >
                <TableHead> */}
        {/* 
                    <TableRow>
                        <TableCell>Категория</TableCell>
                        <TableCell>Создание</TableCell>
                        <TableCell>Чтение</TableCell>
                        <TableCell>Изменение</TableCell>
                        <TableCell>Удаление</TableCell>

                    </TableRow> */}
        {/* </TableHead>
                <TableBody>
                    <TableRow> */}
        {/* <TableCell></TableCell> */}
        <TableCell
            className="text-center"
        >
            <ButtonGroup size="small" aria-label="small button group">
                <Button
                    variant={value.create === 0 ? 'contained' : "outlined"}
                    color={'error'}
                    onClick={() => handler('access_create', 0)}
                >
                    Нет
                </Button>
                <Button
                    variant={value.create === 1 ? 'contained' : "outlined"}
                    color={'success'}
                    onClick={() => handler('access_create', 1)}
                >Да</Button>
            </ButtonGroup>
        </TableCell>
        <TableCell
            className="text-center"
        >
            <ButtonGroup size="small" aria-label="small button group">
                <Button
                    variant={value.read === 0 ? 'contained' : "outlined"}
                    color={'error'}
                    onClick={() => handler('access_read', 0)}
                >Нет</Button>
                <Button
                    variant={value.read === 1 ? 'contained' : "outlined"}
                    onClick={() => handler('access_read', 1)}
                    color={'warning'}
                >Свои</Button>
                <Button
                    variant={value.read === 2 ? 'contained' : "outlined"}
                    color={'primary'}
                    onClick={() => handler('access_read', 2)}
                >Отдел</Button>
                <Button
                    variant={value.read === 3 ? 'contained' : "outlined"}
                    color={'success'}
                    onClick={() => handler('access_read', 3)}
                >Все</Button>
            </ButtonGroup>
        </TableCell>
        <TableCell
            className="text-center"
        >
            <ButtonGroup size="small" aria-label="small button group">
                < Button
                    onClick={() => handler('access_update', 0)}
                    variant={value.update === 0 ? 'contained' : "outlined"}
                    color={'error'}
                >Нет</Button>
                <Button
                    disabled={value.read < 1}
                    onClick={() => handler('access_update', 1)}
                    variant={value.update === 1 ? 'contained' : "outlined"}
                    color={'warning'}
                >Свои</Button>
                <Button
                    disabled={value.read < 2}
                    onClick={() => handler('access_update', 2)}
                    variant={value.update === 2 ? 'contained' : "outlined"}
                    color={'primary'}
                >Отдел</Button>
                <Button
                    disabled={value.read < 3}
                    onClick={() => handler('access_update', 3)}
                    variant={value.update === 3 ? 'contained' : "outlined"}
                    color={'success'}
                >Все</Button>
            </ButtonGroup>
        </TableCell>
        <TableCell
            className="text-center"
        >
            <ButtonGroup size="small" aria-label="small button group">
                <Button
                    onClick={() => handler('access_publish', 0)}
                    variant={value.publish === 0 ? 'contained' : "outlined"}

                    color={'error'}
                >
                    Нет
                </Button>
                <Button
                    disabled={value.read === 0}
                    onClick={() => handler('access_publish', 1)}
                    variant={value.publish === 1 ? 'contained' : "outlined"}
                    color={'success'}
                >Да</Button>
            </ButtonGroup>
        </TableCell>
        <TableCell
            className="text-center"
        >
            <ButtonGroup size="small" aria-label="small button group">
                <Button
                    onClick={() => handler('access_delete', 0)}
                    variant={value.delete === 0 ? 'contained' : "outlined"}
                    color={'error'}
                >Нет</Button>
                <Button
                    disabled={value.update < 1}
                    onClick={() => handler('access_delete', 1)}
                    variant={value.delete === 1 ? 'contained' : "outlined"}
                    color={'warning'}
                >Свои</Button>
                <Button
                    disabled={value.update < 2}
                    onClick={() => handler('access_delete', 2)}
                    variant={value.delete === 2 ? 'contained' : "outlined"}
                    color={'primary'}
                >Отдел</Button>
                <Button
                    disabled={value.update < 3}
                    onClick={() => handler('access_delete', 3)}
                    variant={value.delete === 3 ? 'contained' : "outlined"}
                    color={'success'}
                >Все</Button>
            </ButtonGroup>
        </TableCell>

        {/* </TableRow> */}
        {/* <TableRow>
                        <TableCell>Заявки</TableCell>
                        <TableCell>
                            <ButtonGroup size="small" aria-label="small button group">
                                <Button key="one">One</Button>
                                <Button key="two">Two</Button>
                            </ButtonGroup>
                        </TableCell>
                        <TableCell>  <ButtonGroup size="small" aria-label="small button group">
                            <Button >Нет</Button>
                            <Button>Свои</Button>
                            <Button>Отдел</Button>
                            <Button>Все</Button>
                        </ButtonGroup></TableCell>
                        <TableCell>  <ButtonGroup size="small" aria-label="small button group">
                            <Button >Нет</Button>
                            <Button>Свои</Button>
                            <Button>Отдел</Button>
                            <Button>Все</Button>
                        </ButtonGroup></TableCell>
                        <TableCell>  <ButtonGroup size="small" aria-label="small button group">
                            <Button >Нет</Button>
                            <Button>Свои</Button>
                            <Button>Отдел</Button>
                            <Button>Все</Button>
                        </ButtonGroup></TableCell>

                    </TableRow> */}
        {/* </TableBody>

            </Table>

        </TableContainer> */}

    </>);
}

export default AccessRights;