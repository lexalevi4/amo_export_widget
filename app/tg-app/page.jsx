import { getFormData, sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler";
import ObjectsSearchForm from "../components/objects/searchForm/ObjectsSearchForm";
import 'react-dadata/dist/react-dadata.css';
import ObjectsList from "../components/objects/objectsList/ObjectsList";
import Script from 'next/script'
import ObjectsMobile from "../components/objects/objectsList/ObjectsMobile";

async function Map(searchParams) {
    const formData = await getFormData();
    return (<>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <ObjectsMobile
            formData={formData}
        />
        {/* <ObjectsList
            // searchParams={searchParams}
            formData={formData}

        /> */}

    </>);

}
export default Map;