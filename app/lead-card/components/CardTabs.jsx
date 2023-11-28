
'use client'
import FIltersTable from "@/app/clients/components/FIltersTable";
import { Typography } from "@mui/material";
// import { useState } from "react";
import Objects from "./Objects";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { YMaps } from "@pbe/react-yandex-maps";

function CardTabs({ objects, clients, formData, leadId, feeds }) {
    // const [activeTab, setActiveTab] = useState(1);

    // const handleChange = (event, newValue) => {
    // setActiveTab(newValue);
    // };

    return (<>

        <Tabs
            defaultValue={1}
            // value={activeTab}
            // onChange={handleChange}
            // indicatorColor="secondary"
            // textColor="inherit"
            variant="fullWidth"
        // aria-label="full width tabs example"
        >
            <TabList
                variant="fullWidth"
                style={{
                    // display:"flex",
                    // position:'absolute',
                    // overflow: "auto",
                    // width: '100%',
                    // maxWidth: 1000
                }}
                sx={{
                    '--ListItem-radius': '0px',
                    borderRadius: 0,
                    [`& .${tabClasses.root}`]: {
                        fontWeight: 'lg',
                        flex: 1,
                        bgcolor: 'background.body',
                        position: 'relative',
                        [`&.${tabClasses.selected}`]: {
                            color: 'primary.500',
                        },
                        [`&.${tabClasses.selected}:before`]: {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            bottom: -1,
                            width: '100%',
                            height: 2,
                            bgcolor: 'primary.400',
                        },
                        [`&.${tabClasses.focusVisible}`]: {
                            outlineOffset: '-3px',
                        },
                    },
                }}

            >

                <Tab
                    label="Объекты"
                    value={1}
                >Объекты</Tab>
                <Tab
                    label="Заявки"
                    value={2}
                >Заявки</Tab>
                <Tab
                    label="Звонки"
                    value={3}
                >Звонки</Tab>
            </TabList>


            <TabPanel value={1}>
                <Objects
                    feeds={feeds}
                    objects={objects}
                    formData={formData}
                    leadId={leadId}
                />
            </TabPanel>

            <TabPanel value={2}>
                <YMaps
                    query={{
                        load: "package.full",
                        lang: "ru_RU",
                        // apikey: "e105999a-b1c1-4234-963f-21e492dca418"
                    }}
                >
                    <FIltersTable
                        leadId={leadId}
                        filters={clients}
                        formData={formData}

                    />
                </YMaps>

            </TabPanel>
            <TabPanel value={3}>
                <Typography variant="h5">
                    Тут будут звонки
                </Typography>
            </TabPanel>
        </Tabs>
    </>);
}

export default CardTabs;