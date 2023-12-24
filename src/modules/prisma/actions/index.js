'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../index';

// export async function createBlurb(formData) {
//   const blurb = formData.get("blurb");

//   const data = await prisma.copy.create({
//     data: {
//       blurb,
//     },
//   });
//   revalidatePath(`/about`);
//   redirect(`/admin/about`);
// }

export async function createSpecies(formData) {
  const common_name = formData.get('common_name');
  const scientific_name = formData.get('scientific_name');
  const description = formData.get('description');
  const data = await prisma.species.create({
    data: {
      region: 'body.region',
      subgroup: 'unknown',
      common_name,
      scientific_name,
      description,
    },
  });
  revalidatePath(`/admin`);
  redirect(`/admin/sku/create/${data.specie_id}`);
}

export async function getSpecies() {
  const filter = request.nextUrl.searchParams.get(['filter']);
}

export async function updateSpecies(specie_id, formData) {
  // const common_name = formData.get('common_name');
  // const scientific_name = formData.get('scientific_name');
  // const description = formData.get('description');
  // const updatedSpecies = await prisma.species.update({
  //   where: {
  //     specie_id,
  //   },
  //   data: {
  //     region: 'body.region',
  //     subgroup: 'unknown',
  //     common_name,
  //     scientific_name,
  //     description
  //   },
  // });
  // redirect(`/admin/species/${specie_id}`)
}

export async function updateSku({ sku_id, size, price, sex, quantity }) {
  const updatedSku = await prisma.sku.update({
    where: {
      sku_id,
    },
    data: {
      size,
      price,
      sex,
      quantity: parseInt(quantity, 10),
      is_available: true,
      is_oos: false,
    },
  });
  revalidatePath(`/admin`);
  redirect('/admin');
}

export async function createSku(specie_id, formData) {
  const size = formData.get('size');
  const price = formData.get('price');
  const sex = formData.get('sex');
  const quantity = parseInt(formData.get('quantity'), 10);
  const is_available = formData.get('is_available') === 'true';
  const is_oos = formData.get('is_oos') === 'true';

  const newSku = await prisma.sku.create({
    data: {
      size,
      price,
      sex,
      quantity,
      is_available,
      is_oos,
      specie_id,
    },
  });
  revalidatePath(`/admin/species/${specie_id}`);
  redirect(`/admin/species/${specie_id}`);
}

export async function deleteSku(specie_id, formData) {
  const sku_id = formData.get('sku_id');
  const deletedSku = await prisma.sku.delete({
    where: {
      sku_id,
    },
  });
  revalidatePath(`/admin/species/${specie_id}`);
  // redirect(`/admin/species/${specie_id}`)
}
