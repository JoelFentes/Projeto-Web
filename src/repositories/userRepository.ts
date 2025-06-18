import { prisma } from '@/lib/db';
import { User } from '@prisma/client';

export const userRepository = {
  findByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  },

  create: async (data: { email: string; name: string; password: string }) => {
    return prisma.user.create({ data });
  },

  update: async (id: string, data: Partial<User>) => {
    return prisma.user.update({ where: { id }, data });
  },

  findById: async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
  }
};
