
import { useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';


function ImageSortable({ image, icon = <DeleteIcon />, delImage, color = 'red' }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: image });


    const handleDel = () => {
        delImage(image)
        // console.log('asdf');
        // console.log(image);
    }

    const style = {
        transform: CSS.Transform.toString(transform),
        // transition,
    };
    // console.log(listeners)

    return (<>
        <Grid
            ref={setNodeRef} style={style} {...attributes} {...listeners}
            // key={'image' + index}
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
                                onClick={handleDel}
                                // onClick={handleDel}
                                sx={{ color: { color } }}
                            // aria-label={`del ${item.title}`}
                            >
                                {icon}
                            </IconButton>
                        }
                        actionPosition="right"
                    />
                    <Image
                        src={'https://tb-widget-images.storage.yandexcloud.net/thumb/' + image}
                        alt={image}
                        width="0"
                        height="0"
                        sizes="200"
                        style={{ width: '100%', height: 'auto', maxHeight: 150, maxWidth: 150 }}

                    />

                </ImageListItem>
            </div>
        </Grid>
    </>);
}

export default ImageSortable;