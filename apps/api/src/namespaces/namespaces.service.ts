import { Injectable } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'

@Injectable()
export class NamespacesService {
  constructor(private prisma: PrismaService) {}

  async findByProject(projectId: number) {
    return this.prisma.namespace.findMany({
      where: { projectId },
      include: {
        keys: {
          include: {
            translations: true,
          },
        },
      },
    })
  }

  async create(data: { name: string; projectId: number }) {
    return this.prisma.namespace.create({
      data,
    })
  }

  async findOne(id: number) {
    return this.prisma.namespace.findUnique({
      where: { id },
    })
  }

  async update(id: number, updateNamespaceDto: { name?: string }) {
    return await this.prisma.namespace.update({
      where: { id },
      data: updateNamespaceDto,
    })
  }

  async remove(id: number) {
    return this.prisma.namespace.delete({
      where: { id },
    })
  }
}
