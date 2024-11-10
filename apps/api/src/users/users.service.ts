import { Injectable } from '@nestjs/common'
import { PrismaService } from '@bumblebee/database'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
    })
  }

  async create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      include: {
        projects: true,
      },
    })
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: {
          include: {
            project: true,
          },
        },
      },
    })
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  async update(id: number, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        projects: true,
      },
    })
  }

  async remove(id: number) {
    return this.prisma.user.delete({ where: { id } })
  }
}
