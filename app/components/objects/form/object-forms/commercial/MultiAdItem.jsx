import { Box, Divider, Grid, IconButton, ImageListItem, ImageListItemBar, LinearProgress, Stack, TextField, Typography } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { useObjectFormState } from "@/app/objects/create/store";
import MyDivider from "../../MyDivider";
import Image from "next/image";
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import ImageSortable from "../../../ImageSortable";
import { DndContext } from "@dnd-kit/core";
function MultiAdItem({ item, flat, setter, getter, index, deleteItem, del_disabled = false }) {





    const [files, setFiles] = useState(null);
    const [imagesDisabled, setImagesDisabled] = useState(false);
    const [fileError, setFileError] = useState('');
    const delMultiAdItem = useObjectFormState((state) => state.delMultiAdItem);
    const updateMultiAdItem = useObjectFormState((state) => state.updateMultiAdItem);
    const addMultiAdPhoto = useObjectFormState((state) => state.addMultiAdPhoto);
    const delMultiAdPhoto = useObjectFormState((state) => state.delMultiAdPhoto);
    const sortMultiAdImages = useObjectFormState((state) => state.sortMultiAdImages);

    const handleUpload = async (value) => {
        setImagesDisabled(true)

        let totalSize = 0;
        // console.log(value.length)
        if (value.length + item.images.length > 5) {
            setFileError('Выходит больше 5 файлов');
            return true;
        }

        let data = new FormData();
        for (const file of value) {
            // console.log('qq');
            data.append('files[]', file, file.name);
        }
        try {
            await fetch('/api/object/images', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then((data) => addMultiAdPhoto(index, data))
            setImagesDisabled(false);
            setFileError('');
        } catch (e) {
            setImagesDisabled(false)
            setFileError('Что-то пошло не так');
            // console
        }
    }

    const HandleDragEnd = (event) => {
        const { active, over } = event;
        // console.log(over?.id)
        if (active.id !== over?.id && over?.id !== undefined) {
            const activeIndex = item.images.map(e => e).indexOf(active.id);
            const overIndex = item.images.map(e => e).indexOf(over.id);
            const new_arr = arrayMove(item.images, activeIndex, overIndex)
            sortMultiAdImages(index, new_arr);
        }
    }
    return (<>


        <Typography
            variant="h6"
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            Площадь {index + 1}
            <DeleteIcon
                onClick={del_disabled ? null : () => delMultiAdItem(index)}
                style={{
                    cursor: 'pointer'
                }}
                color={del_disabled ? 'disabled' : "error"}
            />

        </Typography>
        <Stack
            spacing={2}
            direction={'row'}
        >
            <TextField
                label='Площадь'
                type="number"
                defaultValue={item?.area}
                onChange={(e) => { updateMultiAdItem(index, 'area', e.target.value) }}

            />
            <TextField
                label='Этаж с'
                type="number"
                defaultValue={item?.floorFrom}
                onChange={(e) => { updateMultiAdItem(index, 'floorFrom', e.target.value) }}

            />
            <TextField
                label='Этаж по'
                type="number"
                defaultValue={item?.floorTo}
                onChange={(e) => { updateMultiAdItem(index, 'floorTo', e.target.value) }}
            />


        </Stack>

        <Typography
            variant="h6"
            color={"GrayText"}
            style={{
                display: 'flex',
                alignItems: 'center'
            }}
        >фото до 5 шт</Typography>

        {item.images.length > 0 && (<>
            <DndContext
                onDragEnd={HandleDragEnd}

            >
                <SortableContext items={item.images}


                >
                    <Grid
                        // ref={setNodeRef}
                        container
                        spacing={2}
                    >
                        {item.images.map((image, image_index) => {

                            return (
                                <ImageSortable
                                    key={'multy' + index + "_" + image_index}
                                    image={image}
                                />

                                // <div
                                //     className="m-1"
                                //     key={'multiads_images' + index + "_" + image}
                                //     style={{
                                //         maxWidth: 150,
                                //         maxHeight: 150
                                //     }}
                                // >

                                //     <ImageListItem >
                                //         <ImageListItemBar
                                //             sx={{
                                //                 background:
                                //                     'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                //                     'rgba(0,0,0,00) 70%, rgba(0,0,0,0) 0%)',
                                //             }}

                                //             position="top"
                                //             actionIcon={
                                //                 <IconButton
                                //                     onClick={() => delMultiAdPhoto(index, image_index)}
                                //                     sx={{ color: 'red' }}
                                //                 >
                                //                     <DeleteIcon />
                                //                 </IconButton>
                                //             }
                                //             actionPosition="right"
                                //         />
                                //         <Image
                                //             src={'https://tb-widget-images.storage.yandexcloud.net/thumb/' + image}
                                //             alt={image}

                                //             width="0"
                                //             height="0"
                                //             sizes="200"

                                //             style={{ width: '100%', height: 'auto', maxHeight: 150, maxWidth: 150 }}

                                //         />

                                //     </ImageListItem>

                                // </div>
                            )


                        })
                        }
                    </Grid>
                </SortableContext>
            </DndContext>
        </>)}

        {
            imagesDisabled && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )
        }
        {item.images.length < 5 && (
            <>
                <MuiFileInput
                    disabled={imagesDisabled || item.images.length > 4}
                    inputProps={{ accept: '.png, .jpeg, .jpg' }}
                    multiple
                    value={files}
                    onChange={handleUpload}
                />
                {fileError !== '' && (
                    <Typography variant="body2" color={"red"}>{fileError}</Typography>
                )}
            </>
        )}

        <Divider className="mb-5" />


    </>);
}

export default MultiAdItem;