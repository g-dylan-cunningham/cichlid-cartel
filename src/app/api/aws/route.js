import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client } from '@aws-sdk/client-s3';
import prisma from '@/modules/prisma';

export async function POST(request) {
  const { key, contentType } = await request.json();

  try {
    // const client = new S3Client({ region: process.env.AWS_REGION }) // this line alone works if deployed on vercel. Check env var name
    const client = new S3Client({
      // full params are needed for non vercel deployment
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    // console.log("process.env.AWS_BUCKET_NAME", process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, process.env.AWS_BUCKET_NAME, process.env.AWS_REGION)
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${key}`,
      Conditions: [
        ['content-length-range', 0, 1048576 * 3], // up to 3 MB
        ['starts-with', '$Content-Type', contentType],
      ],
      Fields: {
        acl: 'public-read',
        'Content-Type': contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    return Response.json({ url, fields });
  } catch (error) {
    console.error('/api/aws POST error',error);
    var errorMessage;
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return Response.json({ error: errorMessage });
  }
}

// NOT USED \/
// import { NextRequest, NextResponse } from 'next/server';
// // import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// // import S3 from "aws-sdk/clients/s3";

// const s3Client = new S3Client({ region: process.env.AWS_REGION })

// async function uploadFileToS3(file, fileName, req) {
//   console.log('req(uploadFileToS3)', req.body)

//   // // orig
//     const fileBuffer = await file;
//     // console.log('filename in s3', fileName, fileBuffer);
//   // console.log("SIZE", req.files)
//   // fileBuffer.byteLength(req.files.file.data))
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: `ciclid-cartel/${fileName}`,
//       body: fileBuffer,
//       ContentType: "image/jpeg",
//       // ACL: 'public-read'
//     }

//     // console.log('params', params)

//     const command = new PutObjectCommand(params);

//     // console.log('command;', command)
//     const commandData = await s3Client.send(command);
//     // const commandData1 = await commandData.json();
//     // console.log('commandData1', commandData)
//     return fileName;
// }

// // raddy
// export async function POST(request) {

//   try {
//     const formData = await request.formData();

//     const file = formData.get('file');
//     console.log('file in POST function', file)

//     if (!file) {
//       return NextResponse.json({ error: 'file is required' }, { status: 400 });
//     }

//     // build saas with ethan https://www.youtube.com/watch?v=-_bhH4MLq1Y&t=249s
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // const buffer = Buffer.from(await file.arrayBuffer());
//     // console.log('buffer', buffer)
//     const fileName = await uploadFileToS3(buffer, file.name, request);
//     console.log('filenameasdf', fileName)
//     return NextResponse.json({ success: true, fileName })
//   } catch (error) {

//     return NextResponse.json({ error, nextResponse: true })
//   }
// }
