// src/usecases/getPortfolioById.ts
import { portfolioRepository } from '@/repositories/portfolioRepository';

export async function getPortfolioByIdUseCase(userId: string) {
  if (!userId) {
    throw new Error('User ID é obrigatório');
  }

  const portfolio = await portfolioRepository.findByUserId(userId);

  if (!portfolio) {
    throw new Error('Portfolio não encontrado para este User ID');
  }

  return portfolio;
}
