import { Box, FormControlLabel, Grid, LinearProgress, Stack, Switch } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import ImagesContainer from "../ImagesContainer";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useObjectFormState } from "@/app/objects/create/store";
import MyDivider from "./MyDivider";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

function Images({ setter, getter }) {
    const sortImages = useObjectFormState((state) => state.sortImages);
    const activeImages = useObjectFormState((state) => state.flat.images.active);
    const inactiveImages = useObjectFormState((state) => state.flat.images.inactive);
    const moveImages = useObjectFormState((state) => state.moveImages);
    const [showInactive, setShowInactive] = useState(false);

    // const images = getter('images');
    const [files, setFiles] = useState(null);
    const [images_disabled, setImages_disabled] = useState(false);
    // const items = 
    function ids(origin) {
        const res = [];
        origin.forEach(item => res.push(item.filename));
        return res;
    }

    const handleUpload = async (value) => {
        setImages_disabled(true)

        let data = new FormData();
        for (const file of value) {
            data.append('files[]', file, file.name);
        }
        try {
            await fetch('/api/object/images', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(data => setter(data))
            setImages_disabled(false);
        } catch (e) {
            // console
        }
    }

    const HandleDragEnd = (event) => {
        const { active, over } = event;
        // console.log(over?.id)
        if (active.id !== over?.id && over?.id !== undefined) {
            const activeIndex = activeImages.map(e => e).indexOf(active.id);
            const overIndex = activeImages.map(e => e).indexOf(over.id);
            const new_arr = arrayMove(activeImages, activeIndex, overIndex)
            sortImages(new_arr);
        }
    }
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    const delImage = (image) => {
        moveImages(image, 'del')
        // console.log(image)

    }
    const restoreImage = (image) => {
        moveImages(image, 'restore')
        // console.log(image)
    }
    return (<>
        <DndContext
            onDragEnd={HandleDragEnd}
            sensors={sensors}

        >
            <ImagesContainer
                delImage={delImage}
                images={activeImages}
            />
        </DndContext>

        {
            images_disabled && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )
        }
        <MuiFileInput
            multiple

            disabled={images_disabled}
            value={files}
            onChange={handleUpload}
        />
        {inactiveImages.length > 0 && (
            // showInactive
            <>
                <Stack
                    direction={'row'}
                    spacing={2}
                >
                    <FormControlLabel
                        labelPlacement="start"
                        control={
                            <Switch
                                // name="name"
                                id={"show_inactive_images_switch"}
                                checked={showInactive}
                                onClick={() => setShowInactive(!showInactive)}
                            // onChange={handler}
                            />
                        } label={'Показать неактивные фото'} />

                </Stack>
                {/* <MyDivider
                    title={"Неактивные"}

                /> */}
                {showInactive && (<>
                    <DndContext
                        sensors={sensors}
                        onDragEnd={HandleDragEnd}

                    >
                        <ImagesContainer
                            delImage={restoreImage}
                            images={inactiveImages}
                            icon={<RestoreFromTrashIcon />}
                            color="green"

                        />
                    </DndContext >
                </>)}

            </>
        )}

    </>);
}

export default Images;