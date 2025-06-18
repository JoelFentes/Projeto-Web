import { userRepository } from '@/repositories/userRepository';
import { verifyPassword } from '@/lib/hash';
import { generateToken } from '@/lib/auth';

export async function loginUserUseCase(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios');
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordMatch = await verifyPassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Senha incorreta');
  }

  const token = generateToken({ email: user.email });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
}
