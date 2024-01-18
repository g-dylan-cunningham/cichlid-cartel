import prisma from '@/modules/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // get single species
  // consulta a base de datos
  const body = await request.json();  
  const specie = await prisma.species.create({
    data: {
      common_name: body.common_name,
      scientific_name: body.scientific_name,
      category: body.category,
      description: body.description,
      // region: "unasked",
      // subgroup: 'unasked'
    },
  });
  revalidatePath('/admin')
  return NextResponse.json(specie);
}

export async function GET(request) {
  // get single species
  const specie_id = request.nextUrl.searchParams.get(['specie_id']);

  // handle fetch unique
  if (specie_id) {
    const specie = await prisma.species.findUnique({
      where: {
        specie_id,
      },
      include: { skus: true },
    });
    return NextResponse.json(specie);
  }

  // handle fetch all
  const species = await prisma.species.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      skus: {
        orderBy: { created_at: 'desc' },
      },
      images: {
        // where: {
        //   is_primary: true,
        //   is_thumbnail: true,
        // },
      },
    },
  });
  return NextResponse.json(species);

  
}

export async function PATCH(request) {
  // update single species
  // consulta a base de datos
  const body = await request.json();
  const specie = await prisma.species.update({
    where: {
      specie_id: body.specie_id,
    },
    data: {
      common_name: body.common_name,
      scientific_name: body.scientific_name,
      category: body.category,
      description: body.description,
    },
  });
  revalidatePath('/admin')
  return NextResponse.json(specie);
}

export async function DELETE(request, response) {
  try {
    const body = await request.json();
    const { specie_id } = body;
  
    await prisma.species.delete({
      where: {
        specie_id,
      }
    });
    revalidatePath(`/admin`);

    return NextResponse.json({ success: true});
  } catch (e) {
    console.log(e);
    return NextResponse.json({ success: false, error: e});
  }

}