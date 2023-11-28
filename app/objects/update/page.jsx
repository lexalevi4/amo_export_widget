
import { checkSession, getFormData, new_object } from "@/app/heplers/heplers";
import ObjectFormZustand from "@/app/components/objects/ObjectFormZustand";
import { sendGetRequest } from "@/app/heplers/backendApiHandler";
import "@/app/../dist/style.css"

async function UpdateObject({ searchParams }) {
    
    const id = Number(searchParams?.id) || 0;

    if (!id) {
        return (<>Тут ничего нет...</>)
    }
    const form_data = await getFormData();

    const req = await sendGetRequest(process.env.API_URL + 'api/get-object-by-id?id=' + id)
    let flat = null;
    if (req.status === 'ok') {
        flat = req.object

    } else {
        return (<>
            Не удалось получить объект
        </>)
    }


    // console.log(flat);

    return (

        <>

            <ObjectFormZustand
                form_data={form_data}
                flat_for_update={flat}
            />

        </>);
}

export default UpdateObject;