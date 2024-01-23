import { useObjectSearchFormState } from "@/app/objects/store";
import { useAccountState } from "@/app/store/account/accountStore";
import { Avatar, Button, Chip, Link, Sheet, Stack, Tab, TabList, TabPanel, Table, Tabs, Tooltip, Typography } from "@mui/joy";
import { ImageList, ImageListItem } from "@mui/material";
import { useState } from "react";
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import { printObject, secToStr } from "@/app/heplers/tableHelper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Map, Placemark, RulerControl, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import Images from "@/app/components/objects/objectsTable/Images";
import BaseObjectsImages from "./BaseObjectsImages";
import DeleteIcon from '@mui/icons-material/Delete';
import Ads from "./Ads";
import EditIcon from '@mui/icons-material/Edit';
import { checkRights } from "@/app/heplers/acl";
function BaseObjectsTableRow({ object, setObjectForEdit }) {
    const formData = useObjectSearchFormState((state) => state.formData);
    const users = useAccountState((state) => state.users)
    const groups = useAccountState((state) => state.groups)
    const statuses = useAccountState((state) => state.statuses)
    const session = useAccountState((state) => state.session)
    const currentUser = useAccountState((state) => state.currentUser)

    const [isOpen, setIsOpen] = useState(false)




    const checkAccess = (access) => {
        return checkRights(access, currentUser, object.lead, groups, session)
    }

    if (object.amo_account_id > 0) {
        if (!checkAccess('access_read')) {
            return (<>

            </>)
        }
    }



    const printStatus = (lead) => {
        let currentStatus = statuses.filter(status => status.amo_id === lead.status_id)[0] || [];
        return (<>
            <Typography
                component={'div'}
                className='mb-1'
                sx={{
                    backgroundColor: currentStatus.color
                }}
            >
                {currentStatus.name}
            </Typography>
            <Link
                className='mb-2'
                target="_blank"
                href={session.account_domain + "/leads/detail/" + lead.lead_id}
            >
                Ссылка на сделку
            </Link>
        </>)
    }

    const printMkadDistance = (distances) => {

        let min_distance = null;
        let highway = null;
        distances.map(distance => {
            if (!min_distance || min_distance > distance.distance) {
                min_distance = distance.distance
                let current_highway = formData.highway.filter(item => Number(distance.id) === Number(item.id))[0];
                highway = current_highway.name
            }
            return true
        })

        // let distances_km = (distances.map(distance => distance.distance))
        // // console.log(distances_km)
        // let min_distance = (Math.min(...distances_km) / 1000);
        return "До Мкад " + " " + Math.round(min_distance / 1000) + " км. (" + highway + ")"

    }

    const printUser = (user) => {
        // console.log(user)
        try {
            let currentUser = users.filter(item => item.amo_user_id === user)[0];
            // console.log(currentUser)
            // return currentUser;
            return (
                <>
                    <Stack
                    // className="align-middle"
                    >
                        <Stack
                            className="align-middle"
                            direction={'row'}
                        >
                            <Avatar className='mr-1' size="md" src={"https://tb-widget-images.storage.yandexcloud.net/thumb/" + currentUser.image} />
                            <Sheet
                                className="align-middle"
                            >
                                {currentUser.name}
                            </Sheet>
                        </Stack>
                        <Sheet

                            className="align-middle"
                        >
                            {currentUser.phone}
                        </Sheet>
                    </Stack>

                </>
            )
        } catch (e) {
            // console.log(e);
            return <>

            </>;
        }

    }

    return (<>
        <tr
            className="align-top"
            key={'object_' + object.id}

        >
            <td
                className="align-middle"
            >
                <IconButton
                    aria-label="expand row"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </td>
            <td>{object.id}

                <ImageList
                    className='my-0 py-0'
                    sx={
                        {
                            width: 120,
                            height: 120,
                            // overflow: 'hidden'
                        }
                    }
                    cols={1}
                //  rowHeight={164}
                >
                    {object.list_images.map((item) => (
                        <ImageListItem
                            // sx={
                            //     {

                            //         overflow: 'scroll'
                            //     }
                            // }
                            key={item.thumb} >
                            <img
                                style={{
                                    maxHeight: 120,
                                    maxWidth: 100
                                }}
                                onClick={() => setIsOpen(!isOpen)}
                                srcSet={`${item.thumb}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.thumb}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.thumb}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </td>
            <td>
                {object.deal_type === 1 && ("Продажа")}
                {object.deal_type === 2 && ("Аренда")}
                <br />
                {printObject(object, formData)}

                {object.plan > 0 && (<>
                    <br />
                    {formData.plan.filter(item => item.id === Number(object.plan))[0]?.short || ''}
                </>

                )}
            </td>
            <td

            >
                <Sheet>{object.address}</Sheet>
                {object.highway_distances.length > 0 && (
                    <>
                        <br />
                        <Chip>
                            {printMkadDistance(object.highway_distances)}
                        </Chip>
                    </>
                )}


                {object.metro_distances.length > 0 && (
                    <>

                        {/* <Sheet> */}
                        <br />
                        {object.metro_distances.map((metro, station_index) => {
                            // if (station_index === 0) {
                            let station = formData.metro.filter(item => Number(item.id) === Number(metro.id))[0];
                            return (
                                <>
                                    <Chip
                                        key={'metro_chip_' + object.id + "_" + station_index}
                                    >
                                        {
                                            station.colors.map(function (color, index) {
                                                // name = item.metro
                                                return (<span key={station_index + '_metro_' + index} style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
                                            })
                                        }
                                        {station.metro + " "}
                                        {metro.foot < 1201 && (
                                            <>
                                                🦶 {secToStr(metro.foot)}
                                            </>
                                        )}
                                        {metro.foot > 1200 && (
                                            <>
                                                🚗 {secToStr(metro.car)}
                                            </>
                                        )}
                                    </Chip>
                                </>
                            )
                            // }

                        })}
                        {/* </Sheet> */}
                    </>
                )}


            </td>
            <td>
                {object.landArea > 0 && (
                    <>
                        {'Уч: ' + object.landArea + 'сот'}
                        <br />
                    </>
                )}
                {object.totalArea}/
                {object.livingArea}/
                {object.kitchenArea}
            </td>
            <td>
                {object.floor}/{object.floorsCount}
                {object.materialType > 0 && (<>
                    <br />
                    {formData.material.filter(item => item.id === Number(object.materialType))[0]?.name || ''}
                </>

                )}

            </td>
            <td> {Intl.NumberFormat('ru-RU', {
                style: 'currency',
                currency: 'RUB',
                currencyDisplay: 'symbol', maximumFractionDigits: 0
            }).format(object.price)}</td>
            <td>
                {object?.lead?.lead_id > 0 && (
                    <>

                        {printStatus(object.lead)}
                        {printUser(object.lead.responsible_id)}
                        <Stack
                            direction={'row'}
                            spacing={2}
                        >
                            {object.amo_account_id > 0 && (
                                <>
                                    <Tooltip
                                        title="Редактировать"

                                        variant="solid">
                                        {/* <Button variant="plain"> */}
                                        <IconButton
                                            onClick={setObjectForEdit}
                                            disabled={!checkAccess('access_update')}
                                            color="primary"
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        {/* </Button> */}
                                    </Tooltip>
                                    <Tooltip title="Удалить" variant="solid">
                                        {/* <Button variant="plain"> */}
                                        <IconButton
                                            disabled={!checkAccess('access_delete')}
                                            color="danger"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                        {/* </Button> */}
                                    </Tooltip>
                                </>

                            )}

                        </Stack>


                    </>
                )}

                {/* <Button>Редктировать</Button><br />
                                <Button>Удалить</Button> */}
            </td>
            {/* <td>
              
            </td> */}
        </tr >
        <tr>

            {isOpen && (
                <td colSpan={8}>
                    <Sheet
                        // variant="soft"
                        sx={{
                            pb: 2
                            // p: 1, pl: 6,
                            //  boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }
                        }}
                    >
                        <Tabs>
                            <TabList tabFlex="auto">
                                <Tab>Описание</Tab>
                                <Tab
                                    disabled={object.ads.length === 0}
                                >Реклама</Tab>
                                <Tab>Анализ цены</Tab>
                            </TabList>
                            <TabPanel value={0}>
                                <Table
                                    // borderAxis="bothBetween"
                                    size="sm"
                                    // aria-label="purchases"
                                    sx={{

                                        // '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                                        //     { textAlign: 'right' },
                                        // '--TableCell-paddingX': '0.5rem',
                                        width: '100%'
                                    }}
                                >

                                    <tbody>
                                        <tr>
                                            <td
                                                className="align-top content-left"
                                                width={'50%'}>
                                                <BaseObjectsImages
                                                    images={object.list_images}
                                                />
                                                {/* <Images
                                            images={object.list_images}
                                        /> */}
                                                <Typography
                                                    style={{
                                                        maxHeight: 300,
                                                        overflowY: 'auto'

                                                    }}
                                                    width={'100%'}
                                                    className="whitespace-pre-line mt-2"
                                                    component={'div'}
                                                >
                                                    {object.clean_desc}
                                                </Typography>

                                            </td>
                                            <td width={'50%'}>
                                                {/* <YMaps> */}
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: 520
                                                    }}
                                                >

                                                    <Map width={'100%'} height={500} defaultState={{ center: [object.lat, object.lng], zoom: 16 }} >
                                                        <Placemark geometry={[object.lat, object.lng]} />
                                                        <ZoomControl options={{ float: "right" }} />
                                                        <RulerControl options={{ float: "right" }} />

                                                    </Map>
                                                </div>


                                                {/* </YMaps> */}
                                            </td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </TabPanel>
                            <TabPanel value={1}>
                                <Ads
                                    ads={object.ads}
                                    responsible={object.lead.responsible_id}
                                    objectId={object.id}
                                />
                            </TabPanel>

                            <TabPanel value={2}></TabPanel>
                        </Tabs>
                    </Sheet>
                </td>
            )}




        </tr >
    </>);
}

export default BaseObjectsTableRow;