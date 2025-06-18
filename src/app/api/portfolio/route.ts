import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createOrUpdatePortfolioUseCase } from '@/usecases/createPortfolio';
import { getAllPortfoliosUseCase } from '@/usecases/getAllPortfolios';
import { PortfolioData } from '@/repositories/portfolioRepository';

async function getUserIdFromRequest(): Promise<string | null> {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    const payload = verifyToken(token);
    if (!payload || typeof payload === 'string' || typeof payload.email !== 'string') {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { email: payload.email },
      select: { id: true },
    });

    return user?.id ?? null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromRequest();
    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const data = (await request.json()) as PortfolioData;

    if (!data.bio) {
      return NextResponse.json({ error: 'Bio é obrigatória' }, { status: 400 });
    }

    const portfolio = await createOrUpdatePortfolioUseCase({
      userId,
      ...data,
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const portfolios = await getAllPortfoliosUseCase();
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
