import { userRepository } from '@/repositories/userRepository';
import { verifyToken } from '@/lib/auth';

export async function getUserByTokenUseCase(token: string) {
  const decoded = verifyToken(token);

  // Type guard: se for string, lança erro
  if (typeof decoded === 'string') {
    throw new Error('Token inválido');
  }

  // Agora pode acessar decoded.email com segurança
  if (!decoded || !decoded.email || typeof decoded.email !== 'string') {
    throw new Error('Token inválido');
  }

  const user = await userRepository.findByEmail(decoded.email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
