import { NextRequest, NextResponse } from 'next/server';
import { loginUserUseCase } from '@/usecases/loginUser';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { user, token } = await loginUserUseCase(email, password);

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
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
