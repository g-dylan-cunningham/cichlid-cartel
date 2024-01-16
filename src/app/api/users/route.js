import prisma from '@/modules/prisma';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // return NextResponse.json({'user': 'test'});

  try {

    const body = await request.json();  
    const {
      email,
      first_name,
      last_name,
      zip,
      street1,
      street2,
      city,
      state,
      country,
    } = body
    console.log('body', body );
    const user = await prisma.user.create({
      data: {
        email,
        first_name,
        last_name,
        zip,
        street1,
        street2,
        city,
        state,
        country,
      },
    });
    console.log('user', user)
    // revalidatePath('/admin')
    return NextResponse.json(user);
  } catch (e) {
    console.log('error', e.meta)
    let message = 'Sorry, we can not take your contact details now. Please send an email';

    if (e?.meta?.target?.length > 0) {
      message = "The field(s)" + e.meta.target.join(", ") + " have caused a problem. Please correct and try again."
    }
    return NextResponse.json({ message, error: e });
  }

}

