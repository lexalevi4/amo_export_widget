
import BasePage from "../base/components/BasePage";
import { getFormData, sendGetRequest } from "../heplers/backendApiHandler";

import 'react-dadata/dist/react-dadata.css';



async function Flats(searchParams) {

    const query = '';

    // const data = await sendPostRequest(process.env.API_URL + 'api/get-objects', searchParams.searchParams)
    const formData = await getFormData();
    const accData = await sendGetRequest(process.env.API_URL + 'api/get-acc-data');
    console.log(accData);

    if (accData?.status === 'error') {
        return (
            <h1>
                {accData.error}

            </h1>
        )
    }


    return (<>


        <BasePage
            accData={accData}
            formData={formData}
            isParser={true}
        />




    </>);
}

export default Flats;