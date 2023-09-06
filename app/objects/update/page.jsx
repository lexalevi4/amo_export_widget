// import ObjectForm from "@/app/components/objects/ObjectForm";
import { checkSession, getFormData, new_object } from "@/app/heplers/heplers";
// import { StyledEngineProvider } from "@mui/material";
// import { useObjectFormState } from "./store";
import ObjectFormZustand from "@/app/components/objects/ObjectFormZustand";
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import "@/app/../dist/style.css"
// async function getFormData() {
//     const form_data = await fetch('https://turbobroker.ru/api/get-form-params?asdfaasdf=asdf',
//         { next: { revalidate: 0 } })
//     return form_data.json()
// }
// export const getServerSideProps = async () => {
//     const form_data = await fetch('https://turbobroker.ru/api/get-form-params?asdfaasdf=asd')
//     const repo = await res.json()
//     return { props: { repo } }
//   }

// async function getObject(id) {
// const form_data = await sendGetRequest(process.env.API_URL + 'api/get-object-by-id', { id: id })
// return form_data.json()

// }
async function UpdateObject({ searchParams }) {
    // prefetch={false}

    const id = Number(searchParams?.id) || 0;

    if (!id) {
        return (<>Тут ничего нет...</>)
    }
    // const session_checked = await checkSession(searchParams);

    // lead_id

    const form_data = await getFormData();
    // console.log(form_data);
    const req = await sendGetRequest(process.env.API_URL + 'api/get-object-by-id?id' + id)
    let flat = null;
    if (req.status === 'ok') {
        flat = req.object

    } else {
        return (<>
            Не удалось получить объект
        </>)
    }

    // const flat = await sendGetRequest(process.env.API_URL + 'api/get-object-by-id', { id: id })

    // const flat = { ...new_object(), leadId: leadId, id: 0 };


    console.log(flat);

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

export default UpdateObject;