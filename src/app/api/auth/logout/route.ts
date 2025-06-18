// exemplo básico de API route logout
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout efetuado' });
  
  // Remove o cookie do token (mesmo path e nome usados no login)
  response.cookies.set('token', '', { maxAge: 0, path: '/' });

  return response;
}
