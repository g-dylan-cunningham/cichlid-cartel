import prisma from "@/modules/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const {
    specie_id,    
    size,        
    price,
    sex,
    quantity, 
  } = body;

  const sku = await prisma.sku.create({
    data: {
      specie_id,    
      size,        
      price,
      sex,
      quantity: parseInt(quantity, 10), 
    }
  });

  return NextResponse.json(sku);
}