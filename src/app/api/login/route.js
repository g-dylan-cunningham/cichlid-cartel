// thecichlidscartelofaz@gmail.com
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  
  const cookieStore = cookies();
  const cartelCookie = cookieStore.get('cartel-jwt');
  const isValidToken = cartelCookie?.value === 'token';
  let response;
  try {
    const body = await request.json();
    if (
      isValidToken ||
      (body.email === 'asdf' && // 'thecichlidscartelofaz@gmail.com'
        body.password === 'asdf') // === 'badbunny'
    ) {
      response = NextResponse.json(
        {
          validated: true,
        },
        { status: 200 }
      );

      response.cookies.set({
        name: 'cartel-jwt',
        value: 'token',
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });
      
    } else {
      response = NextResponse.json(
        {
          validated: false,
        },
        { status: 401 }
      );
    }
    
    // add delay to mitigate brute force attack vector
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response;
    
  } catch (e) {
    console.log('login error', e);
    return NextResponse.json({ error: true});
  }
}

export async function DELETE(request) {
  const cookieStore = cookies();
  const cartelCookie = cookieStore.get('cartel-jwt');
  const isValidToken = cartelCookie?.value === 'token';

  try {
    if (
      isValidToken
    ) {
      cookieStore.delete('cartel-jwt')
    } 

    return NextResponse.json({});
  } catch (e) {
    console.log('login error', e);
    return NextResponse.json({ error: true});
  }
}
