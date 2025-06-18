import { PortfolioRepository, PortfolioData } from '@/repositories/portfolioRepository';

const portfolioRepo = new PortfolioRepository();

export interface CreateOrUpdatePortfolioParams extends PortfolioData {
  userId: string;
}

export async function createOrUpdatePortfolioUseCase(params: CreateOrUpdatePortfolioParams) {
  const { userId, bio, ...rest } = params;

  if (!userId) throw new Error('Usuário não autenticado');
  if (!bio) throw new Error('Bio é obrigatória');

  const existingPortfolio = await portfolioRepo.findByUserId(userId);

  const portfolioData: PortfolioData = {
    bio,
    ...rest,
  };

  if (existingPortfolio) {
    return portfolioRepo.update(existingPortfolio.id, portfolioData);
  } else {
    return portfolioRepo.create(userId, portfolioData);
  }
}
