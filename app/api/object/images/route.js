import { NextResponse } from "next/server";
import fs from "fs";
import EasyYandexS3 from "easy-yandex-s3";
const { randomUUID } = require('crypto');

// import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

export const config = {
    api: {
        bodyParser: false,
    }
};
export async function POST(req, response) {

    // const data = await request.formData()
    // console.log(data)
    // const files = await data.get('files[]');
    // // console.log(request.files)
    // // console.log(files?.type)
    // console.log(files.files)
    // console.log(typeof(files))
    // console.log(files[0].value)
    const formData = await req.formData();
    const formDataEntryValues = Array.from(formData.values());
    const result = [];
    let s3 = new EasyYandexS3({
        auth: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
        Bucket: process.env.BUCKET_NAME, // например, "my-storage",
        debug: true, // Дебаг в консоли, потом можете удалить в релизе
    });
    let i = 0;
    for (const formDataEntryValue of formDataEntryValues) {
        if (typeof formDataEntryValue === "object" && "arrayBuffer" in formDataEntryValue) {
            const file = formDataEntryValue;
            const buffer = Buffer.from(await file.arrayBuffer());
            const ext = file.name
                .split('.')
                .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
                .slice(1)
                .join('.')

            console.log(ext)
            console.log(file)
            // fs.writeFileSync(`public/${file.name}`, buffer);

            const newFilename = randomUUID() + '.' + ext;
            let upload = await s3.Upload(
                {
                    buffer: buffer,
                    // path: path.resolve(__dirname, './123.png'),
                },
                '/full/'
            );
            console.log(upload);
            result.push({
                filename: upload.Location,
                order: i

            })
            i++;
        }
    }




    // response.status(status).json(resultBody);
    const form_data = [];
    // console.log(request.form_data.POST.)
    // const form_data = await fetch('');
    return NextResponse.json(result);

}