// import ObjectForm from "@/app/components/objects/ObjectForm";
import { checkSession, new_object } from "@/app/heplers/heplers";
// import { StyledEngineProvider } from "@mui/material";
// import { useObjectFormState } from "./store";
import ObjectFormZustand from "@/app/components/objects/ObjectFormZustand";

async function getFormData() {
    const form_data = await fetch('https://turbobroker.ru/api/get-form-params?asdfaasdf=asdf',
        { next: { revalidate: 0 } })
    return form_data.json()
}
// export const getServerSideProps = async () => {
//     const form_data = await fetch('https://turbobroker.ru/api/get-form-params?asdfaasdf=asd')
//     const repo = await res.json()
//     return { props: { repo } }
//   }
async function CreateObject({ searchParams }) {
    const leadId = Number(searchParams?.lead_id) || 0;

    const session_checked = await checkSession(searchParams);

    // lead_id

    const form_data = await getFormData();
    // console.log(form_data);

    const flat = { ...new_object(), leadId: leadId, id: 0 };



    return (

        <>
            <h1>
                Добавить объект

            </h1>
            {/* <StyledEngineProvider injectFirst> */}
            <ObjectFormZustand
                form_data={form_data}
                flat_for_update={flat}
            />
            {/* </StyledEngineProvider> */}
        </>);
}

export default CreateObject;