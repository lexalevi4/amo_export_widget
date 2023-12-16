'use client'

import { FormControlLabel, Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

function AdsSummaryTable({ rows, columns, columnGroupingModel, reloadObjects }) {

    const [show, setShow] = useState(true);
    const handleShow = () => { setShow(!show) }




    // console.log(columnGroupingModel);
    // console.log(columns);
    // console.log(rows);
    return (<>
        <FormControlLabel
            labelPlacement="start"
            control={
                <Switch

                    // name={name}
                    // id={name + "switch"}
                    checked={show}
                    onClick={handleShow}
                // onChange={handler}
                />
            } label={"Показать статистику"} />

        {show && (
            <div
                style={{
                    width: '100%',
                    height: 450
                }}
            >
                <DataGrid

                    experimentalFeatures={{ columnGrouping: true }}
                    rows={rows}
                    columns={columns}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    columnGroupingModel={columnGroupingModel}
                    onCellClick={reloadObjects}
                    getCellClassName={(params) => {
                        if (params.field.includes('error')) {
                            return 'text-red-700'
                        }
                        if (params.field.includes('ok')) {
                            return 'text-green-700'
                        }
                    }}
                />
            </div>
        )}

    </>);
}

export default AdsSummaryTable;