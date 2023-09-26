'use client'
import { useState } from "react";

import PhotoAlbum from "react-photo-album";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import ObjectImageThumb from "./ObjectImageThumb";

function Images({ images }) {

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




    const [index, setIndex] = useState(-1);
    return (<>
        {/* <PhotoAlbum photos={thumb} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} /> */}
        {thumb.map((image, index) => {
            return (
                <ObjectImageThumb
                    image={image}
                    index={index}
                    key={image.src}
                    handler={setIndex}
                />
                // <>
                //     <img
                //         className="m-1"
                //         key={image.src}
                //         src={image.src}
                //         style={{
                //             maxHeight: 100
                //         }}

                //     />
                // </>
            )

        })}

        <Lightbox
            slides={full}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            // enable optional lightbox plugins
            plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />


    </>);
}

export default Images;