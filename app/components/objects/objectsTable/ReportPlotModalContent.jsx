import { Box, Divider, Typography } from "@mui/material";
import LoadingTb from "../../Loading";
import { usePlotSaga } from "@/app/objects/plotSaga";

function ReportPlotModalContent() {

    const isLoading = usePlotSaga((state) => state.reportPlotsIsLoading);
    const plotData = usePlotSaga((state) => state.reportPlotData);

    // console.log(plotData);
    // console.log(isLoading);

    if (isLoading) {

        return (

            <LoadingTb />

        )

    }

    if (plotData?.status === 'error') {
        return (<Typography variant="h2">Что-то пошло не так</Typography>)
    }


    return (<>
        <Box
            className="p-4"
        >
            <img src={'https://img.turbobroker.ru/report_plot/' + plotData.img} style={{ maxWidth: '90svw' }} />
            <Divider />
            <img src={'https://img.turbobroker.ru/report_plot/' + plotData.img_2} style={{ maxWidth: '90svw' }} />
        </Box>

    </>);
}

export default ReportPlotModalContent;