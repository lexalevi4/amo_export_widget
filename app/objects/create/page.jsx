import ObjectForm from "@/app/components/objects/ObjectForm";
import { new_object } from "@/app/heplers/heplers";
// import { StyledEngineProvider } from "@mui/material";


async function getFormData() {
    const form_data = await fetch('https://turbobroker.ru/api/get-form-params?asdfaasdf=asdf',
        { next: { revalidate: 0 } })
    return form_data.json()
}

async function CreateObject() {

    const form_data = await getFormData();
    console.log(form_data);

    const flat = new_object();



    return (

        <>
            <h1>
                Добавить объект

            </h1>
            {/* <StyledEngineProvider injectFirst> */}
            <ObjectForm
                form_data={form_data}
                flat_for_update={flat}
            />
            {/* </StyledEngineProvider> */}
        </>);
}

export default CreateObject;