'use client'

import LoadingTb from "@/app/components/Loading";
import LeadCardObject from "@/app/lead-card/components/LeadCardObject";
import { Typography } from "@mui/material";

function AdsObjects({ objects, formData, feeds, isLoading }) {

    if (isLoading) {
        return <LoadingTb />
    }
    if (objects.length === 0){
        return<Typography>
            Ничего не найдено.
        </Typography>
    }

    return (<>
        {objects.map(object => {
            return (
                <LeadCardObject
                    key={'ad_object_' + object.id}
                    object={object}
                    feeds={feeds}
                    formData={formData}

                />)
        })}
    </>);
}

export default AdsObjects;