import AdsTable from "@/app/components/objects/ads/AdsTable";
import ObjectsTable from "@/app/components/objects/objectsTable/ObjectsTable";
// import { Button, Divider, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { ru } from 'date-fns/locale'
import "dayjs/locale/ru";
import Presentations from "@/app/components/objects/presentation/Presentations";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function LeadCardObject({ object, formData, feeds }) {
    return (<>
        <ObjectsTable
            isLeadCard={true}
            formData={formData}
            objects={[object]}
        />
        {/* <Typography>Реклама:</Typography> */}

        <LocalizationProvider
            // locale={ru}
            adapterLocale="ru"
            dateAdapter={AdapterDayjs}>
            <AdsTable
                feeds={feeds}
                object={object}
                formData={formData}
            />
            <Presentations
                object={object}
                formData={formData}

            />
        </LocalizationProvider>
    </>);
}
export default dynamic(() => Promise.resolve(LeadCardObject), { ssr: false })
// export default LeadCardObject;