import { Injectable } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'

@Injectable()
export class TranslationKeysService {
  constructor(private prisma: PrismaService) {}

  async findByNamespace(namespaceId: number) {
    return this.prisma.translationKey.findMany({
      where: { namespaceId },
      include: {
        translations: {
          include: {
            creator: true,
            comments: {
              include: {
                user: true,
              },
            },
          },
        },
        tags: true,
      },
    })
  }

  async create(data: {
    key: string
    description?: string
    namespaceId: number
    tags?: string[]
  }) {
    const { tags, ...rest } = data
    return this.prisma.translationKey.create({
      data: {
        ...rest,
        tags: tags
          ? {
              connectOrCreate: tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
      },
      include: {
        translations: true,
        tags: true,
      },
    })
  }

  async update(
    id: number,
    data: {
      key?: string
      description?: string
      tags?: string[]
    }
  ) {
    const { tags, ...rest } = data
    return this.prisma.translationKey.update({
      where: { id },
      data: {
        ...rest,
        tags: tags
          ? {
              set: [],
              connectOrCreate: tags.map((name) => ({
                where: { name },
                create: { name },
              })),
            }
          : undefined,
      },
      include: {
        translations: true,
        tags: true,
      },
    })
  }

  async remove(id: number) {
    return this.prisma.translationKey.delete({
      where: { id },
    })
  }
}
