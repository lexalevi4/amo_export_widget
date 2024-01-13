import { Box, Button, FormControl, IconButton, ImageList, ImageListItem, ImageListItemBar, Switch, TableCell, TableRow, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { MuiFileInput } from "mui-file-input";
import { LinearProgress } from "@mui/joy";
import { sendApiRequest } from "@/app/services/actions";
function ActivitiesTableRow({ activity }) {

    const [images, setImages] = useState(activity.images.map(item => item.filename));
    const [active, setActive] = useState(Boolean(activity.active));
    const [imagesDisabled, setImagesDisabled] = useState(false);
    const [files, setFiles] = useState(null);
    const [deleted, setDeleted] = useState(false);
    const [name, setName] = useState(activity.name)
    const [text, setText] = useState(activity.text)
    const [price, setPrice] = useState(activity.price)
    const [updating, setUpdating] = useState(false);
    const [imagesError, setImagesError] = useState('');


    useEffect(() => {
        console.log(images);
    }, [images])

    const addImages = (data) => {
        setImages
    }

    const handleFileChange = async (value) => {
        const maxFilesSize = 26214400; //25 МБ
        const maxFilesCount = 50;
        setImagesDisabled(true)
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
        if (filesCount > maxFilesCount) {
            setImagesError('За раз можно загрузить не более 50 файлов')
            setImagesDisabled(false)
            return;
        }
        if (fileSize > maxFilesSize) {
            setImagesError('За раз можно загрузить не более 25 МБ')
            setImagesDisabled(false)
            return;
        }
        // setImagesDisabled(false)
        try {
            await fetch('/api/object/images', {
                method: 'POST',
                body: data,
            }).then(res => res.json())
                .then(async (data) => {
                    setImages([...images, ...data])
                    await sendApiRequest('post', 'api/add-activity-images', {
                        id: activity.id,
                        images: data
                    })
                })
            setImagesDisabled(false);
        } catch (e) {
            // console
        }
    }

    const handleUpdate = async () => {
        setUpdating(true);
        const res = await sendApiRequest('post', 'api/update-lead-activity', {
            id: activity.id,
            name: name,
            text: text,
            price: price
        });
        setUpdating(false);
    }
    const handleDelete = async () => {
        if (window.confirm('Удалить?')) {
            const res = await sendApiRequest('get', 'api/delete-lead-activity', { id: activity.id })
            if (res.status === 'ok') {
                setDeleted(true);
            }

        }
    }



    const handleActive = async () => {

        const res = await sendApiRequest('get', 'api/lead-activity-active', { id: activity.id, active: Number(!active) });
        // console.log(res);
        setActive(!active);

    }


    const delImage = async (image) => {
        const res = await sendApiRequest('get', 'api/delete-activity-image', { activityId: activity.id, image: image });
        setImages(images.filter(item => item !== image))
    }

    if (deleted) {
        return (<></>);
    }
    return (<>
        <TableRow

        >
            <TableCell>
                <Switch
                    onChange={handleActive}
                    checked={active}
                >

                </Switch>
            </TableCell>
            <TableCell>
                <TextField
                    label="Название"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </TableCell>
            <TableCell>
                <FormControl

                >
                    <TextField
                        type={'number'}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        label="Расходы"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}

                    />
                </FormControl>
            </TableCell>
            <TableCell>
                <Button
                    disabled={updating}
                    onClick={handleUpdate}
                >
                    Сохранить
                </Button>
            </TableCell>
            <TableCell>
                <Button
                    disabled={updating}
                    onClick={handleDelete}
                    color="error"
                >
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
        <TableRow

        >
            <TableCell
                colSpan={2}
            >
                <TextField
                    id="outlined-multiline-flexible"
                    // label="Инфо по расклейке"
                    // placeholder='Инфо по расклейке'
                    label="Текст"
                    rows={14}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    // maxRows={8}
                    fullWidth

                />
            </TableCell>
            <TableCell
                colSpan={3}
            >
                <Box
                    className='mb-5'
                    sx={{ width: '100%', height: 400, overflowY: 'scroll' }}>
                    <ImageList variant="masonry" cols={4} gap={3}>
                        {images.map((item) => (
                            <ImageListItem key={'acivity_image' + item}>

                                <ImageListItemBar
                                    sx={{
                                        maxWidth: 150,

                                        background:
                                            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, ' +
                                            'rgba(0,0,0,00) 70%, rgba(0,0,0,0) 0%)',

                                    }}
                                    // title={item.title}
                                    position="top"
                                    actionIcon={
                                        <IconButton
                                            onClick={() => delImage(item)}
                                            sx={{ color: 'red' }}
                                        // aria-label={`del ${item.title}`}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    actionPosition="right"
                                />

                                <img
                                    style={{
                                        maxWidth: 150
                                    }}
                                    src={'https://tb-widget-images.storage.yandexcloud.net/full/' + item + '?w=248&fit=crop&auto=format&dpr=2'}
                                    alt={item}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    {
                        imagesDisabled && (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        )
                    }
                    <Box
                        className='text-end mb-5'

                    >
                        <MuiFileInput
                            multiple
                            disabled={imagesDisabled}
                            value={files}
                            onChange={handleFileChange}
                        />
                        {imagesError !== '' && (
                            <Typography
                                color={'error'}
                            >
                                {imagesError}
                            </Typography>
                        )}
                        {/* <input
                                    accept="image/*"
                                    // className={classes.input}
                                    style={{ display: 'none' }}
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" component="span"
                                    // className={classes.button}
                                    >
                                        Загрузить изображения
                                    </Button>
                                </label> */}
                    </Box>
                </Box>
            </TableCell>

        </TableRow>

    </>);
}

export default ActivitiesTableRow;