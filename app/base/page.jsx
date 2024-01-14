
import { getFormData, sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler";

import 'react-dadata/dist/react-dadata.css';
import Objects from "../components/objects/Objects";
import MapProvidedObjectSearchForm from "../components/objects/searchForm/MapProvidedObjectsSearchForm";
import BasePage from "./components/BasePage";


async function Flats(searchParams) {

    const query = '';

    // const data = await sendPostRequest(process.env.API_URL + 'api/get-objects', searchParams.searchParams)
    const formData = await getFormData();
    const accData = await sendGetRequest(process.env.API_URL + 'api/get-acc-data');
    // console.log(accData);

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
        />

   


    </>);
}

export default Flats;