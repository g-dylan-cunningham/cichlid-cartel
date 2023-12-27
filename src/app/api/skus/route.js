import prisma from '@/modules/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import { updateSku } from '@/modules/prisma/actions';

export async function GET(request) {
  // get single species
  // consulta a base de datos
  // const body = await request.json();
  const sku_id = request.nextUrl.searchParams.get(['sku_id']);

  const sku = await prisma.sku.findUnique({
    where: {
      sku_id,
    },
    include: { species: true },
  });
  return NextResponse.json(sku);
}

export async function POST(request) {
  const body = await request.json();
  const { specie_id, size, price, sex, quantity } = body;

  console.log('sKJUSSSUUUUU', typeof quantity, typeof price);

  const normalizePrice = (str) => {
    if (typeof str !== 'string') {
      throw new Error('not a string');
    }
    const arr = str.split('.');

    for (let i = 0; i < arr.length; i++) {
      const elem = arr[i];
      const isNumeric = !!parseInt(elem, 10);
      if (!isNumeric) {
        throw new Error('non numeric input');
      }
    }
    if (arr.length > 2) {
      throw new Error('too many dots');
    }

    if (arr[1] && arr[1].length === 2) {
      return str;
    }
    if (arr[1] && arr[1].length === 1) {
      return str + 0;
    }
    if (arr.length === 1) {
      return arr[0] + '.00';
    }
  };

  const sku = await prisma.sku.create({
    data: {
      specie_id,
      size,
      price: normalizePrice(price),
      sex,
      quantity: parseInt(quantity, 10),
    },
  });
  revalidatePath(`/admin/skus/list/${specie_id}`);
  return NextResponse.json(sku);
}

export async function PATCH(request, response) {

  const body = await request.json();
  const { sku_id, size, price, sex, quantity } = body;

  const sku = await prisma.sku.update({
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
  return NextResponse.json(sku);
}
