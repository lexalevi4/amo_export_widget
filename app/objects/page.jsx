
import { getFormData, sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler";
import ObjectsSearchForm from "../components/objects/searchForm/ObjectsSearchForm";
import MyPagination from "../components/objects/searchForm/MyPagination";

import { Paper, Typography } from "@mui/material";
import ObjectsTable from "../components/objects/objectsTable/ObjectsTable";
import 'react-dadata/dist/react-dadata.css';


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



        <ObjectsSearchForm
            // searchParams={searchParams}
            formData={formData}
        />


        

            {data.objects.length === 0 && (<>
                <Paper
                    style={{
                        width: '100%',
                        // height: 500

                    }}
                    elevation={4}


                >
                    <Typography
                        className='my-10 p-10'
                        variant="h5"

                    >Ничего не найдено...</Typography>
                </Paper>
            </>
            )}


            {data.objects.length > 0 && (<>

                <ObjectsTable
                    objects={data.objects}
                    formData={formData}
                />
                {/* <ObjectList
                objects={data.objects}
                formData={formData}
            /> */}
                <MyPagination
                    count={data.count}

                />
            </>
            )}
        
    </>);
}

export default Flats;