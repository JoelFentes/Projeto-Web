import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { createOrUpdatePortfolioUseCase } from '@/usecases/createPortfolio';
import { getAllPortfoliosUseCase } from '@/usecases/getAllPortfolios';
import { PortfolioData } from '@/repositories/portfolioRepository';

// Função para extrair o userId do token no cookie
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

// POST → Criar ou Atualizar o Portfólio
export async function POST(request: Request) {
  try {
    const userId = await getUserIdFromRequest();

    if (!userId) {
      return NextResponse.json({ error: 'Usuário não autenticado' }, { status: 401 });
    }

    const data: PortfolioData = await request.json();

    // Validação simples
    if (!data.name || !data.bio || !data.email) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
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

// GET → Buscar todos os Portfolios (agora usando o UseCase)
export async function GET() {
  try {
    const portfolios = await getAllPortfoliosUseCase();
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}
