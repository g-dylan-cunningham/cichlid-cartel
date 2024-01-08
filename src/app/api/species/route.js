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

  const specie = await prisma.species.findUnique({
    where: {
      specie_id,
    },
    include: { skus: true },
  });
  return NextResponse.json(specie);
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

// const handleSpeciesUpdateSubmit = (e) => {
//   console.log("e.target.", e.target);
//   updateSpeciesWithId(e.formData);
//   setIsEditable(false);
// };
