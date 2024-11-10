import { Injectable } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto'

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            keys: true,
          },
        },
      },
    })
  }

  async findOne(id: number) {
    return this.prisma.tag.findUnique({
      where: { id },
      include: {
        keys: true,
      },
    })
  }

  async create(data: CreateTagDto) {
    return this.prisma.tag.create({
      data,
    })
  }

  async bulkCreate(names: string[]) {
    const tags = await Promise.all(
      names.map((name) =>
        this.prisma.tag.upsert({
          where: { name },
          create: { name },
          update: {},
        })
      )
    )
    return tags
  }

  async update(id: number, data: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { id },
      data,
    })
  }

  async remove(id: number) {
    return this.prisma.tag.delete({
      where: { id },
    })
  }
}
