import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'; // ES Modules import
import prisma from '../../../modules/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

// gets images associated
export async function GET(request, res) {
  const specie_id = request.nextUrl.searchParams.get(['specie_id']);
  // console.log('speciesId', specie_id)
  const images = await prisma.images.findMany({
    where: {
      AND: [{ specie_id: specie_id }, { is_thumbnail: true }],
    },
  });
  return new Response(JSON.stringify(images));
}

export async function DELETE(req, res) {
  const deleteImageAwsAndPrisma = async (img) => {
    try {
      // const client = new S3Client({ region: process.env.AWS_REGION }) // this line alone works if deployed on vercel. Check env var name
      const client = new S3Client({
        // full params are needed for non vercel deployment
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
      const input = {
        // DeleteObjectRequest
        Bucket: 'cichlid-cartel', // required
        Key: img.key, // required
      };
      const command = new DeleteObjectCommand(input);
      awsResponse = await client.send(command);
      // console.log("awsResponse", awsResponse);
    } catch (e) {
      console.error('e', e);
    } finally {
      try {
        deletedImage = await prisma.images.delete({
          where: {
            image_id: img.image_id,
          },
        });
        return deletedImage;
      } catch (e) {
        throw e;
      }
    }
  };

  const { imagesToBeDeleted } = await req.json();
  let deletedImage = {};
  let awsResponse;

  Promise.all(
    imagesToBeDeleted.map((img) => deleteImageAwsAndPrisma(img))
  ).then((data) => {
    console.log('data returned', data);
  });
  return new Response(JSON.stringify({}));
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      specie_id,
      fields,
      url,
      is_primary = false,
      is_secondary = false,
      is_thumbnail,
      thumbnail_url,
      full_image_url,
      full_image_key,
    } = body;
    const newPrismaImage = await prisma.images.create({
      data: {
        specie_id,
        key: fields?.key,
        url: url + fields?.key,
        thumbnail_url: 'todo',
        full_image_url: 'todo',
        is_primary,
        is_secondary,
        is_thumbnail,
        thumbnail_url,
        full_image_url,
        full_image_key,
      },
    });
    return Response.json({ ...newPrismaImage });
  } catch (e) {
    console.error(e);
  }
}

// NOT USED! \/
// export async function POST(request, res) {
//   const body = await request.json();
//   console.log('body', body);

//   const newImage = await prisma.images.create({
//     data: {
//       specie_id: body.specie_id,
//       sku_id: body.sku_id,
//       url: body.url,
//       thumbnail_url: 'todo',
//       full_image_url: 'todo',
//     },
//   });
//   return new Response(JSON.stringify(newImage));
//   // return new NextResponse.json(newImage)
// }
