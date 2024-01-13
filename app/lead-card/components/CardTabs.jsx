
'use client'
import FIltersTable from "@/app/clients/components/FIltersTable";
import { Divider, Typography } from "@mui/material";
// import { useState } from "react";
import Objects from "./Objects";
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { YMaps } from "@pbe/react-yandex-maps";
import LeadsTable from "./LeadsTable";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SummaryLeadsTable from "./SummaryLeadsTable";
import ActivityForm from "./ActivityForm";
import Report from "./Report";
import { useState } from "react";

function CardTabs({ objects, clients, formData, leadId, feeds, leads, activities, reportData }) {
    // const [activeTab, setActiveTab] = useState(1);

    // const handleChange = (event, newValue) => {
    // setActiveTab(newValue);
    // };
    const [activeActivities, setActiveActivities] = useState(activities);

    const addActivity = (newActivity) => {
        setActiveActivities([...activeActivities, newActivity])
    }

    return (<>
        <YMaps
            query={{
                load: "package.full",
                lang: "ru_RU",
                apikey: "d75321b0-ad40-4b10-9d56-3fb3a34883a1"
            }}
        >
            <LocalizationProvider
                // locale={ru}
                adapterLocale="ru"
                dateAdapter={AdapterDayjs}>
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
                        >
                            Объекты
                        </Tab>
                        <Tab
                            label="Заявки"
                            value={2}
                        >
                            Подборки
                        </Tab>
                        <Tab
                            label="Звонки"
                            value={3}
                        >
                            Отчёт
                        </Tab>
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
                        <Report
                            leadId={leadId}
                            objects={objects}
                            formData={formData}
                            feeds={feeds}
                            activities={activeActivities}
                            addActivity={addActivity}
                            reportData={reportData}
                        />
                        {/* <LeadsTable
                            formData={formData}
                            leadId={leadId}
                            leads={leads}
                        />
                        <Divider
                            className="my-10"
                        />
                        <Typography
                            className="my-10"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}

                            variant='h5'
                        >
                            
                            Сводная таблица
                        </Typography>
                        <SummaryLeadsTable
                            clients={leads}
                        />

                        <ActivityForm
                            leadId={leadId}
                        /> */}


                    </TabPanel>
                </Tabs>
            </LocalizationProvider>
        </YMaps>
    </>);
}

export default CardTabs;