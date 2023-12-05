
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
import LeadsTable from "./LeadsTable";

function CardTabs({ objects, clients, formData, leadId, feeds, leads }) {
    // const [activeTab, setActiveTab] = useState(1);

    // const handleChange = (event, newValue) => {
    // setActiveTab(newValue);
    // };

    return (<>
        <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                apikey: "d75321b0-ad40-4b10-9d56-3fb3a34883a1"
            }}
        >
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

                    <FIltersTable
                        leadId={leadId}
                        filters={clients}
                        formData={formData}

                    />


                </TabPanel>
                <TabPanel value={3}>
                    <LeadsTable
                        formData={formData}
                        leadId={leadId}
                        leads={leads}
                    />
                </TabPanel>
            </Tabs>
        </YMaps>
    </>);
}

export default CardTabs;