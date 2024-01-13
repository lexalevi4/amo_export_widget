import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Box, Button, Divider, MenuItem, Select, Typography, Stack, Grid, ImageListItem, ImageListItemBar, IconButton, ImageList, TextField, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SortableImagesItem from "./SortableImagesItem";
import { Textarea } from "@mui/joy";
import { sendApiRequest } from "@/app/services/actions";
function Presentations({ object }) {

    const [showForm, setShowForm] = useState(false);
    const [templates, setTemplates] = useState([]);
    const [templatesUpdated, setTemplatesUpdated] = useState(false);

    const [currentTemplate, setCurrentTemplate] = useState('');
    const [currentTemplateLink, setCurrentTemplateLink] = useState(null);
    const [templatesIsLoading, setTemplatesIsLoading] = useState(false);
    const [templatesError, setTemplatesError] = useState(null)


    // const sortImages = useObjectFormState((state) => state.sortImages);
    const [inactiveImages, setInactiveImages] = useState(object.list_images);
    const [activeImages, setActiveImages] = useState([]);
    const [desc, setDesc] = useState(object.clean_desc);
    const [title, setTitle] = useState('');
    // console.log(inactiveImages);

    // const sortImages =  (new_arr, active = true) => set((state) => {
    //     const flat = get().flat
    //     if (active) {
    //         flat.images.active = new_arr;
    //     } else {
    //         flat.images.inactive = new_arr;
    //     }
    //     return ({
    //         flat: flat
    //     })

    // })
    // const moveImages = (image, direction) => set((state) => {
    //     const flat = get().flat
    //     const active = get().flat.images.active.slice(0);
    //     const inactive = get().flat.images.inactive.slice(0);
    //     const new_value = { active: [], inactive: [] }
    //     if (direction === 'del') {
    //         new_value.active = active.filter((item) => { return item !== image });
    //         new_value.inactive = [...inactive, image];
    //     }
    //     if (direction === 'restore') {
    //         new_value.inactive = inactive.filter((item) => { return item !== image });
    //         new_value.active = [...active, image];
    //     }
    //     // if (active) {
    //     //     flat.images.active = new_arr;
    //     // } else {
    //     //     flat.images.inactive = new_arr;
    //     // }
    //     flat.images = new_value;
    //     return ({
    //         flat: flat
    //     })

    // })
    const HandleDragEnd = (event) => {
        const { active, over } = event;
        // console.log(over?.id)
        if (active.id !== over?.id && over?.id !== undefined) {
            const activeIndex = activeImages.map(e => e.thumb).indexOf(active.id);
            const overIndex = activeImages.map(e => e.thumb).indexOf(over.id);
            const new_arr = arrayMove(activeImages, activeIndex, overIndex)
            setActiveImages(new_arr);
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

    useEffect(() => {
        if (currentTemplate === '') {
            setCurrentTemplateLink(null)
        } else {
            let filtered = templates.filter(item => item.id === currentTemplate)
            try {
                console.log(filtered[0])
                setCurrentTemplateLink(filtered[0].link)
            } catch (e) {
                setCurrentTemplateLink(null)
            }
        }
    }, [currentTemplate])
    const handleShowForm = () => {

        setShowForm(!showForm);
        if (!templatesUpdated) {
            getTemplates();
        }
    }


    const getTemplates = async () => {
        try {
            setTemplatesIsLoading(true);
            // if (currentValue.id > 0) {
            const data = await sendApiRequest('get', 'api/get-presentation-templates', {})
            console.log(data);
            if (data?.status === 'ok') {
                setTemplates(data.templates);
                setTemplatesUpdated(true);
                setTemplatesIsLoading(false);
                setTemplatesError(null);
            } else {
                console.log('Не удалось получить шаблоны');
                setTemplatesError('Не удалось получить шаблоны');
                setTemplatesIsLoading(false);
                setTemplatesUpdated(false);
            }
            // await fetch('/api/presentation/get-templates', {
            //     method: 'GET',
            //     // body: data,
            // }).then(res => res.json())
            //     .then(data => {
            //         console.log(data);
            //         setTemplates(data.templates);
            //         setTemplatesUpdated(true);
            //         setTemplatesIsLoading(false);
            //         // console.log(data)
            //     })
            // }
        } catch (e) {
            console.log(e);
            setTemplatesError(e);

        }
    }

    const createPresentation = () => {

        let data = {
            objectId: object.id,
            template: currentTemplate,
            images: activeImages.map(item => item.full),
            desc: desc,
            title: title
        };
        console.log(data)

    }
    // const style = {
    //     transform: CSS.Transform.toString(transform),
    //     // transition,
    // };

    const handleSelectImage = (image) => {
        let new_inactive_arr = inactiveImages.filter(item => item.thumb !== image.thumb);
        let new_active_arr = activeImages.splice(0);
        new_active_arr.push(image);
        setActiveImages(new_active_arr);
        setInactiveImages(new_inactive_arr);
    }

    const handleUnselectImage = (image) => {
        let new_active_arr = activeImages.filter(item => item.thumb !== image.thumb);
        let new_inactive_arr = inactiveImages.splice(0);
        new_inactive_arr.push(image);
        setActiveImages(new_active_arr);
        setInactiveImages(new_inactive_arr);
    }

    return (<>

        <Typography>
            Презентации

        </Typography>
        <Button
            onClick={handleShowForm}
        >
            Добавить презентацию
        </Button>
        <Divider className="my-2" />


        {showForm && (
            <>
                {templatesIsLoading && (
                    <Typography>Шаблоны загружаются... </Typography>
                )}
                {templatesError && (
                    <Typography
                        color={'error'}
                    >
                        Не удалось получить шаблоны
                    </Typography>
                )}
                {!templatesIsLoading && (
                    <>
                        <FormControl
                            style={
                                {
                                    width: 400
                                }

                            }
                        >
                            <InputLabel >Шаблон</InputLabel>
                            <Select
                                // style={{
                                //     width: 400
                                // }}
                                labelId={'template' + "-name-label"}
                                id={'template' + '-select'}
                                name={'template'}
                                value={currentTemplate}

                                input={<OutlinedInput label={'Шаблон'} />}

                                onChange={(e) => setCurrentTemplate(e.target.value)}
                            >
                                {templates.map((template, index) => {
                                    return (
                                        <MenuItem
                                            key={'template' + template.id}
                                            value={template.id}
                                        >
                                            {template.name}

                                        </MenuItem>
                                    )
                                })}


                            </Select>
                        </FormControl>
                        {currentTemplateLink !== null && (

                            <Link
                                target="_blank"
                                href={currentTemplateLink}
                            >
                                <Button>
                                    Ссылка на шаблон
                                </Button>

                            </Link>
                        )}

                        <Stack>

                            <Box
                                className='my-2'
                                style={{
                                    width: 650
                                }}
                            >

                                <FormControl
                                    style={
                                        {
                                            width: 650
                                        }}
                                >
                                    <TextField
                                        label="Загаловок"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    // minRows={5}
                                    // width={650}
                                    />
                                </FormControl>
                            </Box>

                            <Box
                                className='my-2'
                                style={{
                                    width: 650
                                }}
                            >
                                <Typography
                                    className="my-2"
                                >Текст:

                                </Typography>
                                <FormControl
                                    style={
                                        {
                                            width: 650
                                        }}
                                >
                                    <Textarea
                                        label="Текст"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        minRows={5}
                                        width={650}
                                    />
                                </FormControl>
                            </Box>


                            <Grid
                                className="my-2"
                                spacing={1}
                                container
                                width={'100%'}
                            // direction={'row'}

                            >
                                {/* <ImageList> */}

                                {inactiveImages.map((image, index) => {
                                    // console.log(image);
                                    return (

                                        <Grid
                                            // ref={setNodeRef} 
                                            // style={style} {...attributes} {...listeners}
                                            key={'image' + index}
                                            item>
                                            <div
                                                style={{
                                                    maxWidth: 150,
                                                    maxHeight: 150
                                                }}
                                            >

                                                <ImageListItem >
                                                    <ImageListItemBar
                                                        sx={{
                                                            background:
                                                                'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                                                'rgba(0,0,0,00) 70%, rgba(0,0,0,0) 0%)',
                                                        }}
                                                        // title={item.title}
                                                        position="top"
                                                        actionIcon={
                                                            <IconButton
                                                                aria-label="delete image"
                                                                // onC
                                                                onClick={() => handleSelectImage(image)}
                                                                // onClick={handleDel}
                                                                sx={{ color: 'red' }}
                                                            // aria-label={`del ${item.title}`}
                                                            >
                                                                <RadioButtonUncheckedIcon />
                                                            </IconButton>
                                                        }
                                                        actionPosition="right"
                                                    />
                                                    <Image
                                                        src={image.thumb}
                                                        alt={image.thumb}
                                                        width="0"
                                                        height="0"
                                                        sizes="200"
                                                        style={{ width: '100%', height: 'auto', maxHeight: 150, maxWidth: 150 }}

                                                    />

                                                </ImageListItem>
                                            </div>
                                        </Grid>
                                    )
                                })}
                                {/* </ImageList> */}
                            </Grid>
                            <Typography>Выбранные:</Typography>


                            <Box className='mb-2'>
                                <DndContext
                                    onDragEnd={HandleDragEnd}
                                    sensors={sensors}
                                >

                                    <SortableContext items={activeImages.map(item => item.thumb)}>
                                        <Grid
                                            // ref={setNodeRef}
                                            container
                                            spacing={2}
                                        >
                                            {activeImages.map((image, index) => {
                                                return (
                                                    <SortableImagesItem
                                                        // icon={icon}
                                                        // color={color}
                                                        key={'images' + index}
                                                        image={image}
                                                        handleDel={handleUnselectImage}
                                                    />
                                                )

                                            })}
                                        </Grid>
                                    </SortableContext>

                                </DndContext>
                            </Box>
                            <Box
                                className='my-2'
                            >
                                <Button
                                    variant="contained"
                                    onClick={createPresentation}

                                >
                                    Создать
                                </Button>
                            </Box>
                        </Stack>

                    </>
                )}

            </>
        )}



    </>);
}

export default Presentations;