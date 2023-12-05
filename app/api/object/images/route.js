import { NextResponse } from "next/server";
import fs from "fs";
import EasyYandexS3 from "easy-yandex-s3";
import { sendPostFormData } from "@/app/heplers/backendApiHandler";
const { randomUUID } = require('crypto');
// const imagemagick = require('imagemagick');
// import { imagemagick } from 'imagemagick'
// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
const gm = require('gm')

// export const config = {
//     api: {
//         bodyParser: false,
//     }
// };

const s3 = new EasyYandexS3({
    auth: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    Bucket: process.env.BUCKET_NAME, // например, "my-storage",
    debug: true, // Дебаг в консоли, потом можете удалить в релизе
});



const resize = async (buffer, filename, ext, folder, x, y, s3) => {

    return new Promise(async (resolve, reject) => {
        // const buffer = Buffer.from(await file.arrayBuffer());

        gm(buffer, filename)
            .resize(String(x), String(y), '^')
            .gravity('Center')
            .extent(x, y)
            .toBuffer(ext.toUpperCase(), async function (err, buffer) {
                // console.log(err);
                if (err) {
                    reject(err)
                };
                let mid_upload = await s3.Upload(
                    {
                        buffer: buffer,
                        name: filename,
                    },
                    '/' + folder + '/'
                )
                await mid_upload.Location;
                resolve('ok');
            })
    })
}

export async function POST(req, response) {

    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());
    const result = [];
    let i = 0;

    let filesSize = 0;
    let filesCount = 0;
    const maxFilesSize = 26214400; //25 МБ
    const maxFilesCount = 50;
    const exts = [
        'jpg',
        'png',
        'jpeg'
    ]

    for (const formDataEntryValue of formDataEntryValues) {
        if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
            let file = formDataEntryValue;


            let ext = file.name
                .split('.')
                .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
                .slice(1)
                .join('.');
            if (exts.includes(ext.toLowerCase())) {
                filesCount++;
                filesSize += file.size;
            }

            // console.log(ext)


            // if (ext !== 'jpg' || ext !== 'png' || ext !== 'jpeg') {

            // }

        }
    }

    console.log(filesSize);
    console.log(filesCount);
    if (filesSize > maxFilesSize) {
        console.log('maxSize')
        return NextResponse.json(result);
    }
    if (filesCount > maxFilesCount) {
        console.log('maxCount')
        return NextResponse.json(result);
    }

    console.log(filesSize);
    console.log(filesCount);
    // return NextResponse.json(result);

    // await sendPostFormData(process.env.API_URL + 'api/add-images',formData);

    for (const formDataEntryValue of formDataEntryValues) {
        if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {

            const file = formDataEntryValue;
            const ext = file.name
                .split('.')
                .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
                .slice(1)
                .join('.')
            if (exts.includes(ext.toLowerCase())) {
                // console.log('filter');
                const newFilename = randomUUID() + '.' + ext;

                const buffer = Buffer.from(await file.arrayBuffer());


                const mid = await resize(buffer, newFilename, ext, 'mid', 400, 400, s3);
                console.log(mid)
                const thumb = await resize(buffer, newFilename, ext, 'thumb', 200, 200, s3);
                console.log(thumb)
                const upload = await s3.Upload(
                    {
                        buffer: buffer,
                        name: newFilename,
                    },
                    '/full/'
                )
                await upload.Location;
                result.push(newFilename)
            }

            // mid.then(console.log);


        }
    }
    console.log(result);

    return NextResponse.json(result);

}


// export async function POST(req, response) {
//     // var imagemagick = require('imagemagick');
//     // const data = await request.formData()
//     // console.log(data)
//     // const files = await data.get('files[]');
//     // // console.log(request.files)
//     // // console.log(files?.type)
//     // console.log(files.files)
//     // console.log(typeof(files))
//     // console.log(files[0].value)
//     const formData = await req.formData();
//     const formDataEntryValues = Array.from(formData.values());
//     const result = [];

//     let i = 0;
//     for (const formDataEntryValue of formDataEntryValues) {
//         if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
//             const file = formDataEntryValue;
//             // const buffer = Buffer.from(await file.arrayBuffer());
//             // const ext = file.name
//             //     .split('.')
//             //     .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
//             //     .slice(1)
//             //     .join('.')

//             // // console.log(ext)
//             // // console.log(file)
//             // // console.log(`public`)
//             // const newFilename = randomUUID() + '.' + ext;
//             // const newFilename = upload.key.replace('full/', '')
//             // const qq = fs.writeFileSync(`public/${newFilename}`, buffer);
//             // console.log(qq)

//             // const qq =
//             // gm(`public/${newFilename}`)
//             //     .resize('200', '200', '^')
//             //     .gravity('Center')
//             //     .extent(200, 200)
//             //     .write(`public/thumb/${newFilename}`, function (error) {
//             //         if (error) console.log(error);
//             //     });
//             // await qq.write

//             // gm('public/' + newFilename)
//             //     .resize('400', '400', '^')
//             //     .gravity('Center')
//             //     .extent(400, 400)
//             //     .write(`public/mid/${newFilename}`, function (error) {
//             //         if (error) console.log(error);
//             //     });

//             // console.log(upload);

//             // gm(buffer, newFilename)
//             //     .resize('200', '200', '^')
//             //     .gravity('Center')
//             //     .extent(200, 200)
//             //     .toBuffer(ext.toUpperCase(), async function (err, buffer) {
//             //         console.log(err);
//             //         // if (err) return;
//             //         let thumb_upload = await s3.Upload(
//             //             {
//             //                 buffer: buffer,
//             //                 name: newFilename,
//             //             },
//             //             '/thumb/'
//             //         );
//             //     })

//             // gm(buffer, newFilename)
//             //     .resize('400', '400', '^')
//             //     .gravity('Center')
//             //     .extent(400, 400)
//             //     .toBuffer(ext.toUpperCase(), async function (err, buffer) {
//             //         console.log(err);
//             //         if (err) return;
//             //         let mid_upload = await s3.Upload(
//             //             {
//             //                 buffer: buffer,
//             //                 name: newFilename,
//             //             },
//             //             '/mid/'
//             //         );
//             //     })

//             // let upload = await s3.Upload(
//             //     {
//             //         buffer: buffer,
//             //         name: newFilename,
//             //         // path: 'public/' + newFilename
//             //         // path: path.resolve(__dirname, './123.png'),
//             //     },
//             //     '/full/'
//             // );
//             // let mid_upload = await s3.Upload(
//             //     {
//             //         buffer: gm(`public/${newFilename}`)
//             //             .resize('400', '400', '^')
//             //             .gravity('Center')
//             //             .extent(400, 400)
//             //             .toBuffer()
//             //         // path: `public/mid/${newFilename}`
//             //     },
//             //     '/mid/'
//             // );
//             // console.log(mid_upload)

//             const filename = await (new Promise(async (resolve, reject) => {
//                 const result = await upload(file);
//                 resolve(result)
//             }));
//             console.log(filename)
//             result.push(
//                 filename
//             )

//             i++;
//         }
//     }




//     // response.status(status).json(resultBody);
//     const form_data = [];
//     // console.log(request.form_data.POST.)
//     // const form_data = await fetch('');
//     return NextResponse.json(result);

// }