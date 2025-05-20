// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token não encontrado' }, { status: 401 });
  }

  const payload = verifyToken(token);

  if (
    !payload ||
    typeof payload === 'string' ||
    !('email' in payload) ||
    typeof payload.email !== 'string'
  ) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
  }

  return NextResponse.json({ user });
}
