// const fs = require("fs");
import { promises as fs } from 'fs';
import copy from './cpy';
import prisma from '../../../modules/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

async function readJson() {
  console.log('GETTTTTT');
  console.log('dir', process.cwd());

  const data = await fs.readFile('./src/app/api/copy/copy.json', 'utf8');
  return await new Buffer(data); //data; // Buffer.from(data)
}

// gets images associated
export async function GET(request, resp) {
  const res = await readJson();
  // const data = await res.json()

  // console.log('server res', res);
  // const data = await res.json();
  // console.log('{ ...copy }', { ...res });
  return NextResponse.json({ ...res });
  // fs.readFile("./copy.json", "utf8", (error, data) => {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   }
  //   console.log('jsonnnnnnnnnnnnn', JSON.parse(data));
  //   // res.send(JSON.stringify({data: true}))
  //   // return new Response(JSON.stringify({data:true}));
  //   return NextResponse.json({data:true})
  // });
}
