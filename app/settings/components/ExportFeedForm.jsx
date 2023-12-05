import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, FormControl, IconButton, InputBase, InputLabel, MenuItem, OutlinedInput, Paper, Select, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useSettingsState } from "../store";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LaunchIcon from '@mui/icons-material/Launch';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Link from "next/link";
import { useState } from "react";
import MyDivider from "@/app/components/objects/form/MyDivider";


function ExportFeedForm({ feed, }) {

    const formats = useSettingsState((state) => state.settings.feed_formats);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);
    const [name, setName] = useState(feed.name || '');
    const [format, setFormat] = useState(feed.format);
    const [api_key, setKey] = useState(feed.api_key || '');
    const [secret, setSecret] = useState(feed.secret || '');
    const [accId, setAccId] = useState(feed.acc_id || '');
    const [expanded, setExpanded] = useState(false)
    const updateSettings = useSettingsState((state) => state.updateSettings)
    const [alert, setAlert] = useState('Скопировано');
    const [buttonsDisabled, setButtonsDisabled] = useState(false);


    const linkPrefix = "https://b.turbobroker.ru/feed?code=";
    // const current_format = formats.filter(item=>item.id===feed.format)[0];



    const delFeed = async () => {
        if (window.confirm('Удалить фид?')) {
            setButtonsDisabled(true);
            const data = new FormData();
            data.append('feed', JSON.stringify({ id: feed.id }))
            try {
                const res = await fetch('/api/settings/export-feeds/delete', {
                    method: "POST",
                    body: data
                })
                const response_data = await res.json()
                console.log(response_data);

                if (response_data.status === 'ok') {
                    updateSettings('feeds', response_data.data, true)
                    setAlert('Удалено')
                    setSnackbarOpen(true);
                } else {
                    setFailSnackbarOpen(true);
                }
            } catch (e) {
                setFailSnackbarOpen(true);
            }
        }
        setButtonsDisabled(false);
    }


    const saveFeed = async () => {
        setButtonsDisabled(true);

        const data = new FormData();
        data.append('feed', JSON.stringify(
            {
                id: feed.id,
                name: name,
                format: format,
                api_key: api_key,
                secret: secret,
                acc_id: accId
            }
        ))
        try {
            const res = await fetch('/api/settings/export-feeds/update', {
                method: "POST",
                body: data
            })
            const response_data = await res.json()
            console.log(response_data);

            if (response_data.status === 'ok') {
                updateSettings('feeds', response_data.data, true)
                if (feed.id === 0) {
                    setAccId('');
                    setName('');
                    setFormat(1);
                    setSecret('');
                    setKey('');
                    setExpanded(false);
                }
                setAlert('Сохранено')
                setSnackbarOpen(true);
            } else {
                setFailSnackbarOpen(true);
            }
        } catch (e) {
            setFailSnackbarOpen(true);
        }
        setButtonsDisabled(false);
        // setPipelinesButtonDisabled(false);

    }


    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    }

    const handleCloseFailSnackbar = () => {
        setFailSnackbarOpen(false);
    }

    const copyLink = () => {
        navigator.clipboard.writeText(linkPrefix + feed.link);
        setAlert('Скопировано')
        setSnackbarOpen(true);
    }
    return (<>


        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
        >
            <AccordionSummary

                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{feed.name !== '' ? feed.name : "Добавить новый фид"}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack
                    direction={'row'}
                    spacing={2}
                >

                    <FormControl
                    >
                        < TextField
                            label={'Название'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <FormControl
                        style={
                            {
                                width: 150
                            }

                        }
                    >
                        <InputLabel id={feed.id + '_formats_' + "-label"}>Формат</InputLabel>
                        <Select

                            labelId={feed.id + '_formats_' + "-label"}
                            // id={name + '-select'}
                            // name={name}
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            // onChange={handleChange}
                            input={<OutlinedInput label='Формат' />}
                        >
                            {
                                formats.
                                    map((item) => (
                                        <MenuItem
                                            key={feed.id + '_formats_' + item.id}
                                            value={item.id}
                                        // instanceId={'object-item-' + item.id}
                                        // id={name + '-item-' + item.id}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))
                            }
                        </Select>
                    </FormControl >
                </Stack>

                <MyDivider
                    title={'Настройки для сбора статистики и ошибок'}
                />
                <Stack
                    className="my-5"
                    direction={'row'}
                    spacing={2}
                >

                    <FormControl
                        style={
                            {
                                width: 350
                            }}
                    >
                        < TextField
                            label={'api ключ'}
                            value={api_key}
                            onChange={(e) => setKey(e.target.value)}
                        />
                    </FormControl>
                    {format === 2 && (
                        <>
                            <FormControl
                                style={
                                    {
                                        width: 350
                                    }}
                            >
                                < TextField
                                    label={'client secret'}
                                    value={secret}
                                    onChange={(e) => setSecret(e.target.value)}
                                />
                            </FormControl>
                        </>
                    )}
                    {(format === 2 || format === 4) && (
                        <>
                            <FormControl
                                style={
                                    {
                                        width: 200
                                    }}
                            >
                                < TextField
                                    // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    // type="number"

                                    // type='numeric'
                                    label={'id аккаунта'}
                                    id={feed.id + 'acc_id'}
                                    value={accId}
                                    onChange={(e) => setAccId(e.target.value)}
                                />
                            </FormControl>
                        </>
                    )}
                </Stack>
                {feed.link !== '' && (
                    <Paper
                        className="mt-5"
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 850 }}
                    >
                        <IconButton
                            onClick={copyLink}
                            sx={{ p: '10px' }} aria-label="menu" title="Скопировать">
                            <ContentCopyIcon />
                        </IconButton>
                        <InputBase
                            value={linkPrefix + feed.link}
                            sx={{ ml: 1, flex: 1 }}
                        />
                        <Link
                            href={linkPrefix + feed.link}
                            target="_blank"
                        >
                            <IconButton title="Открыть в браузере" type="button" sx={{ p: '10px' }} aria-label="search">
                                <LaunchIcon />
                            </IconButton>
                        </Link>

                    </Paper>
                )}

                <Stack
                    direction={'row'}
                    spacing={2}
                >
                    <Button
                        disabled={name === '' || buttonsDisabled}
                        onClick={saveFeed}
                        className="mt-5"
                        variant="contained"
                    >
                        Сохранить
                    </Button>
                    {feed.id > 0 && (<Button
                        disabled={name === '' || buttonsDisabled}
                        onClick={delFeed}
                        className="mt-5"
                        variant="contained"
                        color='error'
                    >
                        Удалить
                    </Button>)}

                </Stack>
            </AccordionDetails>
        </Accordion >
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                {alert}
            </Alert>
        </Snackbar>

    </>);
}

export default ExportFeedForm;