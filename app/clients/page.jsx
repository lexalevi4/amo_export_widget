
import { getFormData, sendPostRequest } from "../heplers/backendApiHandler";

// import { Paper, Typography } from "@mui/material";
// import FiltersTable from "./components/FIltersTable";
import ClientsPageComponent from "./components/ClientsPageComponent";



async function Clients(searchParams) {


    const data = await sendPostRequest('https://turbobroker.ru/api/get-filters', searchParams.searchParams)
    const formData = await getFormData();
    console.log(data.filters);


    return (
        <>
            <ClientsPageComponent
                data={data}
                formData={formData}

            />
        </>
    );
}

export default Clients;