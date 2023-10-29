import { ImageList, ImageListItem } from "@mui/material"
import { useRef, useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
function ObjectCardImages({ images, objectId }) {


    const [index, setIndex] = useState(-1)
    const thumbnailsRef = useRef(null);
    const thumb = []
    const full = []
    images.map(image => {
        thumb.push(
            {
                src: image.thumb,
                width: 0,
                height: 0


            }
        )
        full.push(
            {
                src: image.full
            }
        )

    })


    return (<>

        <ImageList
            sx={{ height: 140 }} cols={2} rowHeight={128}
            // sx={{ width: 500, height: 450 }}
            // variant="quilted"
            // cols={4}
            // rowHeight={121}
            variant="masonry"
        >

            {images.map((item, index) => (
                <ImageListItem key={objectId + "_image_" + index}>
                    <img
                        onClick={() => { setIndex(index) }}
                        key={item.thumb}
                        src={item.thumb}
                        srcSet={item.thumb}
                        alt={Math.random(10000)}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
        <Lightbox
            slides={full}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            carousel={4}
            plugins={[Counter, Thumbnails]}
            counter={{ container: { style: { top: "unset", bottom: 0 } } }}
        // thumbnails={{ ref: thumbnailsRef, position: 'bottom' }}
        // enable optional lightbox plugins
        // plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />

    </>);
}

export default ObjectCardImages;