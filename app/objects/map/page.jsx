

import { getFormData, sendGetRequest, sendPostRequest } from "../../heplers/backendApiHandler";
import ObjectsSearchForm from "../../components/objects/searchForm/ObjectsSearchForm";




import 'react-dadata/dist/react-dadata.css';
// export const dynamic = 'force-dynamic'

import Objects from "./components/Objects";


async function Map(searchParams) {
    const formData = await getFormData();
    return (<>
        <ObjectsSearchForm
            searchParams={searchParams}
            formData={formData}
        />

        <Objects
            searchParams={searchParams}
        />
    </>);

}
export default Map;