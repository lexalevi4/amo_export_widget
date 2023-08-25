import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSettingsState } from "../store";
import ExportPipelineRow from "./ExportPipelineRow";
import { useState } from "react";
import ExportFeedForm from "./ExportFeedForm";

function ExportTab({ }) {
    const pipelines = useSettingsState((state) => state.settings.pipelines);
    const statuses = useSettingsState((state) => state.settings.statuses);
    const feeds = useSettingsState((state) => state.settings.feeds);
    // const newAccordionOpen

    const [pipelinesButtonDisabled, setPipelinesButtonDisabled] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [failSnackbarOpen, setFailSnackbarOpen] = useState(false);





    const saveStatuses = async () => {

        setPipelinesButtonDisabled(true);
        const data = new FormData();
        data.append('statuses', JSON.stringify(
            (statuses.map((item) => { return { id: item.id, export_active: item.export_active } }))
        ))
        try {
            const res = await fetch('/api/settings/export-statuses/update', {
                method: "POST",
                body: data
            })
            const response_data = await res.json()
            console.log(response_data);

            if (response_data.status === 'ok') {
                setSnackbarOpen(true);
            } else {
                setFailSnackbarOpen(true);
            }
        } catch (e) {
            setFailSnackbarOpen(true);
        }
        setPipelinesButtonDisabled(false);
    }


    return (<>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Этапы воронок для выгрузки</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {pipelines.map((pipeline) => {
                    return (<ExportPipelineRow
                        pipeline={pipeline}
                        statuses={statuses}
                        key={'pipline_settings' + pipeline.id}
                    />

                    )
                })}
                <Button
                    disabled={pipelinesButtonDisabled}
                    onClick={saveStatuses}
                    className="mt-8"
                >
                    Сохранить
                </Button>
            </AccordionDetails>
        </Accordion >
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Фиды</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {feeds.map((feed) => {

                    return (<ExportFeedForm
                        key={'feed' + feed.id}
                        feed={feed}


                    />)
                })}
                <ExportFeedForm

                    feed={{
                        id: 0,
                        format: 1,
                        name: '',
                        link: ''
                    }}

                />
                {/* <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                <Button>
                    Добавить
                </Button> */}
            </AccordionDetails>
        </Accordion>
    </>);
}

export default ExportTab;
