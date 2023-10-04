import ObjectsTable from "@/app/components/objects/objectsTable/ObjectsTable";
import { AppBar, Button, Dialog, Typography, Toolbar, IconButton, Box } from "@mui/material";


import CloseIcon from '@mui/icons-material/Close';
import { useObjectSearchFormState } from "../../store";

function MapObjectsModal({ isOpen, handleClose, objects }) {


    const formData = useObjectSearchFormState((state) => state.formData)
    // const objects = useObjectSearchFormState((state) => state.objects)
    const objectsIsLoading = useObjectSearchFormState((state) => state.objectsIsLoading)


    return (<>
        <Dialog
            fullScreen
            // maxWidth={'xl'}

            keepMounted
            open={isOpen}
            scroll='paper'
            onClose={handleClose}

        >

            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >


                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>


                </Toolbar>
            </AppBar>
            <Box className="bg-white pb-8">
                <Box className="p-4 pb-0 bg-third-bg sm:max-w-7xl mx-auto ">
                    <div
                        style={{
                            marginTop: 150
                        }}
                    >

                        <ObjectsTable
                            formData={formData}
                            objects={objects}
                            isLoading={objectsIsLoading}
                        />
                    </div>

                </Box></Box>

        </Dialog>

    </>);
}

export default MapObjectsModal;