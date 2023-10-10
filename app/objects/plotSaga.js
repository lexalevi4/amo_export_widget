import { create } from 'zustand'
import { takeEvery, call, delay, take, race, select } from 'redux-saga/effects';
import sagaMiddleware, { setState } from 'zustand-saga';

const GET_REPORT_PLOT = 'GET_REPORT_PLOT';
// const CANCEL_REPORT_PLOT = 'CANCEL_REPORT_PLOT';

export const usePlotSaga = create(sagaMiddleware(saga, (set, get, store) => ({
    reportPlotsIsLoading: true,
    reportPlotModalIsIpen: false,
    reportPlotIsCanceled: false,
    reportPlotRequest: {},
    setReportPlotRequest: (value) => set((state) => ({ reportPlotRequest: value })),
    setReportPlotModalIsIpen: (value) => set((state) => ({ reportPlotModalIsIpen: value })),
    setReportPlotIsCanceled: (value) => set((state) => ({ reportPlotIsCanceled: value })),
    reportPlotData: {},
    response: {},
    setReportPlotData: (value) => set((state) => ({ reportPlotData: value })),
    getReportPlot: request => store.putActionToSaga({ type: GET_REPORT_PLOT, request }),
    // cancelReportPlot: request => store.putActionToSaga({ type: CANCEL_REPORT_PLOT, request }),

})));

const generateReportPlot = (request) => {

    console.log(request);

    let data = new FormData();
    data.append('plot_data', JSON.stringify(request));
    console.log(data);

    return fetch('/api/report/get-report-plot', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        body: data,
    })
}

const checkReportPlot = (request) => {

    let data = new FormData();
    data.append('plot_data', JSON.stringify(request));

    return fetch('/api/report/check-report-plot', {
        method: 'post',
        // headers: { 'Content-Type': 'application/json' },
        body: data,
    })
}


function* getReportPlot({ type, req }) {
    // if (request === undefined) {
    //     return;
    // }
    yield setState(() => ({ reportPlotsIsLoading: true }));
    yield setState(() => ({ reportPlotData: {} }));
    yield delay(300);
    let request = yield select(state => state.reportPlotRequest);
    yield console.log(request);
    const data = yield new FormData();
    yield data.append('plot_data', JSON.stringify(request));



    let plot_data = yield {};

    try {
        const response = yield fetch('/api/report/get-report-plot', {
            method: 'post',
            // headers: { 'Content-Type': 'application/json' },
            body: data,
        })
        plot_data = yield response.json();
        yield setState(() => ({ response: plot_data }));


        // yield console.log(plot_data)
        
        let canceled = yield select(state => state.reportPlotIsCanceled);
        if (canceled) {
            yield setState(() => ({ reportPlotsIsLoading: false }));
            // yield setState(() => ({ reportPlotModalIsIpen: false }));
            return
        }
        // console.log(plot_data);
        let request_response  = yield select(state => state.response);
        if (request_response.status === 'ready') {
            console.log('ready')
            yield setState(() => ({ reportPlotData: plot_data }));
            yield setState(() => ({ reportPlotsIsLoading: false }));
            yield setState(() => ({ reportPlotRequest: {} }));
            // reportPlotRequest
            // yield put(updateAppParam({ field: 'report_plot', value: { ...plot_data, status: 'ready' } }))
            return true;
        }
        yield delay(500)
        const update_request = yield plot_data;


        if (request_response.status === 'pending') {
            for (let i = yield 0; i < 20; yield i++) {
                let canceled = yield select(state => state.reportPlotIsCanceled);
                if (canceled) {
                    yield setState(() => ({ reportPlotsIsLoading: false }));
                    yield setState(() => ({ reportPlotRequest: {} }));
                    // yield setState(() => ({ reportPlotModalIsIpen: false }));
                    return
                }
                yield delay(500);
                try {
                    let data = yield call(checkReportPlot, update_request)
                    let plot_data = yield call(() => new Promise(res => res(data.json())))
                    yield setState(() => ({ response: plot_data }));
                    let request_response  = yield select(state => state.response);
                    yield console.log('retry ' + i)
                    if (request_response.status === 'ready') {
                        yield setState(() => ({ reportPlotData: plot_data }));
                        yield setState(() => ({ reportPlotsIsLoading: false }));
                        yield setState(() => ({ reportPlotRequest: {} }));
                        return true;
                    }
                    if (request_response.status === 'error') {
                        yield setState(() => ({ reportPlotData: { status: 'error' } }));
                        yield setState(() => ({ reportPlotsIsLoading: false }));
                        yield setState(() => ({ reportPlotRequest: {} }));
                        return true;
                    }
                } catch (e) {
                    yield setState(() => ({ reportPlotData: { status: 'error' } }));
                    yield setState(() => ({ reportPlotsIsLoading: false }));
                    yield setState(() => ({ reportPlotRequest: {} }));
                    return;

                }

            }
            yield setState(() => ({ reportPlotsIsLoading: false }));
            yield setState(() => ({ reportPlotData: { status: 'error' } }));
            yield setState(() => ({ reportPlotRequest: {} }));
        }






    } catch (e) {
        yield setState(() => ({ reportPlotData: { status: 'error' } }));
        yield setState(() => ({ reportPlotsIsLoading: false }));
        yield setState(() => ({ reportPlotRequest: {} }));
        console.log(e);
        return;

    }
    // yield call(generateReportPlot)

    // let plot_data = yield call(() => new Promise(res => res(data.json())))



    // const update_request = yield select(getReportPlot)
}

function* saga() {
    yield takeEvery(GET_REPORT_PLOT, getReportPlot);
}


// function* saga() {

//     yield takeEvery(GET_REPORT_PLOT, function* (...args) {
//         // console.log(param);
//         try {
//             yield race({
//                 task: call(getReportPlot),
//                 // cancel: take(CANCEL_REPORT_PLOT)
//             })

//         } catch (e) {
//             console.log(e);
//         }
//     });
// }

// , function* (...args) {