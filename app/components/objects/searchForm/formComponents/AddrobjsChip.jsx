import { useObjectSearchFormState } from "@/app/objects/store";
import { Chip } from "@mui/material";
function AddrobjChip({ addrobj }) {


    const updateMultyField = useObjectSearchFormState((state) => state.updateMultyField)
    const handler = () => {
        // console.log(addrobj)
        updateMultyField('addrobjs', addrobj)
    }
    const data = addrobj.split(':')

    return (<>
        <Chip
            className="m-1"
            onDelete={handler} label={data[1]} />
    </>);
}

export default AddrobjChip;