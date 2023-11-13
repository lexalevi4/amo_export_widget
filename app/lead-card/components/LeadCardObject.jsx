import ObjectsTable from "@/app/components/objects/objectsTable/ObjectsTable";
import { Button, Divider, Typography } from "@mui/material";

function LeadCardObject({ object, formData }) {
    return (<>
        <ObjectsTable

            formData={formData}
            objects={[object]}
        />
        {/* <Typography>Реклама:</Typography> */}
        <Button
            className="my-2"
            variant="contained"
        >Создать объявление</Button>
        <Divider
            className="my-10"
        />
    </>);
}

export default LeadCardObject;