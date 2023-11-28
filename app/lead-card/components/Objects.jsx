import Link from "next/link";
import LeadCardObject from "./LeadCardObject";
import { Box, Button, Divider } from "@mui/material";

function Objects({ objects, formData, leadId, feeds }) {

    return (<>

        <Box
            className='flex justify-end'
        >
            <a
                href={'/objects/create?lead_id=' + leadId}
            >
                <Button
                    variant="contained"
                >Добавить объект</Button>
            </a>
        </Box>
        <Divider className="my-5" />

        {
            objects.map((object, index) => {
                return (
                    <LeadCardObject
                        feeds={feeds}
                        key={'card_object_' + index}
                        formData={formData}
                        object={object}
                        leadId={leadId}
                    />


                )
            })
        }



    </>);
}

export default Objects;