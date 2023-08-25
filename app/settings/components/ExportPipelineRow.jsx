import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSettingsState } from "../store";

function ExportPipelineRow({ pipeline, statuses }) {
    const value = statuses.filter((status) => { return status.pipeline_id === pipeline.amo_id && status.export_active === 1 }).map(item => item.id);
    const setExportStatusActive = useSettingsState((state) => state.setExportStatusActive);
    const handleChange = (e) => {
        setExportStatusActive(pipeline.amo_id, e.target.value)
    }
    return (<>
        <Stack
            spacing={2}
        >
            <Typography
            >
                {pipeline.name}
            </Typography>
            <FormControl
            // style={
            //     {
            //         width: width
            //     }

            // }
            >
                <InputLabel id={pipeline.id + "-expot-label"}>Этапы для выгрузки</InputLabel>
                <Select
                    // required={required}
                    multiple={true}
                    // displayEmpty={true}
                    labelId={pipeline.id + "-expot-label"}
                    id={pipeline.id + 'expot-select'}

                    // name={name}
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label='Этапы для выгрузки' />}
                >

                    {/* <MenuItem
                    displayEmpty
                    value={''}
                    // instanceId={'object-item-' + item.id}
                                id={name + '-item-empty'}
                > */}

                    {/* </MenuItem> */}

                    {
                        statuses.filter((status) => { return status.pipeline_id === pipeline.amo_id }).sort((a, b) => a.sort > b.sort ? 1 : -1).
                            map((item) => (
                                <MenuItem
                                    key={'status' + '_' + item.amo_id}
                                    value={item.id}
                                    // instanceId={'object-item-' + item.id}
                                    id={'status-item-' + item.amo_id}
                                >
                                    {item.name}
                                </MenuItem>
                            ))
                    }
                </Select>
            </FormControl >
        </Stack>
    </>);
}

export default ExportPipelineRow;