import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
import prisma from "../../../modules/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// gets images associated
export async function GET(request, res) {
  const specie_id = request.nextUrl.searchParams.get(["specie_id"]);
  // console.log('speciesId', specie_id)
  const images = await prisma.images.findMany({
    where: {
      specie_id: specie_id,
    },
  });
  return new Response(JSON.stringify(images));
}

export async function DELETE(req, res) {
  const body = await req.json();
  let deletedImage = {};
  let awsResponse;
  try {
    // const client = new S3Client({ region: process.env.AWS_REGION }) // this line alone works if deployed on vercel. Check env var name
    const client = new S3Client({ // full params are needed for non vercel deployment
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
    const input = { // DeleteObjectRequest
      Bucket: "cichlid-cartel", // required
      Key: body?.key, // required
    };
    const command = new DeleteObjectCommand(input);
    awsResponse = await client.send(command);
    console.log("awsResponse", awsResponse);
  } catch (e) {
    console.log("e", e);
  } finally {
    try {
      deletedImage = await prisma.images.delete({
        where: {
          image_id: body?.image_id,
        },
      });
      console.log("deletedImage", deletedImage);
    } catch (e) {
      throw e;
    }

    return new Response(JSON.stringify(deletedImage));
  }
}

export async function POST(req) {
    try {
      const body = await req.json();
      const { specie_id, fields, url, is_primary=false, is_secondary=false } = body;
      const newPrismaImage = await prisma.images.create({
        data: {
          specie_id,
          key: fields?.key,
          url: url + fields?.key,
          thumbnail_id: 'todo',
          full_image_id: 'todo',
          is_primary,
          is_secondary
        },
      });
      return Response.json({ ...newPrismaImage });
    } catch (e) {
      console.log("eeee", e);
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
//       thumbnail_id: 'todo',
//       full_image_id: 'todo',
//     },
//   });
//   return new Response(JSON.stringify(newImage));
//   // return new NextResponse.json(newImage)
// }



