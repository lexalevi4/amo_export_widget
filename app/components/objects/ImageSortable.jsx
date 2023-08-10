
import { useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';

import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
function ImageSortable({ image }) {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: image});




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
                    maxWidth: 300,
                    maxHeight: 300
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
                                // onClick={() => delImage(item.id)}
                                sx={{ color: 'green' }}
                            // aria-label={`del ${item.title}`}
                            >
                                <RestoreFromTrashIcon />
                            </IconButton>
                        }
                        actionPosition="right"
                    />
                    <Image
                        src={'https://tb-widget-images.storage.yandexcloud.net/thumb/' + image}
                        alt={image}
                        // onError={() => setSrc('/assets/image-error.png')}
                        width="0"
                        height="0"
                        sizes="200"
                        // sizes='(max-width: 512px) 100%, (max-width: 768px) 50%, (max-width: 1200px) 20%, 33%'
                        style={{ width: '100%', height: 'auto', maxHeight: 200, maxWidth: 200 }}

                    />

                </ImageListItem>
                {/* <CancelIcon
                    style={{
                        position: 'relative',
                        top: 30,
                        right: 0,
                        zIndex: 999

                    }}
                /> */}
                {/* <Image
                    src={image.filename}
                    alt={image.order + "asfasdf"}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', maxHeight: 300, maxWidth: 300 }}

                /> */}
            </div>
        </Grid>
    </>);
}

export default ImageSortable;