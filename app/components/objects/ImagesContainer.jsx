
import { useDroppable } from '@dnd-kit/core';
import { Grid } from '@mui/material';
import ImageDraggable from './ImageDraggable';
import { SortableContext } from '@dnd-kit/sortable';
import ImageSortable from './ImageSortable';
import { useState } from 'react';

function ImagesContainer({ images }) {


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
                            key={'images' + index}
                            image={image}
                        />
                    )

                })}
            </SortableContext>
        </Grid>
    </>);
}

export default ImagesContainer;