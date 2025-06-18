// src/usecases/createUser.ts
import { userRepository } from '@/repositories/userRepository';
import { hashPassword } from '@/lib/hash';
import { generateToken } from '@/lib/auth';

export async function createUserUseCase(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw new Error('Todos os campos são obrigatórios');
  }

  const existing = await userRepository.findByEmail(email);
  if (existing) {
    throw new Error('Email já cadastrado');
  }

  const hashed = await hashPassword(password);
  const user = await userRepository.create({ email, name, password: hashed });
  const token = generateToken({ email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token,
  };
}
