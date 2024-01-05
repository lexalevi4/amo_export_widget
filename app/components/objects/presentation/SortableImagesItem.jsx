import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grid, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import Image from "next/image";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
function SortableImagesItem({ image, handleDel }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: image.thumb });


    // const handleDel = () => {
    //     // delImage(image)
    //     // console.log('asdf');
    //     // console.log(image);
    // }

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
                                // onClick={handleDel}
                                onClick={() => handleDel(image)}
                                sx={{ color: 'green' }}
                            // aria-label={`del ${item.title}`}
                            >
                                <CheckCircleOutlineIcon />
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
    </>);
}

export default SortableImagesItem;