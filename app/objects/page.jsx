import ObjectList from "../components/objects/ObjectList";
import { getFormData, sendGetRequest, sendPostRequest } from "../heplers/backendApiHandler";
import ObjectsSearchForm from "../components/objects/searchForm/ObjectsSearchForm";
import MyPagination from "../components/objects/searchForm/MyPagination";
import { headers } from "next/headers";
import { Paper, Typography } from "@mui/material";

export const dynamic = 'force-dynamic'

async function Flats(searchParams) {

    // console.log(searchParams.searchParams)

    const query_array = [];
    Object.keys(searchParams.searchParams).forEach(function (key) {

        if (searchParams.searchParams[key] !== '') {
            query_array.push(encodeURIComponent(key) + '=' + encodeURIComponent(searchParams.searchParams[key]))

        }
        // console.log(key, searchParams.searchParams[key]);


    });

    // headers().forEach((v, k) => {
    //     console.log(k + ':' + v)
    //     // 
    // })
    const query = '';
    // // const query = headers().get('next-url').replace(/\/objects\?/, "");
    // console.log(query)

    // console.log(seachParams)
    // const filter = JSON.stringify(seachParams);
    const data = await sendGetRequest('https://turbobroker.ru/api/get-objects?' + query_array.join('&'), {})
    console.log(data);
    const formData = await getFormData();

    if (data.status === 'error') {
        return (
            <h1>
                {data.error}

            </h1>
        )
    }

    return (<>

        <ObjectsSearchForm
            params={{}}
            formData={formData}
        />



        {data.objects.length === 0 && (<>
            {/* <Paper
                
            > */}
            <Typography
                className='my-10 p-10'
                variant="h5"

            >Ничего не найдено...</Typography>
            {/* </Paper> */}
        </>
        )}


        {data.objects.length > 0 && (<>
            <ObjectList
                objects={data.objects}
                formData={formData}
            />
            <MyPagination
                count={data.count}

            />
        </>
        )}

    </>);
}

export default Flats;