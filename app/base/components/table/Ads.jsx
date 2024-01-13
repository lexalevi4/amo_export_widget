import { useAccountState } from "@/app/store/account/accountStore";
import { Button, Grid, Link, Sheet, Table, Typography } from "@mui/joy";
import ErrorIcon from '@mui/icons-material/Error';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BaseTableAdTableRow from "./BaseTableAdTableRow";
function Ads({ ads, objectId, responsible }) {

    const users = useAccountState((state) => state.users);
    const statuses = useAccountState((state) => state.statuses);
    const session = useAccountState((state) => state.session);
    const feeds = useAccountState((state) => state.feeds);

    return (<>

        <Sheet>

            <Table>
                <tbody>
                    {ads.map(ad => {
                        return (
                            <tr key={'ad_' + ad.id}
                            >
                                <td
                                    width={150}
                                >
                                    {objectId + '-' + ad.id}
                                </td>
                                <td>
                                    <Sheet>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <td
                                                        width={150}
                                                    >
                                                        Доска
                                                    </td>
                                                    <td
                                                        width={150}
                                                    >
                                                        Статус
                                                    </td>
                                                    <td>
                                                        Сообщение
                                                    </td>
                                                    <td
                                                        width={100}
                                                    >
                                                        Ссылка
                                                    </td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {feeds.map((feed, feed_index) => {
                                                    return (
                                                        <BaseTableAdTableRow
                                                            objectId={objectId}
                                                            key={'ad_row_' + feed.id + '_' + ad.id}
                                                            feed={feed}
                                                            ad={ad}
                                                        />
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Sheet>

                                </td>
                            </tr>
                        )

                    })}
                </tbody>
            </Table >
        </Sheet>

    </>);
}

export default Ads;