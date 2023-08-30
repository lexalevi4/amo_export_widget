import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserSettings from "./UserSettings";
import AccessRights from "./AccessRights";
import MyDivider from "@/app/components/objects/form/MyDivider";

function UsersGroup({ group, users }) {
    return (<>



        <Accordion
        >
            <AccordionSummary
                // className=" flex justify-between "

                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{group.name}</Typography>

            </AccordionSummary>
            <AccordionDetails>
                <MyDivider
                className="my-2"
                    title={'Права доступа'}
                />
                <AccessRights
                />

                <MyDivider
                    title={'Пользователи'}
                />

                {users.filter((user) => { return user.group_id === group.amo_group_id })
                    .map(user => {
                        return (
                            <Accordion
                                key={'group' + group.id + 'user' + user.id}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{user.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <UserSettings
                                        user={user}
                                    />
                                </AccordionDetails>

                            </Accordion>
                        )
                    })}
                {/* {pipelines.map((pipeline) => {
                        return (<ExportPipelineRow
                            pipeline={pipeline}
                            statuses={statuses}
                            key={'pipline_settings' + pipeline.id}
                        />
    
                        )
                    })} */}

            </AccordionDetails>
        </Accordion >
    </>);
}

export default UsersGroup;