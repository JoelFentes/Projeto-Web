import { PortfolioRepository, PortfolioData } from '@/repositories/portfolioRepository';

const portfolioRepo = new PortfolioRepository();

export interface CreateOrUpdatePortfolioParams extends PortfolioData {
  userId: string;
}

export async function createOrUpdatePortfolioUseCase(params: CreateOrUpdatePortfolioParams) {
  const { userId, name, bio, email, ...rest } = params;

  // Validações básicas
  if (!userId) throw new Error('Usuário não autenticado');
  if (!name) throw new Error('Nome (name) é obrigatório');
  if (!bio) throw new Error('Bio é obrigatória');
  if (!email) throw new Error('Email é obrigatório');

  // Verifica se já existe portfólio para esse usuário
  const existingPortfolio = await portfolioRepo.findByUserId(userId);

  const portfolioData: PortfolioData = {
    name,
    bio,
    email,
    ...rest,
  };

  if (existingPortfolio) {
    // Atualiza o portfólio existente
    const updated = await portfolioRepo.update(existingPortfolio.id, portfolioData);
    return updated;
  } else {
    // Cria um novo portfólio
    const created = await portfolioRepo.create(userId, portfolioData);
    return created;
  }
}
