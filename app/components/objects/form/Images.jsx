import { Box, Grid, LinearProgress } from "@mui/material";
import { MuiFileInput } from "mui-file-input";
import Image from "next/image";
import { useEffect, useState } from "react";

function Images({ flat }) {

    const [files, setFiles] = useState(null);
    const [images_disabled, setImages_disabled] = useState(false);
    const [images, setImages] = useState(flat.images);
    // const [images, setImages] = useState(flat.images);


    useEffect(() => {
        flat.images = images;
    }, images)
    const handleUpload = async (value) => {
        setImages_disabled(true)
        // console.log(value)
        // console.log(images_disabled)

        let data = new FormData();
        for (const file of value) {
            data.append('files[]', file, file.name);
        }
        // data.append('activity', activity.id)
        try {
            await fetch('/api/object/images', {
                method: 'POST',
                body: data,
                // headers: {
                //     // 'Accept': 'application/json',
                //     'Content-Type': 'multipart/form-data; boundary=MyBoundary'
                //   },
                // contentType: 'multipart/form-data'
            }).then(res => res.json())
                .then(data => setImages(data))
            setImages_disabled(false);
        } catch (e) {
            // console
        }
    }

    return (<>

        <Grid container spacing={2}>
            {images.map((image, index) => {
                return (

                    <Grid
                        key={'image' + index}
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
                            // onl
                            // width={300}
                            // height={300}
                            />
                        </div>
                    </Grid>

                )

            })}
        </Grid>

        {
            images_disabled && (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            )
        }
        <MuiFileInput
            multiple
            disabled={images_disabled}
            value={files}
            onChange={handleUpload}
        />
    </>);
}

export default Images;