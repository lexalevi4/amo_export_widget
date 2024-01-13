'use client'
import { useState } from "react";


import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { Sheet } from "@mui/joy";



function BaseObjectsImages({ images }) {

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
        <Sheet
            style={{
                maxHeight: 250,
                overflowY: 'auto'
            }}
        >
            {/* <PhotoAlbum photos={thumb} layout="rows" targetRowHeight={150} onClick={({ index }) => setIndex(index)} /> */}
            {thumb.map((image, index) => {
                return (
                    <img
                        className="m-1"
                        key={image.src}
                        src={image.src}
                        onClick={() => setIndex(index)}
                        style={{
                            maxHeight: 100
                        }}

                    />
                    // <ObjectImageThumb
                    //     image={image}
                    //     index={index}
                    //     key={image.src}
                    //     handler={setIndex}
                    // />
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
        </Sheet>
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

export default BaseObjectsImages;