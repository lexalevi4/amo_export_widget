'use client'
import { Divider } from "@mui/material";
import AdsSummaryTable from "./AdsSummaryTable";
import AdsObjects from "./AdsObjects";
import { useState } from "react";

function PageComponent({ data, formData }) {

    const [objects, setObjects] = useState(data.objects);
    const [isLoading, setIsLoading] = useState(false)


    const reloadObjects = async (params, event, details) => {
        console.log(params.id)
        console.log(params.colDef.field)
        setIsLoading(true);
        try {

            // if (currentValue.id > 0) {
            await fetch('/api/export/get-filtered-objects?user=' + params.id + '&cell=' + params.colDef.field, {
                method: 'GET',
                // body: data,
            }).then(res => res.json())
                .then(data => {
                    setObjects(data.objects);
                    setIsLoading(false);
                })
            // }

        } catch (e) {
        }

    }



    return (<>
        <AdsSummaryTable
            columnGroupingModel={data.summary.colGroups}
            rows={data.summary.rows}
            columns={data.summary.cols}
            reloadObjects={reloadObjects}
        />
        <Divider
            className="my-5"
        />
        <AdsObjects
            isLoading={isLoading}
            feeds={data.feeds}
            formData={formData}
            objects={objects}
        />
    </>);
}

export default PageComponent;