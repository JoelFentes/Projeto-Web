// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserByTokenUseCase } from '@/usecases/getUserByToken';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 });
  }

  try {
    const user = await getUserByTokenUseCase(token);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
