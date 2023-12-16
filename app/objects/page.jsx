
import { getFormData,  sendPostRequest } from "../heplers/backendApiHandler";

import 'react-dadata/dist/react-dadata.css';
import Objects from "../components/objects/Objects";
import MapProvidedObjectSearchForm from "../components/objects/searchForm/MapProvidedObjectsSearchForm";


async function Flats(searchParams) {

    const query = '';

    const data = await sendPostRequest('https://turbobroker.ru/api/get-objects', searchParams.searchParams)
    const formData = await getFormData();

    if (data?.status === 'error') {
        return (
            <h1>
                {data.error}

            </h1>
        )
    }


    return (<>



        <MapProvidedObjectSearchForm
            // searchParams={searchParams}
            formData={formData}
        />
        <Objects
            data={data}
            formData={formData}
            pageType={'list'}
        />



    </>);
}

export default Flats;