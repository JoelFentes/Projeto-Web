// src/app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUserUseCase } from '@/usecases/createUser';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const { user, token } = await createUserUseCase(name, email, password);

    const response = NextResponse.json({ user });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
