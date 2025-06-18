import { portfolioRepository } from '@/repositories/portfolioRepository';

export async function getPortfolioByIdUseCase(id: string) {
  if (!id) throw new Error('ID é obrigatório');
  const portfolio = await portfolioRepository.getById(id);
  if (!portfolio) throw new Error('Portfólio não encontrado');
  return portfolio;
}
