import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import ActivityForm from "./ActivityForm";
import ShortObjectCard from "./ShortObjectCard";
import SummaryLeadsTable from "./SummaryLeadsTable";
import LeadsTable from "./LeadsTable";
import ReportCallsStats from "./ReportCallsStats";
import ReportAdStats from "./ReportAdStats";
import ReactImageGallery from "react-image-gallery";
import ActivitiesTable from "./ActivitiesTable";
import ReportData from "./ReportData";

function Report({ objects, leadId, feeds, formData, activities, addActivity, reportData }) {

    // console.log(activities);
    return (<>
        {objects.map((object, index) => {
            console.log(object.lead_stats)
            return (
                <Box
                    key={'report_object' + index}
                >
                    <ShortObjectCard
                        object={object}
                    />


                    {object.ads.map((ad, index) => {
                        // console.log(ad);
                        return (
                            <ReportAdStats
                                ad={ad}
                                feeds={feeds}
                                key={'ad_stats' + ad.id + "_" + index}
                            />
                        )
                    })}
                    <ReportCallsStats
                        stats={object.lead_stats}
                    />
                    <SummaryLeadsTable
                        clients={object.leads}
                    />
                    <LeadsTable
                        formData={formData}
                        leadId={leadId}
                        leads={object.leads}
                    />


                </Box>
            )

        })}
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

            Активности
        </Typography>

        <ActivitiesTable
            activities={activities}
        />
        <ActivityForm
            addActivity={addActivity}
            leadId={leadId}
        />
        <ReportData
            reportData={reportData}
        />
    </>);
}

export default Report;