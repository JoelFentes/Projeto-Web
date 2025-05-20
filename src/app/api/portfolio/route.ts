import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers'; 

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

    const data = await request.json();
    if (!data.name || !data.bio || !data.email) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 });
    }

    const portfolioData = {
      name: data.name,
      bio: data.bio,
      stacks: data.stacks,
      github: data.github,
      linkedin: data.linkedin,
      email: data.email,
      website: data.website,
      techList: data.techList,
      experience: data.experience,
      projectTitle: data.projectTitle,
      projectDescription: data.projectDescription,
      projectLink: data.projectLink,
      projectImage: data.projectImage,
    };

    const existingPortfolio = await prisma.portfolio.findFirst({
      where: { userId },
    });

    if (existingPortfolio) {
      const updated = await prisma.portfolio.update({
        where: { id: existingPortfolio.id },
        data: portfolioData,
      });
      return NextResponse.json({ portfolio: updated });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        userId,
        ...portfolioData,
      },
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}


export async function GET() {
  const portfolios = await prisma.portfolio.findMany();
  return NextResponse.json(portfolios);
}