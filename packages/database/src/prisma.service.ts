import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export class PrismaService extends PrismaClient {
  constructor() {
    super({
      log: ['query', 'error', 'warn']
    })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}

export const prisma = global.prisma || new PrismaService()

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma
} 