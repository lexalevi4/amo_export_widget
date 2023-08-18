
import { useDroppable } from '@dnd-kit/core';
import { Grid } from '@mui/material';
import ImageDraggable from './ImageDraggable';
import { SortableContext } from '@dnd-kit/sortable';
import ImageSortable from './ImageSortable';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
function ImagesContainer({ images, delImage, icon = <DeleteIcon />, color = 'red' }) {


    // const items = images.map((i) => i);



    return (<>
        <Grid
            // ref={setNodeRef}
            container
            spacing={2}
        >
            <SortableContext items={images}


            >

                {images.map((image, index) => {
                    return (
                        <ImageSortable
                            icon={icon}
                            color={color}
                            key={'images' + index}
                            image={image}
                            delImage={delImage}
                        />
                    )

                })}
            </SortableContext>
        </Grid>
    </>);
}

export default ImagesContainer;