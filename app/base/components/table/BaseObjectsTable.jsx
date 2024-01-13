import LoadingTb from "@/app/components/Loading";

import { useObjectSearchFormState } from "@/app/objects/store";
import { Avatar, Button, Chip, Box, Link, Sheet, Stack, Table, Typography } from "@mui/joy";

import { useAccountState } from "@/app/store/account/accountStore";
import BaseObjectsTableRow from "./BaseObjectsTableRow";

function BaseObjectsTable({ objects, loading }) {


    const totalCount = useObjectSearchFormState((state) => state.objectsCount);
    const page = useObjectSearchFormState((state) => state.page);
    const per_page = 20;
    // console.log(session);
    if (loading) {
        return (<LoadingTb />)
    }

    if (objects.length === 0) {
        return (
            <Typography
                level="title-lg"
            >
                Ничего не найдено
            </Typography>
        )
    }


    return (<>
        <Sheet
            // sx={{
            //     maxHeight: '80svh',
            //     overflow: 'auto'

            // }}
        >
            <Table
                // hoverRow
                // sx={{
                //     maxHeight: '90svh',
                //     overflow: 'auto'

                // }}
                size="md"
                // stripe="odd"
                stickyHeader
            >
                <caption
                    className="text-end"
                >
                    Показано: {(((page - 1) * per_page) + 1)}- {(((page - 1) * per_page) + objects.length)} из {totalCount}
                </caption>
                <thead>
                    <tr>
                        <th
                            width={15}
                        >

                        </th>
                        <th
                            width={120}
                        >ID</th>
                        <th
                            width={100}
                        >
                            Объект
                        </th>

                        <th
                            width={400}
                        >
                            Адрес
                        </th>
                        <th
                            width={100}
                        >
                            Площадь
                        </th>
                        <th
                            width={100}
                        >
                            Этаж
                        </th>
                        <th
                            width={100}
                        >
                            Цена
                        </th>
                        <th>Контакты</th>
                        {/* <th
                         width={30}
                        ></th> */}
                    </tr>
                </thead>
                {objects.map(object => {
                    // console.log(object);

                    return (
                        <BaseObjectsTableRow
                            object={object}
                            key={'object_row_' + object.id}
                        />

                    )
                })}
            </Table>

        </Sheet>

    </>);
}

export default BaseObjectsTable;