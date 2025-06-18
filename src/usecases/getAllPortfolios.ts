import { portfolioRepository } from '@/repositories/portfolioRepository';

export async function getAllPortfoliosUseCase() {
  const portfolios = await portfolioRepository.findAll();
  return portfolios;
}
