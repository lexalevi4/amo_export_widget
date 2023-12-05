import { Box, FormControlLabel, Grid, LinearProgress, Stack, Switch, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import ImagesContainer from "../ImagesContainer";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useObjectFormState } from "@/app/objects/create/store";
import MyDivider from "./MyDivider";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';

function Images({ }) {
    const sortImages = useObjectFormState((state) => state.sortImages);
    const activeImages = useObjectFormState((state) => state.flat.images.active);
    const inactiveImages = useObjectFormState((state) => state.flat.images.inactive);
    const moveImages = useObjectFormState((state) => state.moveImages);
    const [showInactive, setShowInactive] = useState(false);
    const updateFlat = useObjectFormState((state) => state.updateFlat);
    const [imagesError, setImagesError] = useState('');

    // const images = getter('images');
    const [files, setFiles] = useState(null);
    const [images_disabled, setImages_disabled] = useState(false);
    // const items = 
    function ids(origin) {
        const res = [];
        origin.forEach(item => res.push(item.filename));
        return res;
    }


    const setter = (data) => {

        const active = activeImages.slice(0);
        const inactive = inactiveImages.slice(0);
        data.map(image=>{
            active.push(image);
        })
        updateFlat('images',{
            active:active,
            inactive:inactive
        });      

    }

    const handleUpload = async (value) => {

        const maxFilesSize = 26214400; //25 МБ
        const maxFilesCount = 50;
        setImages_disabled(true)
        setImagesError('');
        let fileSize = 0;
        let filesCount = 0;

        let data = new FormData();
        for (const file of value) {
            filesCount++;
            fileSize += file.size;
            // console.log(file.size);

            data.append('files[]', file, file.name);
        }
        // console.log(fileSize);
        // if (filesCount > maxFilesCount) {
        //     setImagesError('За раз можно загрузить не более 50 файлов')
        //     setImages_disabled(false)
        //     return;
        // }
        // if (fileSize > maxFilesSize) {
        //     setImagesError('За раз можно загрузить не более 25 МБ')
        //     setImages_disabled(false)
        //     return;
        // }
        // setImages_disabled(false)
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
        <Typography
            variant="body2"
            color={'primary'}
            className="my-0"
        >

            До 50 файлов объёмом до 25МБ:
        </Typography>
        <MuiFileInput
            multiple
            inputProps={{ accept: '.png, .jpeg, .jpg' }}

            disabled={images_disabled}
            value={files}
            onChange={handleUpload}
        />
        {imagesError !== '' && (
            <Typography
                variant="body2"
                color={'error'}
            // className="my-0"
            >

                {imagesError}
            </Typography>
        )}

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