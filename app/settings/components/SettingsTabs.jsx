'use client'
import { Tab, TabList, TabPanel, Table, Tabs } from "@mui/joy";
import { Button, Stack, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSettingsState } from "../store";

import ExportTab from "./ExportTab";
import UsersTab from "./UsersTab";
// import User from "./components/User";

// import UsersTable from "./components/UsersTable";
function SettingsTabs({ data }) {
    const loading = useSettingsState((state) => state.loading);
    const setInitialState = useSettingsState((state) => state.setInitialState);

    const users = useSettingsState((state) => state.settings.users);
    const pipelines = useSettingsState((state) => state.settings.pipelines);
    const statuses = useSettingsState((state) => state.settings.statuses);
    const groups = useSettingsState((state) => state.settings.groups);
    const state = useSettingsState((state) => state.settings);


    useEffect(() => {
        setInitialState(data);

    }, [])
    useEffect(() => {
        console.log(state);
    }, [state])


    if (loading) {
        return (<></>)
    }

    return (<>
        <Tabs
            size="sm"
            aria-label="Pricing plan"
            defaultValue={0}
        // sx={(theme) => ({
        //     // width: 343,
        //     '--Tabs-gap': '0px',
        //     borderRadius: 'lg',
        //     boxShadow: 'sm',
        //     overflow: 'auto',
        //     border: `1px solid ${theme.vars.palette.divider}`,
        // })}
        >
            <TabList
            // sx={{
            //     '--ListItem-radius': '0px',
            //     borderRadius: 0,
            //     [`& .${tabClasses.root}`]: {
            //         fontWeight: 'lg',
            //         flex: 1,
            //         bgcolor: 'background.body',
            //         position: 'relative',
            //         [`&.${tabClasses.selected}`]: {
            //             color: 'primary.500',
            //         },
            //         [`&.${tabClasses.selected}:before`]: {
            //             content: '""',
            //             display: 'block',
            //             position: 'absolute',
            //             bottom: -1,
            //             width: '100%',
            //             height: 2,
            //             bgcolor: 'primary.400',
            //         },
            //         [`&.${tabClasses.focusVisible}`]: {
            //             outlineOffset: '-3px',
            //         },
            //     },
            // }}

            >
                <Tab id='asdfasfd'>Пользователи и права доступа</Tab>
                <Tab id='ajklhljkh'>Выгрузка</Tab>

            </TabList>
            <TabPanel id={'tab1'} className='mb-3' value={0}>
                <UsersTab />

            </TabPanel>
            <TabPanel id={'tab2'} className='mb-3' value={1}>
                <ExportTab />
            </TabPanel>

        </Tabs>
    </>);
}

export default SettingsTabs;