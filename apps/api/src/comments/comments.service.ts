import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { CreateCommentDto, UpdateCommentDto } from './dto/comment.dto'

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async findByTranslation(translationId: number) {
    return this.prisma.comment.findMany({
      where: { translationId },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  async create(data: CreateCommentDto & { userId: number }) {
    const translation = await this.prisma.translation.findUnique({
      where: { id: data.translationId },
    })

    if (!translation) {
      throw new NotFoundException('Translation not found')
    }

    return this.prisma.comment.create({
      data,
      include: {
        user: true,
      },
    })
  }

  async update(id: number, userId: number, data: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!comment || comment.userId !== userId) {
      throw new NotFoundException('Comment not found or unauthorized')
    }

    return this.prisma.comment.update({
      where: { id },
      data,
      include: {
        user: true,
      },
    })
  }

  async remove(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!comment || comment.userId !== userId) {
      throw new NotFoundException('Comment not found or unauthorized')
    }

    return this.prisma.comment.delete({
      where: { id },
    })
  }
}
