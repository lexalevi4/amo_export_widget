import { usePlotSaga } from "@/app/objects/plotSaga";
import { Button, TableCell, TableRow, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect ,useRef} from "react";

function PriceAnalyzeTableRows({ flat, param }) {

    const getReportPlot = usePlotSaga(store => store.getReportPlot);
    const setReportPlotRequest = usePlotSaga(store => store.setReportPlotRequest);

    const setReportPlotModalIsIpen = usePlotSaga(store => store.setReportPlotModalIsIpen);
    const setReportPlotData = usePlotSaga(store => store.setReportPlotData);
    const setReportPlotIsCanceled = usePlotSaga(store => store.setReportPlotIsCanceled);
    const reportPlotModalIsIpen = usePlotSaga(store => store.reportPlotModalIsIpen);
    const reportPlotRequest = usePlotSaga(store => store.reportPlotRequest);
    // const setReportPlotData = usePlotSaga(store => store.setReportPlotData);

    const openedRef = useRef(reportPlotModalIsIpen);

    const depths = [
        { name: 'town', value: 'Вся Москва' },
        { name: 'okrug', value: 'Округ' },
        { name: 'district', value: 'Район' },
        // town: 'Вся Москва',
        // okrug: "Округ",
        // district: "Район"

    ];
    const positionClickHandler = (e) => {
        setReportPlotRequest(JSON.parse(e.target.dataset.onclickparam));

    }






    return (<>

        {depths.map((depth, index) => {
            return (<TableRow
                key={'price_row_' + flat.id + "_" + depth.name + "_" + param}
            >
                <TableCell>
                    {depth.value}
                </TableCell>
                {flat.positions[param][depth.name].map((position, position_index) => {
                    return (
                        <TableCell
                            key={'price_row_' + flat.id + "_" + depth.name + "_" + param + '_' + position_index}
                        >
                            <Button
                                className='p-0'
                                size="small"
                                onClick={positionClickHandler}
                                data-onclickparam={JSON.stringify(
                                    {
                                        report_id: flat.report_id,
                                        param: param,
                                        x: position.x,
                                        // x_value: item.x_value,
                                        hue: position.hue,
                                        // hue_value: item.hue_value,
                                        district: depth.name == 'district' ? (flat.districts.filter(d => d.type !== 'Okrug'))[0].id : null,
                                        okrug: depth.name == 'okrug' ? (flat.districts.filter(d => d.type === 'Okrug'))[0].id : null,
                                    }
                                )
                                }

                                style={{
                                    // textDecoration: 'underline',
                                    // color: '#1976d2'

                                }}
                            >
                                {position.current_position + "% / " + position.count}
                            </Button>
                            {/* <Link
                                href={'javascript:void(0);'}
                            > */}
                            {/* <Typography> */}
                            {/* {position.current_position}% / {position.count} */}
                            {/* </Typography> */}
                            {/* </Link> */}
                        </TableCell>
                    )
                })}

            </TableRow>)
        })}



    </>);
}

export default PriceAnalyzeTableRows;