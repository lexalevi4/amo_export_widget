import { useDraggable } from '@dnd-kit/core';
import { Grid } from '@mui/material';
import Image from 'next/image';
function ImageDraggable({ image }) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (<>
        <Grid
            ref={setNodeRef} style={style} {...listeners} {...attributes}
            // key={'image' + index}
            item>
            <div
                style={{
                    maxWidth: 300,
                    maxHeight: 300
                }}
            >
                <Image
                    src={image.filename}
                    alt={image.order + "asfasdf"}
                    width="0"
                    height="0"
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto', maxHeight: 300, maxWidth: 300 }}

                />
            </div>
        </Grid>
    </>);
}

export default ImageDraggable;