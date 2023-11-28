import { AppBar, Box, Button, Dialog, Toolbar } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { usePlotSaga } from "@/app/objects/plotSaga";
import ReportPlotModalContent from "./ReportPlotModalContent";
import { useRef, useEffect } from "react";

function ReportPlotModal({ mobile = false }) {



    const isOpen = usePlotSaga((state) => state.reportPlotModalIsIpen);
    const setReportPlotModalIsIpen = usePlotSaga((state) => state.setReportPlotModalIsIpen);
    const setReportPlotIsCanceled = usePlotSaga((state) => state.setReportPlotIsCanceled);
    const setReportPlotData = usePlotSaga((state) => state.setReportPlotData);
    const setReportPlotRequest = usePlotSaga((state) => state.setReportPlotRequest);
    const reportPlotRequest = usePlotSaga((state) => state.reportPlotRequest);
    const reportPlotModalIsIpen = usePlotSaga((state) => state.reportPlotModalIsIpen);
    const getReportPlot = usePlotSaga((state) => state.getReportPlot);

    const openedRef = useRef(isOpen);

    const handleClose = () => {
        setReportPlotIsCanceled(true);
        setReportPlotModalIsIpen(false);
        setReportPlotData({});
        setReportPlotRequest({});
    }


    useEffect(() => {
        // console.log(reportPlotRequest)
        // let request = JSON.parse(reportPlotRequest)
        if (reportPlotRequest?.report_id > 0 && !reportPlotModalIsIpen) {
            setReportPlotIsCanceled(false);
            setReportPlotData({});
            setReportPlotModalIsIpen(true);
            getReportPlot();
        }

    }, [reportPlotRequest])

    // useEffect(() => {

    //     if (!isOpen) {
    //         setReportPlotData({})
    //         setReportPlotIsCanceled(false);
    //         setReportPlotModalIsIpen(false);
    //     }
    //     openedRef.current = isOpen;

    // }, [isOpen])

    return (<>
        <Dialog
            fullScreen
            // maxWidth={'xl'}
            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={handleClose}

        >


            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{

                }}
            >
                <ReportPlotModalContent
                    mobile={mobile}
                // isLoading={reportPlotsIsLoading}
                // plotData={reportPlotData}
                />
            </div>


            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >


                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                    </Button>


                </Toolbar>
            </AppBar>

        </Dialog>
    </>);
}

export default ReportPlotModal;