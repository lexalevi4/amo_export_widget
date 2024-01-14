import LoadingTb from "@/app/components/Loading";

import { useObjectSearchFormState } from "@/app/objects/store";
import { Sheet, Table, Typography, Dropdown, MenuButton, MenuItem, Menu } from "@mui/joy";

import BaseObjectsTableRow from "./BaseObjectsTableRow";
import { ArrowDropDown } from "@mui/icons-material";

function BaseObjectsTable({ objects, loading }) {


    const totalCount = useObjectSearchFormState((state) => state.objectsCount);
    const page = useObjectSearchFormState((state) => state.page);
    const perPage = useObjectSearchFormState((state) => state.perPage);
    const sort = useObjectSearchFormState((state) => state.sort);
    const setState = useObjectSearchFormState((state) => state.setState);
    const setPerPage = useObjectSearchFormState((state) => state.setPerPage);
    const setSort = useObjectSearchFormState((state) => state.setSort);
    const objectsIsLoading = useObjectSearchFormState((state) => state.objectsIsLoading);
    // const per_page = 20;
    // console.log(session);
    // if (loading) {
    //     return (<LoadingTb />)
    // }

    if (objects.length === 0) {
        return (
            <Typography
                level="title-lg"
            >
                Ничего не найдено
            </Typography>
        )
    }

    const getSort = () => {
        if (sort === 'date') {
            return "По дате"
        }
        if (sort === 'price') {
            return "По цене"
        }
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
                    Показано: {(((page - 1) * perPage) + 1)}- {(((page - 1) * perPage) + objects.length)} из {totalCount}
                    <Dropdown

                        size='sm'

                    >
                        <MenuButton
                            disabled={objectsIsLoading}
                            className='ml-5'
                            size='sm'
                            endDecorator={<ArrowDropDown />}>на странице {perPage}</MenuButton>
                        <Menu>
                            <MenuItem
                                disabled={objectsIsLoading}
                                onClick={() => { perPage !== 20 && setPerPage(20) }}
                            >
                                20
                            </MenuItem>
                            <MenuItem
                                disabled={objectsIsLoading}
                                onClick={() => { perPage !== 50 && setPerPage(50) }}
                            >
                                50
                            </MenuItem>
                            <MenuItem
                                disabled={objectsIsLoading}
                                onClick={() => { perPage !== 100 && setPerPage(100) }}
                            >
                                100
                            </MenuItem>
                        </Menu>
                    </Dropdown>
                    <Dropdown
                        size='sm'

                    >
                        <MenuButton
                            disabled={objectsIsLoading}
                            className='ml-5'
                            size='sm'
                            endDecorator={<ArrowDropDown />}>Сортировка ({getSort()})</MenuButton>
                        <Menu>
                            <MenuItem
                                disabled={objectsIsLoading}
                                onClick={() => { sort !== 'date' && setSort('date') }}
                            >
                                По дате
                            </MenuItem>
                            <MenuItem
                                disabled={objectsIsLoading}
                                onClick={() => { sort !== 'price' && setSort('price') }}
                            >
                                По цене
                            </MenuItem>

                        </Menu>
                    </Dropdown>
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
                {objectsIsLoading && (
                    <tr>
                        <td
                            // height={800}
                            colSpan={9}
                        >
                            <Sheet
                                sx={{ height: 800 }}
                            >
                                <LoadingTb />
                            </Sheet>

                        </td>
                    </tr>
                )}

                {!objectsIsLoading && objects.map(object => {
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